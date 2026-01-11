
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight, Sparkles } from 'lucide-react';
import { useSiteSettings } from '../context/SiteSettingsContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();
  const { settings } = useSiteSettings();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Body Scroll Lock for Mobile Menu
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Features & Benefits', path: '/features' },
    { name: 'Our Plans', path: '/plans' },
    { name: 'Resources', path: '#', hasDropdown: true },
    { name: 'Contact', path: '/contact' },
  ];

  const isSolid = isScrolled || (location.pathname !== '/' && location.pathname !== '/customer');
  const logoV3 = settings?.navbarLogoLight || "https://i.postimg.cc/x1qQLtQr/mediasoft-logo-v4.png"; // Light
  const logoV1 = settings?.navbarLogoDark || "https://i.postimg.cc/QdSBd6bG/mediasoft_logo_v1.png"; // Dark

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 h-20 flex items-center animate-nav-arrival ${
          isSolid 
            ? 'bg-white shadow-xl border-b border-gray-100 text-gray-900' 
            : 'bg-transparent text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between items-center h-full">
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center animate-nav-item-wave" style={{ animationDelay: '200ms' }}>
              <Link to="/" className="relative block h-[72px] w-[180px] logo-container group">
                <div className="absolute inset-0 logo-shine z-20 pointer-events-none opacity-50"></div>
                <img
                  className={`absolute inset-0 h-full w-full object-contain transition-all duration-700 ${
                    !isSolid ? 'opacity-100 scale-100' : 'opacity-0 scale-90 -translate-y-2'
                  }`}
                  src={logoV3}
                  alt="Mediasoft Light"
                />
                <img
                  className={`absolute inset-0 h-full w-full object-contain transition-all duration-700 ${
                    isSolid ? 'opacity-100 scale-100' : 'opacity-0 scale-90 translate-y-2'
                  }`}
                  src={logoV1}
                  alt="Mediasoft Dark"
                />
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10">
              {navLinks.map((link, idx) => (
                <div 
                  key={link.name} 
                  className="relative group animate-nav-item-wave opacity-0" 
                  style={{ animationDelay: `${400 + (idx * 100)}ms` }}
                >
                  <Link
                    to={link.path}
                    className={`flex items-center text-[11px] font-black tracking-[0.2em] transition-all duration-300 uppercase hover:scale-105 ${
                      location.pathname === link.path
                        ? (isSolid ? 'text-brand-cyan' : 'text-white underline underline-offset-8')
                        : (isSolid ? 'text-gray-700 hover:text-brand-cyan' : 'text-white/90 hover:text-white')
                    }`}
                  >
                    {link.name}
                    {link.hasDropdown && <ChevronDown className="ml-1.5 h-3.5 w-3.5" />}
                  </Link>
                  {link.hasDropdown && (
                    <div className="absolute left-0 top-full pt-3 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-[60]">
                      <div className="bg-white text-gray-800 rounded-xl shadow-2xl border border-gray-50 overflow-hidden">
                        <div className="py-1">
                          <Link to="/customer" className="block px-6 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 hover:text-brand-cyan transition-colors">Customer Success</Link>
                          <div className="h-px bg-gray-50 mx-6"></div>
                          <Link to="/resources/blog" className="block px-6 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 hover:text-brand-cyan transition-colors">Blog</Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div 
                className="animate-nav-item-wave opacity-0" 
                style={{ animationDelay: `${400 + (navLinks.length * 100)}ms` }}
              >
                <Link 
                  to="/contact"
                  className={`px-6 py-2.5 rounded-full text-[10px] font-black tracking-widest uppercase transition-all duration-300 inline-block text-center ${
                    isSolid 
                      ? 'bg-brand-dark text-white shadow-lg hover:bg-brand-blue' 
                      : 'bg-white text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(true)}
                className={`p-2 rounded-xl transition-all active:scale-90 ${isSolid ? 'text-gray-900 bg-gray-100' : 'text-white bg-white/10'}`}
              >
                <Menu className="h-7 w-7" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Overhauled Mobile Menu */}
      <div 
        className={`fixed inset-0 z-[100] transition-all duration-700 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Background Layers */}
        <div className="absolute inset-0">
          {/* Abstract texture */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center"></div>
          {/* Dark Overlay with Blur */}
          <div className="absolute inset-0 bg-brand-dark/95 backdrop-blur-3xl"></div>
          {/* Subtle noise/grid */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          
          {/* Animated Blobs */}
          <div className={`absolute -top-20 -right-20 w-[400px] h-[400px] bg-brand-cyan/20 rounded-full blur-[120px] transition-transform duration-1000 ${isOpen ? 'scale-100 translate-y-0' : 'scale-0'}`}></div>
          <div className={`absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-brand-blue/20 rounded-full blur-[120px] transition-transform duration-1000 delay-300 ${isOpen ? 'scale-100' : 'scale-0'}`}></div>
        </div>

        {/* Menu Content */}
        <div className="relative h-full flex flex-col p-6 sm:p-12 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <div className={`transition-all duration-700 delay-300 ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <img src={logoV3} alt="Mediasoft" className="h-10 w-auto" />
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className={`p-4 rounded-2xl bg-white/10 border border-white/20 text-white transition-all duration-500 hover:bg-brand-cyan active:scale-90 ${isOpen ? 'rotate-0' : 'rotate-90'}`}
            >
              <X size={24} />
            </button>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col space-y-4">
            {navLinks.map((link, idx) => (
              <div 
                key={link.name} 
                className={`transform transition-all duration-700 ${
                  isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${300 + idx * 75}ms` }}
              >
                {link.hasDropdown ? (
                  <div className="py-4 space-y-4">
                    <div className="flex items-center space-x-3">
                       <span className="text-[10px] font-black text-brand-cyan uppercase tracking-[0.4em]">Explore More</span>
                       <div className="flex-grow h-px bg-white/10"></div>
                    </div>
                    <Link
                      to="/customer"
                      onClick={() => setIsOpen(false)}
                      className="text-3xl font-black text-white hover:text-brand-cyan transition-colors flex items-center justify-between group"
                    >
                      <span>Customer Success</span>
                      <ArrowRight size={20} className="text-brand-cyan opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                    </Link>
                    <div className="h-px bg-white/10 my-4"></div>
                    <Link
                      to="/resources/blog"
                      onClick={() => setIsOpen(false)}
                      className="text-3xl font-black text-white hover:text-brand-cyan transition-colors flex items-center justify-between group"
                    >
                      <span>Blog</span>
                      <ArrowRight size={20} className="text-brand-cyan opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                    </Link>
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-4xl font-black uppercase tracking-tighter flex items-center justify-between group transition-all ${
                      location.pathname === link.path ? 'text-brand-cyan' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ArrowRight size={24} className={`transition-all ${
                      location.pathname === link.path ? 'opacity-100 translate-x-0 text-brand-cyan' : 'opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0'
                    }`} />
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Footer of Menu */}
          <div className={`mt-auto pt-12 transform transition-all duration-700 delay-[800ms] ${
            isOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <Link 
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="w-full relative group overflow-hidden bg-brand-cyan text-brand-dark py-6 rounded-[2rem] font-black uppercase tracking-[0.4em] text-sm shadow-2xl flex items-center justify-center space-x-3"
            >
              <span className="relative z-10">GET STARTED</span>
              <Sparkles size={18} className="relative z-10 animate-pulse" />
              <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] group-hover:left-[100%] transition-all duration-1000"></div>
            </Link>
            
            <div className="mt-8 flex justify-center space-x-6">
               <a href="https://www.facebook.com/mediasoftbd/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#1877F2] rounded-lg flex items-center justify-center hover:opacity-80 transition-all hover:-translate-y-1 shadow-md">
                <i className="fa-brands fa-facebook-f text-white text-lg"></i>
              </a>
              <a href="https://wa.me/+8801708122851" className="w-10 h-10 bg-[#25D366] rounded-lg flex items-center justify-center hover:opacity-80 transition-all hover:-translate-y-1 shadow-md">
                <i className="fa-brands fa-whatsapp text-white text-lg"></i>
              </a>
              <a href="https://x.com/MediasoftPOS" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#000000] rounded-lg flex items-center justify-center hover:opacity-80 transition-all hover:-translate-y-1 shadow-md border border-white/10">
                <i className="fa-brands fa-x-twitter text-white text-lg"></i>
              </a>
              <a href="https://www.youtube.com/@mediasoftbd" className="w-10 h-10 bg-[#FF0000] rounded-lg flex items-center justify-center hover:opacity-80 transition-all hover:-translate-y-1 shadow-md">
                <i className="fa-brands fa-youtube text-white text-lg"></i>
              </a>
              <a href="https://www.instagram.com/mediasoftbd/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-lg flex items-center justify-center hover:opacity-80 transition-all hover:-translate-y-1 shadow-md">
                <i className="fa-brands fa-instagram text-white text-lg"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
