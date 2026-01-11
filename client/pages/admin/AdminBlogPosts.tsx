import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';
import { format } from 'date-fns';
import AdminBlogEditor from './AdminBlogEditor';

interface Post {
  id: number;
  title: string;
  slug: string;
  status: 'draft' | 'published';
  createdAt: string;
  category: { name: string };
  author: { email: string };
  views: number;
}

const AdminBlogPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);

  useEffect(() => {
    if (!isEditorOpen) {
      fetchPosts();
    }
  }, [isEditorOpen]);

  const fetchPosts = async () => {
    try {
      const { data } = await api.get('/blog/admin/posts');
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await api.delete(`/blog/posts/${id}`);
        fetchPosts();
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  if (isEditorOpen) {
    return (
      <AdminBlogEditor 
        postId={editingPostId} 
        onClose={() => {
          setIsEditorOpen(false);
          setEditingPostId(null);
        }} 
      />
    );
  }

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
      <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 backdrop-blur-xl">
        <div>
          <h2 className="text-2xl font-black font-heading tracking-tight text-gray-900">Blog Posts</h2>
          <p className="text-gray-500 font-medium text-sm mt-1">Manage, edit, and publish your articles</p>
        </div>
        <button
          onClick={() => setIsEditorOpen(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 font-bold text-sm transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus size={18} strokeWidth={2.5} />
          <span>New Post</span>
        </button>
      </div>

      <div className="p-6">
        {posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <div 
                key={post.id} 
                className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-white border border-gray-100 rounded-2xl hover:border-blue-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300"
              >
                 <div className="flex-1 min-w-0 pr-8 mb-4 md:mb-0">
                    <div className="flex items-center space-x-3 mb-2">
                       <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                          post.status === 'published' 
                            ? 'bg-green-50 text-green-600 border border-green-100' 
                            : 'bg-yellow-50 text-yellow-600 border border-yellow-100'
                       }`}>
                          {post.status}
                       </span>
                       <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                       <span className="text-xs font-bold text-blue-600">{post.category?.name || 'Uncategorized'}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 truncate font-heading group-hover:text-blue-600 transition-colors">
                       {post.title}
                    </h3>
                    <div className="flex items-center space-x-4 mt-2 text-xs font-medium text-gray-500">
                       <span className="font-mono text-gray-400">{post.slug}</span>
                       <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                       <span>{format(new Date(post.createdAt), 'MMM d, yyyy')}</span>
                    </div>
                 </div>

                 <div className="flex items-center justify-between md:justify-end space-x-8">
                    <div className="flex items-center space-x-2 text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                       <Eye size={14} />
                       <span className="text-xs font-bold">{post.views} views</span>
                    </div>

                    <div className="flex items-center space-x-2">
                       <button
                         onClick={() => {
                           setEditingPostId(post.id);
                           setIsEditorOpen(true);
                         }}
                         className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                         title="Edit Post"
                       >
                         <Edit2 size={18} />
                       </button>
                       <button
                         onClick={() => handleDelete(post.id)}
                         className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                         title="Delete Post"
                       >
                         <Trash2 size={18} />
                       </button>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-3xl bg-gray-50/50">
            <div className="bg-white p-4 rounded-full shadow-sm inline-flex mb-4">
               <Plus className="text-blue-500" size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No posts yet</h3>
            <p className="text-gray-500 text-sm mb-6">Create your first blog post to get started</p>
            <button
               onClick={() => setIsEditorOpen(true)}
               className="text-blue-600 font-bold text-sm hover:underline"
            >
               Create New Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBlogPosts;
