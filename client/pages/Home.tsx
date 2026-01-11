import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
/* Added ArrowRight to the lucide-react imports to resolve "Cannot find name 'ArrowRight'" error on line 303 */
import { Settings, Monitor, Share2, LayoutGrid, Lock, Database, Smartphone, Headphones, BarChart3, Zap, DollarSign, Quote, CheckCircle2, Globe, ShieldCheck, ChevronLeft, ChevronRight, ArrowRight, Shirt, ShoppingCart, Stethoscope, Gem, Footprints, Cpu, ZapOff, CloudUpload, Activity, Plus, Minus, Sparkles, Rocket, Clock, Star, PlayCircle, Layers } from 'lucide-react';
import SEO from '../components/SEO.tsx';
import api from '../utils/api'; // Import api instance

// Hardcoded testimonials removed in favor of dynamic fetching
const initialTestimonials = [
  {
    text: "CloudPOS is one of the best software I have ever used in my life. Their vendors are so helpful. Whenever I need help, they just help me within 5 minutes. I'm so happy using their software.",
    author: "Sancred Welfare Foundation",
    status: " Enterprise Client",
    logo: "https://i.postimg.cc/jSSLFpVS/Sancred_Welfare_Foundation.png"
  },
  {
    text: "Always dedicated to customer.Whenever issues arises right away they reply and respond and solve the issues with dedication. Customer service is the first priority.",
    author: "Bright Point",
    status: "Mobile Shop Client",
    logo: "https://i.postimg.cc/85pp7W1t/bright_point.png"
  },
  {
    text: "Mediasoft  is a much better software system rather than others it’s my experience",
    author: "Inglot Baily Road",
    status: "Cosmetics Shop Client",
    logo: "https://i.postimg.cc/R0GGB5qF/inglot_bailyroad.png"
  },
  {
    text: "Last 5 years We use these system And we are Satisfy their Service. Please Keep going.",
    author: "Little Angels",
    status: "Retail Client",
    logo: "https://i.postimg.cc/N0yVpjpP/little_angel.png"
  }
];

// Hardcoded logos removed in favor of dynamic fetching
const initialLogos = [
  "https://i.postimg.cc/QtZ377hm/adlib_logo.png",
  "https://i.postimg.cc/C1pg88SH/big_bazar.png",
  "https://i.postimg.cc/V6P8ttmD/kids_paradise.png",
  "https://i.postimg.cc/NMvcXXBN/krishibid_bazar.png",
  "https://i.postimg.cc/PxnjDDTF/kulshi_mart.png",
  "https://i.postimg.cc/63xXZZtS/lend.png",
  "https://i.postimg.cc/XJ6b554m/longla.png",
  "https://i.postimg.cc/QtZ377j3/m_bazar.png",
  "https://i.postimg.cc/C1pg88wp/marie_stops_logo.png",
  "https://i.postimg.cc/Kz7yDY8s/paysa_bazar.png",
  "https://i.postimg.cc/3RjHFwxc/purple.png",
  "https://i.postimg.cc/63VNfQpS/richman.png",
  "https://i.postimg.cc/B65GBvnk/sator_logoi.png",
  "https://i.postimg.cc/k4Ndv55r/step_logo.png",
  "https://i.postimg.cc/mD3GyrrG/the_basket.png"
];

const industries = [
  { 
    img: "https://i.postimg.cc/vTTh0rpB/apparel-store.webp", 
    title: "APPAREL STORE", 
    desc: "CloudPOS transforms Apparel retailing. Our solution ensures seamless transactions, real-time inventory tracking, and personalized customer experiences. Stay ahead in the fashion game with CloudPOS.",
    icon: Shirt
  },
  { 
    img: "https://i.postimg.cc/m2Rds9Ht/supershop.webp", 
    title: "SUPER SHOP", 
    desc: "Efficiently manage your Super Shop with CloudPOS. Our all-in-one solution enables quick service and accurate inventory management, ensuring smooth operations and satisfied customers.",
    icon: ShoppingCart
  },
  { 
    img: "https://i.postimg.cc/K4XTttFv/pharmacy-store.webp", 
    title: "PHARMACY STORE", 
    desc: "CloudPOS streamlines Pharmacy operations with features like expire management and real-time data access. Simplify prescription handling and inventory control while maintaining compliance and providing exceptional service.",
    icon: Stethoscope
  },
  { 
    img: "https://i.postimg.cc/WpmsVMq3/lifesytle-Shop.webp", 
    title: "LIFE STYLE SHOP", 
    desc: "CloudPOS is the perfect solution for managing Lifestyle Stores. With omnichannel integration and mobile compatibility, you can offer a seamless shopping experience across channels, boosting customer engagement and loyalty.",
    icon: Gem
  },
  { 
    img: "https://i.postimg.cc/T3hCcKN1/show-footwear.webp", 
    title: "FOOTWEAR SHOPS", 
    desc: "Run Footwear Store effortlessly with CloudPOS. Our userfriendly interface and customizable features make it easy to process transactions and track inventory. Stay ahead of trends and meet your customer demands.",
    icon: Footprints
  },
  { 
    img: "https://i.postimg.cc/dtHPQnqg/electronics-store.webp", 
    title: "ELECTRONICS STORE", 
    desc: "CloudPOS is the perfect solution for Electronics Shops. With cutting-edge technology and secure payment gateways, you can offer a modern shopping experience while effectively managing sales, promotions, and customers.",
    icon: Cpu
  }
];

