import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Plus, Trash2, Upload, Link as LinkIcon, Image as ImageIcon, Loader2 } from 'lucide-react';

interface ClientLogo {
  id: number;
  name: string;
  imageUrl: string;
}

const ClientLogos: React.FC = () => {
  const [logos, setLogos] = useState<ClientLogo[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'url' | 'upload'>('url');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchLogos();
  }, []);

  const fetchLogos = async () => {
    try {
      const { data } = await api.get('/client-logos');
      setLogos(data);
    } catch (error) {
      console.error('Error fetching logos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setUploading(true);
    try {
      await api.post('/client-logos', { imageUrl: url });
      setUrl('');
      fetchLogos();
    } catch (error) {
      console.error('Error adding logo:', error);
      alert('Failed to add logo');
    } finally {
      setUploading(false);
    }
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    
    const formData = new FormData();
    formData.append('image', file);

    try {
      // 1. Upload Image
       const uploadRes = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (uploadRes.data.success || uploadRes.data.url) {
         const imageUrl = uploadRes.data.div?.url || uploadRes.data.url; // Handle potential different response structures

         // 2. Save Client Logo
         await api.post('/client-logos', { imageUrl });
         setFile(null);
         // Reset file input
         const fileInput = document.getElementById('file-upload') as HTMLInputElement;
         if(fileInput) fileInput.value = '';
         
         fetchLogos();
      }
    } catch (error) {
      console.error('Error uploading logo:', error);
      alert('Failed to upload logo');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this logo?')) return;
    try {
      await api.delete(`/client-logos/${id}`);
      setLogos(logos.filter(l => l.id !== id));
    } catch (error) {
       console.error('Error deleting logo:', error);
       alert('Failed to delete logo');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-black font-heading text-gray-900">Client Logos</h2>
          <p className="text-gray-500 font-medium text-sm mt-1">Manage the logos displayed on Home and Customer pages</p>
        </div>
      </div>

      {/* Add New Section */}
      <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
         <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Add New Logo</h3>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100 flex items-center gap-2">
               <ImageIcon size={14} />
               Recommended Size: 250x150px
            </span>
         </div>
         
         <div className="flex space-x-4 mb-6">
            <button 
               onClick={() => setActiveTab('url')}
               className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all font-bold text-xs uppercase tracking-wider ${
                  activeTab === 'url' ? 'bg-blue-50 text-blue-600 ring-1 ring-blue-100' : 'text-gray-400 hover:bg-gray-50'
               }`}
            >
               <LinkIcon size={16} />
               <span>Image URL</span>
            </button>
            <button 
               onClick={() => setActiveTab('upload')}
               className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all font-bold text-xs uppercase tracking-wider ${
                  activeTab === 'upload' ? 'bg-blue-50 text-blue-600 ring-1 ring-blue-100' : 'text-gray-400 hover:bg-gray-50'
               }`}
            >
               <Upload size={16} />
               <span>Upload File</span>
            </button>
         </div>

         {activeTab === 'url' ? (
            <form onSubmit={handleUrlSubmit} className="flex gap-4">
               <input 
                  type="text" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/logo.png"
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
               />
               <button 
                  type="submit" 
                  disabled={uploading || !url}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2"
               >
                  {uploading ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
                  <span>Add Logo</span>
               </button>
            </form>
         ) : (
            <form onSubmit={handleFileUpload} className="flex gap-4 items-center">
               <input 
                  id="file-upload"
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                  className="flex-1 block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
               />
               <button 
                  type="submit" 
                  disabled={uploading || !file}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2"
               >
                  {uploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                  <span>Upload & Add</span>
               </button>
            </form>
         )}
      </div>

      {/* Grid View */}
      {loading ? (
         <div className="flex justify-center py-20"><Loader2 size={40} className="animate-spin text-blue-500" /></div>
      ) : (
         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {logos.map((logo) => (
               <div key={logo.id} className="group relative bg-white border border-gray-100 rounded-2xl p-6 flex items-center justify-center h-40 shadow-sm hover:shadow-lg transition-all">
                  <img src={logo.imageUrl} alt={logo.name} className="max-w-full max-h-full object-contain p-2" />
                  <button 
                     onClick={() => handleDelete(logo.id)}
                     className="absolute top-2 right-2 p-2 bg-red-50 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                     title="Delete"
                  >
                     <Trash2 size={16} />
                  </button>
               </div>
            ))}
            {logos.length === 0 && (
               <div className="col-span-full py-20 text-center text-gray-400 bg-gray-50/50 rounded-[2rem] border-2 border-dashed border-gray-100">
                  <ImageIcon size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No logos found. Add one to get started.</p>
               </div>
            )}
         </div>
      )}
    </div>
  );
};

export default ClientLogos;
