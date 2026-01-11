import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Features from './pages/Features.tsx';
import Plans from './pages/Plans.tsx';
import Contact from './pages/Contact.tsx';
import Customer from './pages/Customer.tsx';
import Login from './pages/admin/Login.tsx';
import Dashboard from './pages/admin/Dashboard.tsx';

import ClientLogos from './pages/admin/ClientLogos.tsx';
import { SiteSettingsProvider, useSiteSettings } from './context/SiteSettingsContext.tsx';

// ... (inside Routes)
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/* Dashboard Sub-routes could go here if structured that way, but currently Dashboard handles its own view switching or we need to adjust routing */}
        </Route>
        
        {/* We need to check if Dashboard uses Outlet or if we should add independent admin routes */}
        <Route 
          path="/admin/client-logos" 
          element={
            <ProtectedRoute>
              <Dashboard defaultView="client-logos" /> 
            </ProtectedRoute>
          } 
        />
import BlogList from './pages/blog/BlogList.tsx';
import BlogPost from './pages/blog/BlogPost.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

const PublicLayout = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />

      {/* Scroll to Top Floating Button */}
      <button
        onClick={scrollTop}
        className={`fixed bottom-8 right-8 z-[100] flex items-center justify-center w-14 h-14 bg-brand-dark text-white rounded-full shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] border border-white/10 transition-all duration-500 ease-in-out hover:bg-brand-cyan hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,185,242,0.4)] group ${
          showScroll ? 'opacity-100 translate-y-0 scale-100 cursor-pointer' : 'opacity-0 translate-y-10 scale-50 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <div className="absolute inset-0 rounded-full bg-brand-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md -z-10"></div>
        <ChevronUp size={24} className="group-hover:animate-bounce-subtle transition-transform duration-300" />
      </button>
    </div>
  );
}

const FaviconUpdater = () => {
   const { settings } = useSiteSettings();
   
   useEffect(() => {
     if (settings?.favicon) {
       const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
       if (link) {
         link.href = settings.favicon;
       } else {
         const newLink = document.createElement('link');
         newLink.rel = 'icon';
         newLink.href = settings.favicon;
         document.head.appendChild(newLink);
       }
     }
   }, [settings?.favicon]);

   return null;
};

const App: React.FC = () => {
  return (
    <SiteSettingsProvider>
      <FaviconUpdater />
      <ScrollToTop />
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/customer" element={<Customer />} />

          {/* Blog Routes */}
          <Route path="/resources/blog" element={<BlogList />} />
          <Route path="/resources/blog/:slug" element={<BlogPost />} />
        </Route>
      </Routes>
    </SiteSettingsProvider>
  );
};

export default App;