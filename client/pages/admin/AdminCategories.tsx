import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import Modal from '../../components/Modal';

interface Category {
  id: number;
  name: string;
  slug: string;
}

const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: '', slug: '' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/blog/categories');
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await api.put(`/blog/categories/${editingCategory.id}`, formData);
      } else {
        await api.post('/blog/categories', formData);
      }
      fetchCategories();
      setIsModalOpen(false);
      setEditingCategory(null);
      setFormData({ name: '', slug: '' });
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({ name: category.name, slug: category.slug });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await api.delete(`/blog/categories/${id}`);
        fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden">
      <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Blog Categories</h2>
          <p className="text-gray-500">Manage your blog post categories</p>
        </div>
        <button
          onClick={() => {
            setEditingCategory(null);
            setFormData({ name: '', slug: '' });
            setIsModalOpen(true);
          }}
          className="flex items-center space-x-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 font-medium"
        >
          <Plus size={18} />
          <span>New Category</span>
        </button>
      </div>

      <div className="p-0">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left py-4 px-8 text-xs font-bold text-gray-400 uppercase tracking-wider">Name</th>
              <th className="text-left py-4 px-8 text-xs font-bold text-gray-400 uppercase tracking-wider">Slug</th>
              <th className="text-right py-4 px-8 text-xs font-bold text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="py-4 px-8 text-sm font-medium text-gray-900">{category.name}</td>
                <td className="py-4 px-8 text-sm text-gray-500 font-mono">{category.slug}</td>
                <td className="py-4 px-8 text-right space-x-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={3} className="py-12 text-center text-gray-400">
                  No categories found. Create one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? 'Edit Category' : 'New Category'}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => {
                const name = e.target.value;
                const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                setFormData({ ...formData, name, slug: editingCategory ? formData.slug : slug });
              }}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Slug</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none font-mono text-sm"
              required
            />
          </div>
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {editingCategory ? 'Update Category' : 'Create Category'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminCategories;
