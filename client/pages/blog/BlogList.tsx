import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../../utils/api.ts';
import { Calendar, User, ArrowRight, Tag, Search } from 'lucide-react';
import { format } from 'date-fns';

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  createdAt: string;
  category: Category;
  author: {
    id: number;
    email: string;
  };
}

const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get('category');

  useEffect(() => {
    fetchCategories();
    fetchPosts();
  }, [categoryId]);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/blog/categories');
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchPosts = async () => {
    try {
      const url = categoryId ? `/blog/posts?category_id=${categoryId}` : '/blog/posts';
      const { data } = await api.get(url);
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-4 font-sans text-gray-900">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-black font-heading tracking-tight mb-4 text-gray-900">
          Latest Insights
        </h1>
        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto">
          Discover trends, guides, and news about CloudPOS and the retail industry.
        </p>
      </div>

      {/* Horizontal Category Filter */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setSearchParams({})}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${
              !categoryId 
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20' 
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            All Posts
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSearchParams({ category: cat.id.toString() })}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${
                categoryId === cat.id.toString()
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link 
                to={`/resources/blog/${post.slug}`} 
                key={post.id}
                className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-300 flex flex-col h-full"
              >
                <div className="h-56 overflow-hidden relative">
                  <img 
                    src={post.image || 'https://placehold.co/600x400/f1f5f9/94a3b8?text=No+Image'} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-gray-200 shadow-sm">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{post.category?.name || 'Uncategorized'}</span>
                  </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center space-x-3 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{format(new Date(post.createdAt), 'MMM d, yyyy')}</span>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold font-heading mb-3 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2 text-gray-900">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-500 mb-6 flex-1 line-clamp-3 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center text-blue-600 font-bold uppercase tracking-widest text-xs group-hover:translate-x-1 transition-transform">
                    <span className="mr-2">Read Article</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[2rem] border border-gray-100 border-dashed">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
               <Search className="text-gray-400" size={24} />
            </div>
            <p className="text-gray-900 font-bold text-lg mb-1">No posts found</p>
            <p className="text-gray-500 text-sm">Try selecting a different category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
