import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Save, Edit2, Globe, Settings, Code, Tag, Image as ImageIcon, Layout, Upload, X, FileText, List, Quote } from 'lucide-react';
import api from '../../utils/api.ts';
import Modal from '../../components/Modal.tsx';
import AdminCategories from './AdminCategories.tsx';
import AdminBlogPosts from './AdminBlogPosts.tsx';
import ClientLogos from './ClientLogos.tsx';
import AdminTestimonials from './AdminTestimonials.tsx';
import AdminSiteSettings from './AdminSiteSettings.tsx';

interface SeoData {
  id: number;
  page: string;
  title: string;
  description: string;
  keywords: string;
  image?: string;
  schema_markup?: string;
  canonical_url?: string;
  robots?: string;
  og_type?: string;
  twitter_card?: string;
}

interface DashboardProps {
  defaultView?: 'seo' | 'posts' | 'categories' | 'client-logos' | 'testimonials' | 'site-settings';
}

const Dashboard: React.FC<DashboardProps> = ({ defaultView = 'seo' }) => {
  const [seos, setSeos] = useState<SeoData[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<SeoData | null>(null);
  const [activeTab, setActiveTab] = useState<'basic' | 'advanced'>('basic');
  const [imageMode, setImageMode] = useState<'url' | 'upload'>('url');
  const [uploading, setUploading] = useState(false);
  const [currentView, setCurrentView] = useState<'seo' | 'posts' | 'categories' | 'client-logos' | 'testimonials' | 'site-settings'>(defaultView);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSeos();
  }, []);

  const fetchSeos = async () => {
    try {
      const { data } = await api.get('/seo/admin/all');
      setSeos(data);
    } catch (error) {
       navigate('/admin/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const startEdit = (seo: SeoData) => {
    setEditingId(seo.id);
    setEditForm({ ...seo });
    setActiveTab('basic');
    setImageMode('url');
    if (seo.image && seo.image.includes('/uploads/')) {
        setImageMode('upload');
    }
  };

  const closeEdit = () => {
    setEditingId(null);
    setEditForm(null);
    setUploading(false);
  };

  const saveEdit = async () => {
    if (!editForm) return;
    try {
      await api.put(`/seo/admin/${editForm.id}`, editForm);
      closeEdit();
      fetchSeos();
    } catch (error) {
      alert('Failed to save');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    
    setUploading(true);
    try {
      const { data } = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (editForm) {
        setEditForm({ ...editForm, image: data.url });
      }
    } catch (error) {
      console.error('Upload failed', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex relative overflow-hidden">
      {/* Background Ambience */}
      

      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-100 p-6 hidden md:flex flex-col relative z-10 shadow-sm">
<div className="flex items-center justify-center mb-12 px-2">
          <img 
            src="https://i.postimg.cc/QdSBd6bG/mediasoft_logo_v1.png" 
            alt="Mediasoft" 
            className="h-12 w-auto object-contain"
          />
        </div>

        <nav className="flex-1 overflow-y-auto py-4 space-y-6">
          {/* Blog Management */}
          <div>
            <div className="px-4 mb-2 flex items-center space-x-2 text-gray-400">
               <span className="text-[10px] font-bold uppercase tracking-wider">Blog Management</span>
            </div>
            <div className="space-y-1">
              <button 
                onClick={() => setCurrentView('posts')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${currentView === 'posts' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium'}`}
              >
                <div className={`w-1 h-full rounded-full ${currentView === 'posts' ? 'bg-blue-600' : 'bg-transparent'}`}></div>
                <FileText size={18} />
                <span className="tracking-wide text-sm">Blog Posts</span>
              </button>

              <button 
                onClick={() => setCurrentView('categories')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${currentView === 'categories' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium'}`}
              >
                <div className={`w-1 h-full rounded-full ${currentView === 'categories' ? 'bg-blue-600' : 'bg-transparent'}`}></div>
                <List size={18} />
                <span className="tracking-wide text-sm">Categories</span>
              </button>
            </div>
          </div>

          {/* Content Management */}
          <div>
            <div className="px-4 mb-2 flex items-center space-x-2 text-gray-400">
               <span className="text-[10px] font-bold uppercase tracking-wider">Content Management</span>
            </div>
            <div className="space-y-1">
              <button 
                onClick={() => setCurrentView('client-logos')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${currentView === 'client-logos' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium'}`}
              >
                <div className={`w-1 h-full rounded-full ${currentView === 'client-logos' ? 'bg-blue-600' : 'bg-transparent'}`}></div>
                <ImageIcon size={18} />
                <span className="tracking-wide text-sm">Client Logos</span>
              </button>

              <button 
                onClick={() => setCurrentView('testimonials')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${currentView === 'testimonials' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium'}`}
              >
                <div className={`w-1 h-full rounded-full ${currentView === 'testimonials' ? 'bg-blue-600' : 'bg-transparent'}`}></div>
                <Quote size={18} />
                <span className="tracking-wide text-sm">Testimonials</span>
              </button>
            </div>
          </div>

          {/* Configuration */}
          <div>
            <div className="px-4 mb-2 flex items-center space-x-2 text-gray-400">
               <span className="text-[10px] font-bold uppercase tracking-wider">Configuration</span>
            </div>
            <div className="space-y-1">
              <button 
                onClick={() => setCurrentView('site-settings')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${currentView === 'site-settings' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium'}`}
              >
                <div className={`w-1 h-full rounded-full ${currentView === 'site-settings' ? 'bg-blue-600' : 'bg-transparent'}`}></div>
                <Settings size={18} />
                <span className="tracking-wide text-sm">Site Settings</span>
              </button>

              <button 
                onClick={() => setCurrentView('seo')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${currentView === 'seo' ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium'}`}
              >
                <div className={`w-1 h-full rounded-full ${currentView === 'seo' ? 'bg-blue-600' : 'bg-transparent'}`}></div>
                <Globe size={18} />
                <span className="tracking-wide text-sm">SEO Manager</span>
              </button>
            </div>
          </div>
        </nav>

        <button 
          onClick={handleLogout}
          className="mt-auto flex items-center space-x-3 text-gray-500 hover:text-red-500 transition-colors px-4 py-3 rounded-xl hover:bg-red-50 border border-transparent hover:border-red-100 group"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold tracking-wide text-sm">Sign Out</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto relative z-10 custom-scrollbar">
        <div className="max-w-7xl mx-auto">
          <header className="flex justify-between items-center mb-10">
            <div>
               <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
                 {currentView === 'seo' && 'SEO Management'}
                 {currentView === 'posts' && 'Blog Management'}
                 {currentView === 'categories' && 'Category Management'}
               </h1>
               <p className="text-gray-500 text-sm font-medium">
                 {currentView === 'seo' && 'Control search engine visibility for all pages'}
                 {currentView === 'posts' && 'Create and manage your blog articles'}
                 {currentView === 'categories' && 'Organize your content with categories'}
               </p>
            </div>
            <div className="md:hidden">
              <button onClick={handleLogout} className="text-red-500 hover:text-red-600">
                <LogOut size={24} />
              </button>
            </div>
          </header>



          {currentView === 'seo' && (
            <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-xl shadow-gray-200/50">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-8 py-6 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Page</th>
                      <th className="px-8 py-6 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Title Tag</th>
                      <th className="px-8 py-6 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-8 py-6 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {seos.map((seo) => (
                      <tr key={seo.id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center space-x-3">
                             <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                             <span className="text-sm font-bold text-gray-900 capitalize tracking-wide">{seo.page}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-sm text-gray-500 max-w-xs truncate font-medium group-hover:text-gray-700 transition-colors" title={seo.title}>{seo.title}</td>
                        <td className="px-8 py-6 text-sm text-gray-500 max-w-xs truncate font-medium group-hover:text-gray-700 transition-colors" title={seo.description}>{seo.description}</td>
                        <td className="px-8 py-6">
                          <button 
                            onClick={() => startEdit(seo)} 
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg border border-blue-100 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm group/btn"
                          >
                            <Edit2 size={14} className="group-hover/btn:scale-110 transition-transform" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Edit</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {seos.length === 0 && (
                  <div className="p-12 text-center text-gray-500 font-medium">No SEO validation data found.</div>
              )}
            </div>
          )}

          {currentView === 'posts' && <AdminBlogPosts />}
          {currentView === 'categories' && <AdminCategories />}
          {currentView === 'client-logos' && <ClientLogos />}
          {currentView === 'testimonials' && <AdminTestimonials />}
          {currentView === 'site-settings' && <AdminSiteSettings />}
        </div>
      </main>

      {/* Edit Modal */}
      <Modal 
        isOpen={!!editingId} 
        onClose={closeEdit} 
        title={`Edit SEO: ${editForm?.page}`}
      >
        {editForm && (
          <div className="space-y-8">
            {/* Tabs */}
            <div className="flex space-x-1 p-1 bg-gray-100 rounded-xl">
              <button
                className={`flex-1 px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 ${activeTab === 'basic' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('basic')}
              >
                Basic Params
              </button>
              <button
                className={`flex-1 px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 ${activeTab === 'advanced' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('advanced')}
              >
                 Advanced Config
              </button>
            </div>

            {/* Form Content */}
            <div className="min-h-[300px]">
              {activeTab === 'basic' ? (
                <div className="space-y-5 animate-fade-in">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Page Title</label>
                    <input 
                      className="w-full p-4 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-medium text-gray-900"
                      value={editForm.title}
                      onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Meta Description</label>
                    <textarea 
                      rows={3}
                      className="w-full p-4 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all resize-none font-medium text-gray-900 leading-relaxed"
                      value={editForm.description}
                      onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Keywords</label>
                    <div className="relative group">
                      <Tag className="absolute left-4 top-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                      <input 
                        className="w-full pl-12 p-4 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-medium text-gray-900"
                        value={editForm.keywords}
                        onChange={(e) => setEditForm({...editForm, keywords: e.target.value})}
                        placeholder="pos, retail, cloud..."
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Share Image</label>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                      {/* Image Preview */}
                      {editForm.image && (
                        <div className="mb-4 relative group w-full h-48 rounded-lg overflow-hidden bg-white border border-gray-200">
                          <img src={editForm.image} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}

                      {/* Toggle */}
                      <div className="flex space-x-2 mb-3">
                         <button
                           onClick={() => setImageMode('url')}
                           className={`flex-1 py-2 text-xs font-bold uppercase tracking-wide rounded-lg transition-colors ${imageMode === 'url' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'bg-transparent text-gray-400 hover:text-gray-600'}`}
                         >
                           Image URL
                         </button>
                         <button
                           onClick={() => setImageMode('upload')}
                           className={`flex-1 py-2 text-xs font-bold uppercase tracking-wide rounded-lg transition-colors ${imageMode === 'upload' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'bg-transparent text-gray-400 hover:text-gray-600'}`}
                         >
                           Upload File
                         </button>
                      </div>

                      {imageMode === 'url' ? (
                        <div className="relative group">
                          <ImageIcon className="absolute left-4 top-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                          <input 
                            className="w-full pl-12 p-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-medium text-gray-900"
                            value={editForm.image || ''}
                            onChange={(e) => setEditForm({...editForm, image: e.target.value})}
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                      ) : (
                        <div className="relative">
                           <input 
                             type="file"
                             accept="image/*"
                             onChange={handleFileUpload}
                             className="hidden"
                             id="file-upload"
                             disabled={uploading}
                           />
                           <label 
                             htmlFor="file-upload"
                             className={`w-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all group ${uploading ? 'opacity-50 cursor-not-allowed' : 'bg-white'}`}
                           >
                             {uploading ? (
                               <div className="flex flex-col items-center">
                                 <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                                 <span className="text-xs font-bold text-gray-400 uppercase">Uploading...</span>
                               </div>
                             ) : (
                               <>
                                 <Upload className="text-gray-400 group-hover:text-blue-500 mb-2 transition-colors" size={24} />
                                 <span className="text-xs font-bold text-gray-400 uppercase group-hover:text-blue-500 transition-colors">Click to upload image</span>
                               </>
                             )}
                           </label>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-5 animate-fade-in">
                   <div className="grid grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Robots Tag</label>
                        <div className="relative group">
                          <Settings className="absolute left-4 top-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                          <select 
                            className="w-full pl-12 p-4 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all appearance-none font-medium text-gray-900"
                            value={editForm.robots || 'index, follow'}
                            onChange={(e) => setEditForm({...editForm, robots: e.target.value})}
                          >
                            <option value="index, follow">index, follow</option>
                            <option value="noindex, nofollow">noindex, nofollow</option>
                            <option value="index, nofollow">index, nofollow</option>
                            <option value="noindex, follow">noindex, follow</option>
                          </select>
                        </div>
                      </div>
                      <div>
                         <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Canonical URL</label>
                         <input 
                            className="w-full p-4 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-medium text-gray-900"
                            value={editForm.canonical_url || ''}
                            onChange={(e) => setEditForm({...editForm, canonical_url: e.target.value})}
                            placeholder="https://..."
                         />
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-5">
                      <div>
                         <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">OG Type</label>
                         <input 
                            className="w-full p-4 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-medium text-gray-900"
                            value={editForm.og_type || 'website'}
                            onChange={(e) => setEditForm({...editForm, og_type: e.target.value})}
                         />
                      </div>
                      <div>
                         <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Twitter Card</label>
                         <select 
                            className="w-full p-4 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-medium text-gray-900"
                            value={editForm.twitter_card || 'summary_large_image'}
                            onChange={(e) => setEditForm({...editForm, twitter_card: e.target.value})}
                         >
                            <option value="summary">summary</option>
                            <option value="summary_large_image">summary_large_image</option>
                            <option value="app">app</option>
                            <option value="player">player</option>
                         </select>
                      </div>
                   </div>

                   <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">
                        <div className="flex items-center space-x-2">
                           <Code size={16} />
                           <span>JSON-LD Schema Markup</span>
                        </div>
                      </label>
                      <textarea 
                        rows={6}
                        className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-mono text-xs leading-relaxed"
                        value={editForm.schema_markup || ''}
                        onChange={(e) => setEditForm({...editForm, schema_markup: e.target.value})}
                        placeholder='{"@context": "https://schema.org", ...}'
                        spellCheck={false}
                      />
                      <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-wide">Must be valid JSON format</p>
                   </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
              <button 
                onClick={closeEdit}
                className="px-8 py-3 rounded-xl text-gray-500 font-bold hover:bg-gray-100 transition-colors uppercase tracking-wider text-xs"
              >
                Cancel
              </button>
              <button 
                onClick={saveEdit}
                className="px-8 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all flex items-center space-x-2 uppercase tracking-wider text-xs shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:-translate-y-0.5"
              >
                <Save size={16} className="text-white" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Dashboard;
