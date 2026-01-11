import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';
import api from '../../utils/api.ts';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('adminUser', JSON.stringify(data));
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-blue-100/50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-cyan-100/50 rounded-full blur-3xl opacity-60"></div>
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100">
          
<div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <img 
                src="https://i.postimg.cc/QdSBd6bG/mediasoft_logo_v1.png" 
                alt="Mediasoft Logo" 
                className="h-16 w-auto object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Welcome Back</h1>
            <p className="text-gray-500 text-sm mt-2">Sign in to access your dashboard</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center space-x-3 text-red-600 text-sm animate-shake">
              <Sparkles size={16} className="text-red-500" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wide ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="email"
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                  placeholder="admin@mediasoftbd.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wide ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="password"
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center py-4 px-4 border border-transparent rounded-xl text-sm font-bold uppercase tracking-wide text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg shadow-blue-600/20 transform active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span className="mr-2">Log In</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form> 
          
          <div className="mt-8 text-center">
             <p className="text-xs text-gray-400">
               Protected by CloudPOS Security
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