const benefits = [
  { 
    icon: LayoutGrid, 
    title: "USER-FRIENDLY INTERFACE", 
    desc: "Designed for speed and ease of use.",
    animation: "animate-pulse-soft"
  },
  { 
    icon: Lock, 
    title: "SECURE TRANSACTIONS", 
    desc: "Enterprise-grade encryption for every sale.",
    animation: "animate-bounce-subtle"
  },
  { 
    icon: CloudUpload, 
    title: "REAL-TIME DATA SYNC", 
    desc: "Instant updates across all store locations.",
    animation: "animate-float"
  },
  { 
    icon: Smartphone, 
    title: "MULTI-DEVICE SUPPORT", 
    desc: "Run your business from tablet, PC or mobile.",
    animation: "animate-pulse-glow"
  },
  { 
    icon: Headphones, 
    title: "24/7 DEDICATED SUPPORT", 
    desc: "Always here to help your business grow.",
    animation: "animate-pulse-soft"
  },
  { 
    icon: Activity, 
    title: "LIVE ANALYTICS", 
    desc: "Visual dashboards for better decision making.",
    animation: "animate-float"
  },
  { 
    icon: Share2, 
    title: "THIRD-PARTY INTEGRATION", 
    desc: "Connect with your favorite apps seamlessly.",
    animation: "animate-spin-slow"
  },
  { 
    icon: ZapOff, 
    title: "OFFLINE MODE CAPABILITY", 
    desc: "Never stop selling, even without internet.",
    animation: "animate-pulse-glow"
  }
];

const whyChooseItems = [
  { 
    title: "EASY TO SETUP", 
    icon: Zap, 
    detail: "With Cloud POS, simplicity meets efficiency. Setting up your system is a breeze, and the user-friendly interface ensures a smooth understanding of its functions. Experience the ease of managing your business operations effortlessly." 
  },
  { 
    title: "SECURE & RELIABLE", 
    icon: Lock, 
    detail: "Cloud POS stands as the epitome of security and reliability in the realm of point-of-sale solutions. Boasting advanced security features, your business transactions are fortified against potential threats. With unwavering reliability, trust Cloud POS to ensure consistent and secure operations, providing you with peace of mind in the ever-evolving business landscape." 
  },
  { 
    title: "COST EFFECTIVE", 
    icon: DollarSign, 
    detail: "CloudPOS offering an optimal blend of affordability and performance. With our solution, you can achieve business efficiency without breaking the bank. Streamline operations, enhance productivity, and maximize savings with our cost-effective approach, making it the smart choice for businesses aiming for financial prudence without compromising quality." 
  },
  { 
    title: "REAL-TIME INSIGHTS", 
    icon: BarChart3, 
    detail: "Cloud POS empowers you with instantaneous access to crucial data, facilitating informed decision-making. Stay ahead of the curve by harnessing real-time analytics, ensuring your business adapts and thrives in the dynamic landscape with precise, up-to-the-minute insights." 
  }
];

const stats = [
  { label: "TOTAL CLIENTS", value: 250, suffix: "+" },
  { label: "PROJECT DONE", value: 250, suffix: "+" },
  { label: "SATISFIED CLIENTS", value: 99, suffix: "%" },
  { label: "YEARS OF EXPERIENCE", value: 25, suffix: "+" }
];

