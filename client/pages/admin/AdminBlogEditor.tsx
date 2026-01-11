import React, { useState, useEffect, useMemo, useRef } from 'react';
import JoditEditor from 'jodit-react';
import api from '../../utils/api';
import { ArrowLeft, Save, Upload, Image as ImageIcon } from 'lucide-react';
import Modal from '../../components/Modal';

interface Category {
  id: number;
  name: string;
}

interface AdminBlogEditorProps {
  postId: number | null;
  onClose: () => void;
}

const AdminBlogEditor: React.FC<AdminBlogEditorProps> = ({ postId, onClose }) => {
  const editor = useRef(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeTab, setActiveTab] = useState<'content' | 'seo'>('content');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    category_id: '',
    status: 'draft',
    image: '',
    // SEO
    seo_title: '',
    seo_description: '',
    seo_keywords: '',
    schema_markup: '',
    canonical_url: '',
    robots: 'index, follow',
    og_type: 'article',
    twitter_card: 'summary_large_image',
  });

  useEffect(() => {
    fetchCategories();
    if (postId) {
      fetchPost(postId);
    }
  }, [postId]);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/blog/categories');
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchPost = async (id: number) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/blog/admin/posts/${id}`);
      setFormData({
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt || '',
        category_id: data.category_id,
        status: data.status,
        image: data.image || '',
        seo_title: data.seo_title || '',
        seo_description: data.seo_description || '',
        seo_keywords: data.seo_keywords || '',
        schema_markup: data.schema_markup || '',
        canonical_url: data.canonical_url || '',
        robots: data.robots || 'index, follow',
        og_type: data.og_type || 'article',
        twitter_card: data.twitter_card || 'summary_large_image',
      });
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('image', file);
    setUploading(true);

    try {
      const { data } = await api.post('/upload', formDataUpload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setFormData({ ...formData, image: data.url });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

    // Jodit Configuration
    const config = useMemo(() => {
        const user = JSON.parse(localStorage.getItem('adminUser') || '{}');
        return {
            readonly: false,
            placeholder: 'Start writing your amazing article...',
            height: 500,
            uploader: {
                url: 'http://localhost:5000/api/upload',
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
                format: 'json',
                isSuccess: (resp: any) => !!resp.url,
                process: (resp: any) => {
                    return {
                        files: [resp.url],
                        path: resp.url,
                        baseurl: '',
                        error: resp.error,
                        msg: resp.message
                    };
                },
                defaultHandlerSuccess: function (data: any) {
                    // @ts-ignore
                    this.selection.insertImage(data.files[0], null, 250);
                }
            },
            toolbarAdaptive: false,
            buttons: [
                'source', '|',
                'bold', 'strikethrough', 'underline', 'italic', '|',
                'ul', 'ol', '|',
                'outdent', 'indent',  '|',
                'font', 'fontsize', 'brush', 'paragraph', '|',
                'image', 'video', 'table', 'link', '|',
                'align', 'undo', 'redo', '|',
                'hr', 'eraser', 'copyformat', '|',
                'symbol', 'fullsize', 'print', 'about'
            ]
        };
    }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (postId) {
        await api.put(`/blog/posts/${postId}`, formData);
      } else {
        await api.post('/blog/posts', formData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Error saving post. Please check console.');
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading post...</div>;

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden flex flex-col h-[calc(100vh-120px)]">
      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 flex-shrink-0">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white hover:shadow-sm rounded-xl transition-all text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{postId ? 'Edit Post' : 'New Post'}</h2>
            <p className="text-xs text-gray-500">
              {formData.status === 'published' ? 'Published' : 'Draft'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleSubmit}
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 font-bold text-sm"
          >
            <Save size={18} />
            <span>Save {postId ? 'Changes' : 'Post'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-8 pt-6 pb-0 flex space-x-6 border-b border-gray-100 bg-white flex-shrink-0">
        <button
           onClick={() => setActiveTab('content')}
           className={`pb-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'content' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
        >
          Content & Basics
        </button>
        <button
           onClick={() => setActiveTab('seo')}
           className={`pb-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'seo' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
        >
          SEO & Social
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        {activeTab === 'content' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    if (!postId || !formData.slug) {
                         const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                         setFormData({ ...formData, title, slug });
                    } else {
                         setFormData({ ...formData, title });
                    }
                  }}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none font-heading font-bold text-lg"
                  placeholder="Enter a catchy title..."
                />
              </div>

              <div className="space-y-2">
                 <label className="text-sm font-bold text-gray-700">Content</label>
                 <div className="prose-editor text-black">
                    <JoditEditor
                        ref={editor}
                        value={formData.content}
                        config={config}
                        // @ts-ignore
                        onBlur={(newContent) => setFormData({ ...formData, content: newContent })} 
                        onChange={() => {}}
                    />
                 </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Excerpt</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none h-24 resize-none"
                  placeholder="Short summary for preview cards..."
                />
              </div>
            </div>

            <div className="space-y-6">
              {/* Settings Card */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-4">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Publishing</h3>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg outline-none focus:border-blue-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500">Category</label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg outline-none focus:border-blue-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                   <label className="text-xs font-bold text-gray-500">Slug</label>
                   <input 
                      type="text" 
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg outline-none focus:border-blue-500 text-xs font-mono text-gray-600"
                   />
                </div>
              </div>

              {/* Feature Image */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-4">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Feature Image</h3>
                
                <div className="w-full aspect-video bg-white rounded-xl border border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group">
                  {formData.image ? (
                    <>
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <label className="cursor-pointer bg-white text-gray-900 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100">
                          Change
                          <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                        </label>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-4">
                      {uploading ? (
                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                      ) : (
                        <label className="cursor-pointer flex flex-col items-center space-y-2 text-gray-400 hover:text-blue-600 transition-colors">
                          <ImageIcon size={32} />
                          <span className="text-xs font-bold">Upload Image</span>
                          <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                        </label>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                   <div className="h-px bg-gray-200 flex-1"></div>
                   <span className="text-xs text-gray-400 font-bold">OR URL</span>
                   <div className="h-px bg-gray-200 flex-1"></div>
                </div>
                
                <input 
                    type="text" 
                    placeholder="https://example.com/image.jpg"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg outline-none focus:border-blue-500 text-xs"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-8">
             <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">Search Engine Optimization</h3>
                <div className="space-y-4">
                   <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">SEO Title</label>
                      <input 
                        type="text" 
                        value={formData.seo_title}
                        onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-blue-500"
                        placeholder={formData.title}
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Meta Description</label>
                      <textarea 
                        value={formData.seo_description}
                        onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-blue-500 h-24 resize-none"
                        placeholder={formData.excerpt}
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Keywords</label>
                      <input 
                        type="text" 
                        value={formData.seo_keywords}
                        onChange={(e) => setFormData({ ...formData, seo_keywords: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-blue-500"
                        placeholder="pos, retail, business..."
                      />
                   </div>
                </div>
             </div>

             <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">Advanced</h3>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Canonical URL</label>
                      <input 
                        type="text" 
                        value={formData.canonical_url}
                        onChange={(e) => setFormData({ ...formData, canonical_url: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-blue-500"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Robots Meta</label>
                      <input 
                        type="text" 
                        value={formData.robots}
                        onChange={(e) => setFormData({ ...formData, robots: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-blue-500"
                      />
                   </div>
                </div>
                <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Schema Markup (JSON-LD)</label>
                      <textarea 
                        value={formData.schema_markup}
                        onChange={(e) => setFormData({ ...formData, schema_markup: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-blue-500 h-32 font-mono text-xs"
                      />
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBlogEditor;
