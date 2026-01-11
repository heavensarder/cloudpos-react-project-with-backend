import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Plus, Trash2, Upload, Link as LinkIcon, Image as ImageIcon, Loader2, Quote, User, Briefcase, Edit2, X } from 'lucide-react';

interface Testimonial {
  id: number;
  text: string;
  author: string;
  designation: string;
  logoUrl: string;
}

const AdminTestimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'url' | 'upload'>('url');
  
  // Form State
  const [editingId, setEditingId] = useState<number | null>(null);
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [designation, setDesignation] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data } = await api.get('/testimonials');
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setText('');
    setAuthor('');
    setDesignation('');
    setLogoUrl('');
    setFile(null);
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if(fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text || !author) return;
    
    // Check if we have an image
    if (activeTab === 'url' && !logoUrl) {
       alert('Please provide a Logo URL');
       return;
    }
    if (activeTab === 'upload' && !file) {
       alert('Please upload a Logo file');
       return;
    }

    setUploading(true);
    try {
      let finalLogoUrl = logoUrl;

      // Handle File Upload if needed
      if (activeTab === 'upload' && file) {
         const formData = new FormData();
         formData.append('image', file);
         const uploadRes = await api.post('/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
         });
         
         if (uploadRes.data.success || uploadRes.data.url) {
            finalLogoUrl = uploadRes.data.div?.url || uploadRes.data.url;
         } else {
            throw new Error('Upload failed');
         }
      }

      if (editingId) {
        await api.put(`/testimonials/${editingId}`, {
           text,
           author,
           designation,
           logoUrl: finalLogoUrl
        });
      } else {
         await api.post('/testimonials', {
           text,
           author,
           designation,
           logoUrl: finalLogoUrl
         });
      }
      
      resetForm();
      fetchTestimonials();
    } catch (error) {
      console.error('Error saving testimonial:', error);
      alert('Failed to save testimonial');
    } finally {
      setUploading(false);
    }
  };

  const startEdit = (t: Testimonial) => {
     setEditingId(t.id);
     setText(t.text);
     setAuthor(t.author);
     setDesignation(t.designation);
     setLogoUrl(t.logoUrl);
     setActiveTab('url'); // Default to URL for existing
     window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      await api.delete(`/testimonials/${id}`);
      setTestimonials(testimonials.filter(t => t.id !== id));
    } catch (error) {
       console.error('Error deleting testimonial:', error);
       alert('Failed to delete testimonial');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
         <h2 className="text-2xl font-black font-heading text-gray-900">Testimonials</h2>
         <p className="text-gray-500 font-medium text-sm mt-1">Manage what your clients say about you</p>
      </div>

      {/* Add New Section */}
      <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
         <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">{editingId ? 'Edit Testimonial' : 'Add New Testimonial'}</h3>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100 flex items-center gap-2">
               <ImageIcon size={14} />
               Recommended Logo Size: 250x150px (Transparent)
            </span>
         </div>
         
         <form onSubmit={handleSubmit} className="space-y-6">
            {/* Text Area */}
            <div>
               <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Testimonial Text</label>
               <div className="relative group">
                  <Quote className="absolute left-4 top-4 text-gray-400" size={18} />
                  <textarea 
                     rows={3}
                     value={text}
                     onChange={(e) => setText(e.target.value)}
                     placeholder="Enter testimonial content..."
                     className="w-full pl-12 p-4 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-medium text-gray-900 resize-none"
                     required
                  />
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {/* Author */}
               <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Author Name</label>
                  <div className="relative group">
                     <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                     <input 
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full pl-12 p-4 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-medium text-gray-900"
                        required
                     />
                  </div>
               </div>

               {/* Designation */}
               <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Designation / Status</label>
                  <div className="relative group">
                     <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                     <input 
                        type="text"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        placeholder="e.g. Enterprise Client"
                        className="w-full pl-12 p-4 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-medium text-gray-900"
                     />
                  </div>
               </div>
            </div>

            {/* Logo Upload */}
            <div>
               <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Company Logo</label>
               <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <div className="flex space-x-4 mb-4">
                     <button 
                        type="button"
                        onClick={() => setActiveTab('url')}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all font-bold text-xs uppercase tracking-wider ${
                           activeTab === 'url' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                        }`}
                     >
                        <LinkIcon size={16} />
                        <span>Image URL</span>
                     </button>
                     <button 
                        type="button"
                        onClick={() => setActiveTab('upload')}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all font-bold text-xs uppercase tracking-wider ${
                           activeTab === 'upload' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                        }`}
                     >
                        <Upload size={16} />
                        <span>Upload File</span>
                     </button>
                  </div>

                  {activeTab === 'url' ? (
                     <input 
                        type="text" 
                        value={logoUrl}
                        onChange={(e) => setLogoUrl(e.target.value)}
                        placeholder="https://example.com/logo.png"
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                     />
                  ) : (
                     <input 
                        id="file-upload"
                        type="file" 
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition-all"
                     />
                  )}
               </div>
            </div>

            <div className="flex gap-4">
               {editingId && (
                  <button 
                     type="button"
                     onClick={resetForm}
                     className="flex-1 bg-gray-100 text-gray-600 px-6 py-4 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all flex items-center justify-center space-x-2"
                  >
                     <X size={18} />
                     <span>Cancel</span>
                  </button>
               )}
               <button 
                  type="submit" 
                  disabled={uploading}
                  className="flex-1 bg-blue-600 text-white px-6 py-4 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
               >
                  {uploading ? <Loader2 size={18} className="animate-spin" /> : (editingId ? <Edit2 size={18} /> : <Plus size={18} />)}
                  <span>{editingId ? 'Update Testimonial' : 'Add Testimonial'}</span>
               </button>
            </div>
         </form>
      </div>

      {/* List View */}
      {loading ? (
         <div className="flex justify-center py-20"><Loader2 size={40} className="animate-spin text-blue-500" /></div>
      ) : (
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
               <div key={t.id} className="group relative bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all flex flex-col h-full">
                  <div className="mb-6 flex items-start justify-between">
                     <div className="h-16 h-16 bg-gray-50 rounded-xl p-2 border border-gray-100 flex items-center justify-center w-24">
                        <img src={t.logoUrl} alt={t.author} className="max-w-full max-h-full object-contain" />
                     </div>
                     <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-all">
                        <button 
                           onClick={() => startEdit(t)}
                           className="p-2 bg-blue-50 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                           title="Edit"
                        >
                           <Edit2 size={16} />
                        </button>
                        <button 
                           onClick={() => handleDelete(t.id)}
                           className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                           title="Delete"
                        >
                           <Trash2 size={16} />
                        </button>
                     </div>
                  </div>
                  
                  <blockquote className="flex-1 text-gray-600 italic mb-6">"{t.text}"</blockquote>
                  
                  <div className="flex items-center space-x-3 mt-auto pt-6 border-t border-gray-50">
                     <div>
                        <h4 className="font-bold text-gray-900">{t.author}</h4>
                        <p className="text-xs font-bold text-blue-500 uppercase tracking-wider">{t.designation}</p>
                     </div>
                  </div>
               </div>
            ))}
            {testimonials.length === 0 && (
               <div className="col-span-full py-20 text-center text-gray-400 bg-gray-50/50 rounded-[2rem] border-2 border-dashed border-gray-100">
                  <Quote size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No testimonials found. Add one to get started.</p>
               </div>
            )}
         </div>
      )}
    </div>
  );
};

export default AdminTestimonials;