const Counter = ({ value, suffix, isVisible }: { value: number; suffix: string; isVisible: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return <>{count}{suffix}</>;
};


const Home: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isStepsVisible, setIsStepsVisible] = useState(false);
  const [clientLogos, setClientLogos] = useState<string[]>(initialLogos);
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const statsRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const { data } = await api.get('/client-logos');
        if (data && data.length > 0) {
          setClientLogos(data.map((l: any) => l.imageUrl));
        }
      } catch (error) {
        console.error('Error fetching client logos:', error);
      }
    };

    const fetchTestimonials = async () => {
      try {
        const { data } = await api.get('/testimonials');
        if (data && data.length > 0) {
           const mapped = data.map((t: any) => ({
             text: t.text,
             author: t.author,
             status: t.designation,
             logo: t.logoUrl
           }));
           setTestimonials(mapped);
        }
      } catch (error) {
         console.error('Error fetching testimonials:', error);
      }
    };

    fetchLogos();
    fetchTestimonials();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        // Just used to trigger any state if needed for isScrolled but removed here as per requirement
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStatsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Added observer for the steps section to trigger animations on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStepsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (stepsRef.current) {
      observer.observe(stepsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentTestimonial, isHovered]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      setIsAnimating(false);
    }, 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsAnimating(false);
    }, 500);
  };

  const toggleAccordion = (index: number) => {
    expandedIndex === index ? null : index;
    setExpandedIndex(expandedIndex === index ? null : index);
  };



  return (
    <div className="overflow-hidden">
      <SEO page="home" />
      {/* 1. Hero Section - Enhanced Responsiveness */}
      <section className="relative hero-bg min-h-[85vh] lg:h-screen flex items-center pt-28 lg:pt-32 pb-16 lg:pb-12 px-4 overflow-hidden">
        {/* Subtle Overlay Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between w-full relative z-10 gap-12 lg:gap-0">
          <div className="w-full lg:w-1/2 text-white space-y-6 lg:space-y-8 animate-fade-in text-center lg:text-left flex flex-col items-center lg:items-start">
            {/* Top Badge */}
            <div className="inline-flex items-center space-x-3 px-4 py-1.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-inner animate-pulse-soft">
              <Sparkles size={16} className="text-brand-cyan" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em]">Next-Gen Retail Engine</span>
            </div>

            {/* Headline - Size increased for mobile */}
            <h1 className="text-4xl sm:text-4xl md:text-4xl lg:text-5xl font-black leading-[1.1] tracking-tighter text-shadow-sm font-heading">
              The <span className="text-brand-dark">Smarter</span> Way<br />
              To Manage Sales
            </h1>

            {/* Informative Subtext */}
            <p className="text-sm sm:text-base md:text-lg font-medium opacity-90 max-w-xl leading-relaxed">
              Achieve 40% faster checkouts and complete inventory control with our 
              Enterprise CloudPOS solution. Designed for the high-speed retail era.
            </p>

            {/* Quick Feature Highlights - Hidden for mobile view */}
            <div className="hidden lg:grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4 pt-2 w-full max-w-lg lg:max-w-none">
              <div className="flex flex-col sm:flex-row items-center sm:space-x-2 group justify-center lg:justify-start">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/10 flex items-center justify-center text-brand-cyan group-hover:bg-brand-cyan group-hover:text-white transition-all mb-1 sm:mb-0">
                  <CloudUpload size={16} />
                </div>
                <span className="text-[7px] sm:text-[9px] font-black uppercase tracking-widest text-white/80 whitespace-nowrap">Cloud Sync</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:space-x-2 group justify-center lg:justify-start">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/10 flex items-center justify-center text-brand-cyan group-hover:bg-brand-cyan group-hover:text-white transition-all mb-1 sm:mb-0">
                  <ZapOff size={16} />
                </div>
                <span className="text-[7px] sm:text-[9px] font-black uppercase tracking-widest text-white/80 whitespace-nowrap">Offline Pro</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:space-x-2 group justify-center lg:justify-start">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/10 flex items-center justify-center text-brand-cyan group-hover:bg-brand-cyan group-hover:text-white transition-all mb-1 sm:mb-0">
                  <Activity size={16} />
                </div>
                <span className="text-[7px] sm:text-[9px] font-black uppercase tracking-widest text-white/80 whitespace-nowrap">Live Stats</span>
              </div>
            </div>

            {/* Action Buttons - Stacked on small screens and connected to pages */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4 w-full sm:w-auto">
              <Link to="/contact" className="bg-brand-dark hover:bg-black text-white px-8 lg:px-10 py-4 lg:py-5 rounded-2xl font-black text-[10px] tracking-[0.3em] uppercase shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-3">
                <span>Get Started</span>
                <ArrowRight size={16} className="text-brand-cyan" />
              </Link>
              <Link to="/plans" className="bg-white/10 backdrop-blur-xl border-2 border-white/20 hover:bg-white hover:text-brand-dark text-white px-6 lg:px-8 py-4 lg:py-5 rounded-2xl font-black text-[10px] tracking-[0.3em] uppercase transition-all flex items-center justify-center space-x-3 group">
                <span>See Pricing Plan</span>
                <ArrowRight size={16} className="text-brand-cyan transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Performance & Security Highlights */}
            <div className="pt-6 lg:pt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 lg:gap-10 border-t border-white/10 w-full lg:w-auto">
               <div className="flex items-center space-x-2 sm:space-x-3">
                 <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
                 <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-white/80">99.9% Uptime SLA</span>
               </div>
               <div className="flex items-center space-x-2 sm:space-x-3">
                 <ShieldCheck size={12} className="text-brand-cyan sm:hidden" />
                 <ShieldCheck size={14} className="text-brand-cyan hidden sm:block" />
                 <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-white/80">ISO 27001 Security</span>
               </div>
            </div>
          </div>

          {/* Image Side - Refined Scale for all devices */}
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0 relative flex justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative group w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl px-6 lg:px-0">
              {/* Dynamic Glow Circles */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-white/5 rounded-full blur-[80px] animate-pulse-soft"></div>
              
              {/* Main Device Image */}
              <img
                src="https://i.postimg.cc/k58kyHhH/device-all.webp"
                alt="CloudPOS Ecosystem"
                className="w-full h-auto relative z-10 transition-all duration-1000 ease-out group-hover:scale-[1.03] drop-shadow-[0_25px_35px_rgba(0,0,0,0.2)] lg:drop-shadow-[0_45px_65px_rgba(0,0,0,0.3)]"
              />

              {/* Interactive Status Badges - Repositioned for mobile viewability */}
              <div className="absolute top-2 -left-2 sm:top-4 sm:-left-4 lg:top-10 lg:-left-10 bg-white/95 backdrop-blur-xl p-2 sm:p-3 lg:p-4 rounded-xl sm:rounded-2xl shadow-xl lg:shadow-2xl animate-float z-20 border border-white scale-75 sm:scale-90 lg:scale-100 origin-top-left">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="bg-brand-cyan p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-white">
                    <Layers size={14} className="sm:hidden" />
                    <Layers size={18} className="hidden sm:block" />
                  </div>
                  <div>
                    <p className="text-[7px] sm:text-[8px] font-black text-gray-400 uppercase tracking-widest">Stock Sync</p>
                    <p className="text-[9px] sm:text-[11px] font-black text-brand-dark">100% Active</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-2 -right-2 sm:bottom-0 sm:-right-4 lg:-bottom-6 lg:-right-6 bg-white p-3 sm:p-4 lg:p-5 rounded-2xl sm:rounded-[2rem] shadow-xl lg:shadow-2xl animate-bounce-subtle z-20 border border-slate-50 scale-75 sm:scale-90 lg:scale-100 origin-bottom-right">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="bg-green-500 p-1.5 sm:p-2 rounded-lg sm:rounded-xl shadow-lg">
                    <CheckCircle2 className="text-white w-4 h-4 sm:w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[7px] sm:text-[8px] font-black text-gray-400 uppercase tracking-widest">System Status</p>
                    <p className="text-[9px] sm:text-[11px] font-black text-gray-900 font-heading">Secure & Online</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Dark Feature Bar - Enhanced with Step Badges & Arrow Connectors */}
      <div className="wave-divider" style={{ marginTop: '-40px', zIndex: 20 }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80L1440 80V0C1080 40 360 40 0 0V80Z" fill="#1b2230" />
        </svg>
      </div>
      <section ref={stepsRef} className="bg-[#1b2230] text-white py-32 px-4 relative z-20 overflow-visible">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-24 md:gap-20 text-center">
          {[
            { icon: Settings, title: "Customize", animation: "animate-spin-slow", desc: "CloudPOS software is entirely adaptable to your precise requirements. Employ our guided scripting feature to integrate distinct functionality for your business’s" },
            { icon: Monitor, title: "Install", animation: "animate-bounce-subtle", desc: "Our system, easy to install and fully optimized, is a native application perfectly designed for any business. Access everything from anywhere, ai your fingertips!" },
            { icon: Share2, title: "Integrate", animation: "animate-pulse-glow", desc: "CloudPOS prioritize flexibility by offering seamless integrations. You can also integrate third-party applications, to enhancing your business operations!" }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className={`group relative h-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-12 transition-all duration-500 hover:bg-white/[0.07] hover:border-brand-cyan/40 hover:-translate-y-3 shadow-[0_20px_50px_rgba(0,0,0,0.3)] cursor-default flex flex-col items-center opacity-0 ${isStepsVisible ? 'animate-step-card-in' : ''}`}
              style={{ animationDelay: `${idx * 250}ms` }}
            >
              {/* Step Badge */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-brand-cyan text-brand-dark text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl shadow-[0_15px_30px_-5px_rgba(0,185,242,0.4)] z-30 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500 whitespace-nowrap">
                Step 0{idx + 1}
              </div>

              {/* Arrow Connector Logic */}
              {idx < 2 && (
                <div className="absolute top-[105%] md:top-1/2 left-1/2 md:left-auto md:-right-12 lg:-right-16 -translate-x-1/2 md:translate-x-0 md:-translate-y-1/2 z-40">
                   <div className="w-12 h-12 rounded-full bg-brand-dark border border-white/10 flex items-center justify-center text-brand-cyan shadow-2xl group-hover:scale-110 transition-transform">
                      <ArrowRight size={24} className="md:rotate-0 rotate-90 animate-pulse" />
                   </div>
                </div>
              )}

              {/* Animated Icon Container */}
              <div className="mb-8 p-6 rounded-3xl bg-white/5 border border-white/5 group-hover:bg-brand-cyan group-hover:text-brand-dark transition-all duration-700 shadow-inner">
                <item.icon size={48} strokeWidth={1.2} className={`${item.animation} transition-all duration-500`} />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-black uppercase tracking-[0.2em] font-heading transition-colors group-hover:text-brand-cyan">
                  {item.title}
                </h3>
                <div className="w-10 h-1 bg-brand-cyan/20 mx-auto rounded-full group-hover:w-20 group-hover:bg-brand-cyan transition-all duration-500"></div>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto group-hover:text-gray-200 transition-colors">
                  {item.desc}
                </p>
              </div>
              
              {/* Decorative Corner Element */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-10 transition-opacity">
                <Sparkles size={40} className="text-brand-cyan" />
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="wave-divider" style={{ zIndex: 20 }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0L1440 0V80C1080 40 360 40 0 80V0Z" fill="#1b2230" />
        </svg>
      </div>

      {/* 3. Industries Grid */}
      <section className="py-24 px-4 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-cyan/5 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-[100px] -z-10"></div>

        <div className="max-w-7xl mx-auto text-center mb-20 space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/5 border border-brand-blue/10 mb-2">
             <span className="text-[10px] font-black text-brand-blue uppercase tracking-[0.2em]">Industry Solutions</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight font-heading leading-tight">
            CloudPOS Software For<br />All Businesses
          </h2>
          <p className="text-gray-400 font-bold tracking-[0.2em] uppercase text-[10px] max-w-lg mx-auto leading-relaxed">
            Make every sales count with industry-specific CloudPOS intelligence tailored to your unique workflows
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {industries.map((item, idx) => (
            <div key={idx} className="group relative bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-700 ease-out border border-gray-100 hover:border-brand-cyan/20 hover:-translate-y-2 cursor-pointer">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
                <div className="absolute bottom-6 right-6 w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center text-brand-blue group-hover:bg-brand-cyan group-hover:text-white group-hover:rotate-[360deg] transition-all duration-700 ease-in-out">
                  <item.icon size={28} strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-10 text-center space-y-5">
                <div className="space-y-2">
                  <h4 className="text-xl font-bold tracking-widest uppercase text-gray-900 font-heading group-hover:text-brand-blue transition-colors duration-300">
                    {item.title}
                  </h4>
                  <div className="w-12 h-1 bg-brand-cyan/20 mx-auto rounded-full overflow-hidden">
                    <div className="w-full h-full bg-brand-cyan -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  </div>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed font-medium px-4">
                  {item.desc}
                </p>
                <div className="pt-2">
                   <span className="text-[9px] font-black text-brand-cyan opacity-0 group-hover:opacity-100 uppercase tracking-[0.3em] transition-all duration-500 translate-y-2 group-hover:translate-y-0 inline-block">
                     Optimized Solution
                   </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Modernized Benefits Section */}
      <section className="brand-gradient py-32 px-4 text-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-white/5 rounded-full blur-[100px] animate-float opacity-30"></div>
        <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-brand-cyan/10 rounded-full blur-[120px] animate-pulse-soft opacity-40"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] font-black text-white/5 pointer-events-none select-none uppercase tracking-widest overflow-hidden whitespace-nowrap">
          ADVANTAGES
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24 space-y-8">
            <div className="inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-inner">
              <Sparkles size={16} className="text-brand-cyan" />
              <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Core Values</span>
            </div>
            {/* Title updated: "Benefits" word set to dark */}
            <h2 className="text-3xl md:text-5xl font-extrabold text-shadow-sm font-heading leading-tight tracking-tighter">
              CloudPOS <span className="text-brand-dark">Benefits</span>
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-brand-cyan to-transparent mx-auto rounded-full shadow-[0_0_20px_rgba(0,185,242,0.8)]"></div>
            <p className="text-lg font-medium tracking-wide max-w-3xl mx-auto leading-relaxed opacity-80">
              Transforming your business operations with powerful, scalable, and intuitive cloud technology designed for the modern retail era.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="group relative">
                {/* Glow Effect on Hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-br from-brand-cyan to-brand-blue rounded-[2.5rem] opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-md"></div>
                
                <div className="relative h-full bg-white/[0.08] backdrop-blur-2xl rounded-[2.5rem] p-8 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 group-hover:bg-white/[0.12] group-hover:border-white/20 group-hover:-translate-y-4 flex flex-col items-start space-y-8 overflow-hidden">
                  
                  {/* Decorative number in bg */}
                  <span className="absolute top-6 right-8 text-5xl font-black text-white/[0.03] select-none pointer-events-none group-hover:text-white/[0.08] transition-colors">
                    0{idx + 1}
                  </span>

                  {/* Icon Container with multi-layered design */}
                  <div className="relative">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl border border-white/20 flex items-center justify-center shadow-lg backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-white group-hover:text-brand-blue">
                      <benefit.icon size={32} strokeWidth={1.5} className={`${benefit.animation}`} />
                    </div>
                    {/* Pulsing ring */}
                    <div className="absolute -inset-2 border border-brand-cyan/20 rounded-2xl animate-pulse group-hover:animate-ping group-hover:border-brand-cyan/40"></div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-black tracking-[0.15em] uppercase font-heading text-white leading-tight group-hover:text-brand-cyan transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <div className="w-10 h-0.5 bg-brand-cyan/40 rounded-full group-hover:w-20 group-hover:bg-brand-cyan transition-all duration-500"></div>
                    <p className="text-xs font-medium text-white/60 leading-relaxed group-hover:text-white transition-colors">
                      {benefit.desc}
                    </p>
                  </div>

                  {/* Bottom arrow/indicator */}
                  <div className="pt-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                    <Rocket size={16} className="text-brand-cyan" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 text-center">
            <Link to="/features" className="inline-block relative overflow-hidden group/btn bg-white text-brand-blue hover:text-white px-14 py-5 rounded-[2rem] font-black text-xs tracking-[0.4em] uppercase shadow-[0_20px_40px_-15px_rgba(0,0,0,0.4)] transition-all duration-500">
              <div className="absolute inset-0 bg-brand-dark translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out"></div>
              <span className="relative z-10">DISCOVER THE POWER</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Why Choose CloudPOS? - Dark Accordion Redesign */}
      <section className="py-32 px-4 relative overflow-hidden bg-[#fdfdfd]">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start gap-20">
            <div className="lg:w-1/2 space-y-12 lg:sticky lg:top-32">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-3 px-4 py-2 bg-brand-blue/5 rounded-full border border-brand-blue/10">
                  <Sparkles size={16} className="text-brand-cyan animate-pulse" />
                  <span className="text-[10px] font-black text-brand-blue uppercase tracking-[0.2em]">Industry Leader</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-[1.1] font-heading tracking-tight">
                  Why Choose<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-cyan">CloudPOS?</span>
                </h2>
                <div className="w-20 h-2 bg-brand-cyan rounded-full shadow-lg shadow-brand-cyan/20"></div>
                <p className="text-gray-500 text-lg leading-relaxed font-medium max-w-xl">
                  We empower retail growth through a cost-effective, hyper-scalable, and rock-solid reliable POS solution that evolves with your business.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: '99.9% Uptime Guarantee', icon: Activity },
                  { title: 'Enterprise-Grade Security', icon: ShieldCheck },
                  { title: 'Global Data Sync', icon: Globe },
                  { title: 'Instant Deployment', icon: Zap }
                ].map((feature, i) => (
                  <div key={i} className="flex items-center space-x-4 p-5 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group cursor-default">
                    <div className="w-12 h-12 rounded-2xl bg-brand-blue/5 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all shadow-inner">
                      <feature.icon size={22} />
                    </div>
                    <span className="text-xs font-bold text-gray-800 uppercase tracking-widest leading-tight">{feature.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2 w-full space-y-6">
              {whyChooseItems.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`group/item overflow-hidden transition-all duration-500 rounded-[2.5rem] border ${
                    expandedIndex === idx 
                      ? 'bg-brand-dark border-brand-cyan/40 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]' 
                      : 'bg-brand-dark/90 border-white/5 hover:border-white/10 hover:shadow-lg'
                  }`}
                >
                  <div 
                    onClick={() => toggleAccordion(idx)} 
                    className="flex items-center justify-between p-7 cursor-pointer"
                  >
                    <div className="flex items-center space-x-8">
                      <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all duration-700 ${
                        expandedIndex === idx 
                          ? 'bg-brand-cyan text-white scale-110 shadow-[0_15px_30px_-5px_rgba(0,185,242,0.4)]' 
                          : 'bg-white/10 text-gray-300 group-hover/item:bg-white/20 group-hover/item:text-white'
                      }`}>
                        <item.icon size={30} strokeWidth={1.5} />
                      </div>
                      <div className="space-y-1">
                        <h4 className={`text-base font-black tracking-[0.2em] uppercase font-heading transition-colors duration-300 ${
                          expandedIndex === idx ? 'text-white' : 'text-gray-300'
                        }`}>
                          {item.title}
                        </h4>
                        <div className={`h-1 bg-brand-cyan rounded-full transition-all duration-500 ${
                          expandedIndex === idx ? 'w-12' : 'w-0'
                        }`}></div>
                      </div>
                    </div>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                      expandedIndex === idx 
                        ? 'bg-white text-brand-dark rotate-180' 
                        : 'bg-white/5 text-gray-400 group-hover/item:bg-white/10'
                    }`}>
                      {expandedIndex === idx ? <Minus size={20} /> : <Plus size={20} />}
                    </div>
                  </div>
                  <div 
                    className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      expandedIndex === idx ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-7 pb-10 pl-32 pr-12">
                      <div className="h-px w-full bg-white/10 mb-8"></div>
                      <div className="relative">
                        <Quote className="absolute -left-10 -top-4 text-white/5 w-16 h-16 pointer-events-none" />
                        <p className="text-gray-300 text-base leading-[1.8] font-medium italic">
                          {item.detail}
                        </p>
                      </div>
                      <div className="mt-8 flex justify-end">
                        <Link to="/contact" className="text-[10px] font-black text-brand-cyan uppercase tracking-[0.3em] flex items-center space-x-2 hover:text-white transition-colors">
                          <span>LEARN MORE</span>
                          <ChevronRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <Link to="/plans#pricing-section" className="w-full relative overflow-hidden group/btn bg-brand-dark hover:bg-black text-white px-10 py-7 rounded-[2rem] font-black text-xs tracking-[0.4em] uppercase transition-all duration-500 shadow-2xl mt-4 border border-white/10 text-center block">
                <span className="relative z-10">SEE OUR PLANS & PRICING</span>
                <div className="absolute inset-0 bg-brand-cyan translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700 ease-out opacity-20"></div>
              </Link>
            </div>
          </div>

          <div ref={statsRef} className="mt-32 p-10 md:p-16 bg-[#1b2230] rounded-[4rem] shadow-2xl relative overflow-hidden">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-brand-cyan/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 relative z-10">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center space-y-4">
                  <h3 className="text-4xl md:text-7xl font-extrabold text-brand-cyan font-heading tracking-tighter text-shadow-sm">
                    <Counter value={stat.value} suffix={stat.suffix} isVisible={isStatsVisible} />
                  </h3>
                  <div className="w-8 h-1 bg-white/20 mx-auto rounded-full"></div>
                  <p className="text-white text-[10px] md:text-xs font-black tracking-[0.3em] uppercase leading-tight opacity-90">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. A Better Way to Work */}
      <section className="py-32 px-4 relative overflow-hidden bg-slate-50">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-20 right-0 w-64 h-64 bg-brand-blue/5 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-24">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white border border-gray-100 rounded-full shadow-sm mb-2">
              <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></span>
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Future Ready Retail</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight font-heading leading-tight">
              A Better Way to Work
            </h2>
            <div className="w-16 h-2 bg-brand-blue mx-auto rounded-full"></div>
            <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-2xl mx-auto">
              Empower your staff and delight your customers with a modern, high-performance interface designed for the speed of today's business.
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="hidden lg:block absolute -left-12 top-20 z-20 animate-float">
               <div className="bg-white p-5 rounded-2xl shadow-xl border border-gray-50 flex items-center space-x-4 max-w-[220px]">
                  <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
                    <Rocket size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Speed</p>
                    <p className="text-xs font-extrabold text-gray-900">Instant Processing</p>
                  </div>
               </div>
            </div>

            <div className="hidden lg:block absolute -right-12 bottom-40 z-20 animate-float" style={{ animationDelay: '1s' }}>
               <div className="bg-white p-5 rounded-2xl shadow-xl border border-gray-50 flex items-center space-x-4 max-w-[220px]">
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                    <CloudUpload size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sync</p>
                    <p className="text-xs font-extrabold text-gray-900">Automated Backup</p>
                  </div>
               </div>
            </div>

            <div className="hidden lg:block absolute left-20 bottom-10 z-20 animate-float" style={{ animationDelay: '0.5s' }}>
               <div className="bg-white p-5 rounded-2xl shadow-xl border border-gray-50 flex items-center space-x-4 max-w-[220px]">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Efficiency</p>
                    <p className="text-xs font-extrabold text-gray-900">Reduced Queues</p>
                  </div>
               </div>
            </div>

            <div className="relative group perspective-1000">
              <div className="absolute inset-0 bg-brand-cyan/10 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <img
                src="https://i.postimg.cc/W4mtyTWb/cloudpos-device-view-website.webp"
                alt="CloudPOS Device Interface"
                className="w-full h-auto relative z-10 transition-transform duration-700 ease-out hover:scale-[1.03] drop-shadow-[0_35px_35px_rgba(0,0,0,0.1)]"
              />
            </div>
          </div>
          
          <div className="mt-16 flex justify-center gap-6">
             <div className="flex flex-col items-center space-y-2 opacity-50">
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Multi-Platform Optimized</p>
               <div className="flex space-x-8">
                 <Smartphone size={20} className="text-gray-400" />
                 <Monitor size={20} className="text-gray-400" />
                 <Activity size={20} className="text-gray-400" />
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 7. Testimonials */}
      <section className="bg-white py-32 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 skew-x-[-12deg] translate-x-32 pointer-events-none"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-brand-blue/5 rounded-full blur-2xl animate-float"></div>

        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center space-y-4 mb-20 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-brand-blue/5 rounded-full border border-brand-blue/10">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="text-[10px] font-black text-brand-blue uppercase tracking-widest">Global Trusted Partner</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight font-heading">
              What Our Clients Are Saying
            </h2>
            <p className="text-gray-500 font-medium text-base">Real stories from businesses that scaled with CloudPOS.</p>
          </div>

          <div 
            className="relative w-full max-w-5xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative z-10 bg-white rounded-[3rem] p-8 md:p-16 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col md:flex-row items-center gap-10 md:gap-16">
              
              <div className="flex flex-col items-center text-center space-y-4 md:w-1/3">
                <div className="relative">
                  <div className="absolute -inset-4 bg-brand-cyan/10 rounded-full blur-xl animate-pulse-soft"></div>
                  <div className={`w-48 h-32 md:w-56 md:h-36 rounded-3xl bg-white border border-gray-100 shadow-xl flex items-center justify-center p-8 transition-all duration-700 ${isAnimating ? 'scale-90 opacity-0 rotate-3' : 'scale-100 opacity-100 rotate-0'}`}>
                    <img 
                      src={testimonials[currentTestimonial].logo} 
                      alt={testimonials[currentTestimonial].author} 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-brand-dark rounded-2xl flex items-center justify-center text-white shadow-xl">
                    <Quote size={20} className="fill-brand-cyan text-brand-cyan" />
                  </div>
                </div>
                <div className={`space-y-1 transition-all duration-500 ${isAnimating ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}`}>
                  <h4 className="text-lg font-bold text-gray-900">{testimonials[currentTestimonial].author}</h4>
                  <p className="text-[10px] font-black text-brand-blue uppercase tracking-widest">{testimonials[currentTestimonial].status}</p>
                </div>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />)}
                </div>
              </div>

              <div className="md:w-2/3 space-y-8 text-center md:text-left">
                <div className="relative">
                   <Quote className="absolute -top-10 -left-6 md:-left-12 text-slate-100 w-24 h-24 -z-10" />
                   <div className={`transition-all duration-700 ease-out ${isAnimating ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'}`}>
                     <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 font-medium leading-[1.6] italic">
                       "{testimonials[currentTestimonial].text}"
                     </p>
                   </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-8 border-t border-gray-100">
                  <div className="flex items-center space-x-6">
                    <button 
                      onClick={handlePrev}
                      className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-gray-400 hover:bg-brand-blue hover:text-white transition-all shadow-sm hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button 
                      onClick={handleNext}
                      className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-gray-400 hover:bg-brand-blue hover:text-white transition-all shadow-sm hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          if (i === currentTestimonial) return;
                          setIsAnimating(true);
                          setTimeout(() => {
                            setCurrentTestimonial(i);
                            setIsAnimating(false);
                          }, 400);
                        }}
                        className={`group relative h-1.5 transition-all duration-500 ${i === currentTestimonial ? 'w-12 bg-brand-blue' : 'w-6 bg-gray-200 hover:bg-gray-300'} rounded-full overflow-hidden`}
                      >
                         {i === currentTestimonial && (
                           <div className={`absolute top-0 left-0 h-full bg-brand-cyan transition-all linear ${isHovered ? 'w-0' : 'w-full'}`} style={{ transitionDuration: '6000ms' }}></div>
                         )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 w-full h-full bg-brand-blue/5 rounded-[3.5rem] -z-10 -rotate-2"></div>
            <div className="absolute top-6 -left-6 w-full h-full bg-brand-cyan/5 rounded-[3.5rem] -z-10 rotate-2"></div>
          </div>
          
          <div className="mt-20 flex flex-wrap justify-center items-center gap-12 group hover:grayscale-0 transition-all duration-700">
             <div className="flex items-center space-x-2"><CheckCircle2 size={16} className="text-brand-blue" /> <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Certified Partner</span></div>
             <div className="flex items-center space-x-2"><CheckCircle2 size={16} className="text-brand-blue" /> <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Enterprise Ready</span></div>
             <div className="flex items-center space-x-2"><CheckCircle2 size={16} className="text-brand-blue" /> <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">24/7 Global Support</span></div>
          </div>
        </div>
      </section>

      {/* 8. Client Logo Slider - BIDIRECTIONAL MARQUEE */}
      <section className="py-24 px-4 bg-white overflow-hidden border-t border-gray-100">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-2 mb-12">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Our Prestigious Clients</p>
             <h3 className="text-xl font-black text-gray-900 font-heading">Empowering Leading Brands in Bangladesh</h3>
          </div>
          
          <div className="space-y-4">
            <div className="relative flex overflow-hidden faded-edge-mask py-2">
              <div className="flex whitespace-nowrap animate-marquee">
                {[...clientLogos, ...clientLogos].map((logo, idx) => (
                  <div key={idx} className="flex-shrink-0 w-[280px] h-[140px] px-8 transition-all duration-500 group">
                    <img src={logo} alt="Client Logo" className="w-full h-full object-contain scale-95 group-hover:scale-110 transition-transform" />
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex overflow-hidden faded-edge-mask py-2">
              <div className="flex whitespace-nowrap animate-marquee-reverse">
                {[...clientLogos, ...clientLogos].map((logo, idx) => (
                  <div key={idx} className="flex-shrink-0 w-[280px] h-[140px] px-8 transition-all duration-500 group">
                    <img src={logo} alt="Client Logo" className="w-full h-full object-contain scale-95 group-hover:scale-110 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    
    </div>
  );
};

export default Home;