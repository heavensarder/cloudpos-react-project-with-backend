import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../utils/api.ts';
import { Calendar, User, ArrowLeft, Tag, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import { Helmet } from 'react-helmet-async';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      const { data } = await api.get(`/blog/posts/${slug}`);
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-gray-900">
        <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
        <Link to="/resources/blog" className="text-blue-600 hover:underline">Return to Blog</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-24 pb-20 px-4 font-sans">
      {/* Dynamic SEO */}
      <Helmet>
        <title>{post.seo_title || post.title} | CloudPOS Blog</title>
        <meta name="description" content={post.seo_description || post.excerpt} />
        <meta name="keywords" content={post.seo_keywords} />
        <link rel="canonical" href={post.canonical_url || window.location.href} />
        <meta name="robots" content={post.robots || 'index, follow'} />
        
        {/* Open Graph */}
        <meta property="og:type" content={post.og_type || 'article'} />
        <meta property="og:title" content={post.seo_title || post.title} />
        <meta property="og:description" content={post.seo_description || post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:url" content={window.location.href} />

        {/* Twitter */}
        <meta name="twitter:card" content={post.twitter_card || 'summary_large_image'} />
        <meta name="twitter:title" content={post.seo_title || post.title} />
        <meta name="twitter:description" content={post.seo_description || post.excerpt} />
        <meta name="twitter:image" content={post.image} />
        
        {post.schema_markup && (
          <script type="application/ld+json">
            {post.schema_markup}
          </script>
        )}
      </Helmet>

      <div className="max-w-3xl mx-auto">
        <Link 
          to="/resources/blog" 
          className="inline-flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors mb-8 font-bold text-sm uppercase tracking-wider"
        >
          <ArrowLeft size={16} />
          <span>Back to Blog</span>
        </Link>

        <header className="mb-12">
          <div className="flex items-center space-x-4 mb-6">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider border border-blue-100">
              {post.category?.name || 'Uncategorized'}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight leading-tight mb-8 text-gray-900">
            {post.title}
          </h1>

          <div className="flex items-center space-x-6 text-sm font-bold text-gray-500 uppercase tracking-wider border-y border-gray-100 py-6">
            <div className="flex items-center space-x-2">
              <Calendar size={16} className="text-blue-600" />
              <span>{format(new Date(post.createdAt), 'MMMM d, yyyy')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User size={16} className="text-blue-600" />
              <span>Admin</span>
            </div>
          </div>
        </header>

        {post.image && (
          <div className="mb-12 rounded-[2rem] overflow-hidden shadow-2xl shadow-gray-200/50 border border-gray-100">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Content */}
        <article className="prose prose-lg prose-slate max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-img:rounded-2xl">
           <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
        
        <div className="mt-16 pt-8 border-t border-gray-100">
            <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Share this article</p>
            <div className="flex justify-center space-x-4">
                <button className="p-3 rounded-full bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <Share2 size={20} />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
