
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, Store, Building2, UserCircle, Users, BarChart3, Package, 
  CreditCard, ClipboardList, Gift, Search, Smartphone, Headphones, 
  Database, ShieldCheck, Zap, Activity, LayoutGrid, CheckCircle2, ChevronRight,
  Sparkles, MousePointer2, PieChart, Layers, Settings2, Rocket, TrendingUp, Heart, ArrowRight,
  Globe, ZapOff, CloudUpload, Command, Boxes
} from 'lucide-react';

const serveItems = [
  { img: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=600", label: "SINGLE STORE", icon: Store },
  { img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=600", label: "MULTI STORE", icon: Building2 },
  { img: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&q=80&w=600", label: "RETAIL BUSINESS", icon: ShoppingBag },
  { img: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=600", label: "PRIVATE BUSINESS", icon: UserCircle },
  { img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600", label: "MEDIUM BUSINESS", icon: Users }
];

const featureDetails = [
  {
    title: "Robust POS Features",
    tagline: "SMART CHECKOUT",
    desc: "Empower your sales associates by giving them access to proper information on the POS interface. Also, provide them excellent tools which help to make their customer satisfy easily.",
    img: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=800",
    icon: LayoutGrid,
    align: "left",
    bullets: ["Guided Scripting", "Real-time Pricing", "Inventory Integration"]
  },
  {
    title: "Better Inventory Management",
    tagline: "WASTE REDUCTION",
    desc: "Spend very little time on managing warehouse processes, get total control of your inventory and reduce losses due to waste. Our CloudPOS software integrated your inventory precisely that keeps track of all of your inventory.",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
    icon: Package,
    align: "right",
    bullets: ["Batch Tracking", "Auto Re-ordering", "Warehouse Sync"]
  },
  {
    title: "Multiple Payment Mode",
    tagline: "FRICTIONLESS PAY",
    desc: "Billing & real-time payment statuses are tracked & recorded from a single dashboard & have access to multiple payment modes including cards, wallets and cash.",
    img: "https://images.unsplash.com/photo-1556742111-a301076d9d18?auto=format&fit=crop&q=80&w=800",
    icon: CreditCard,
    align: "left",
    bullets: ["EMV Support", "Digital Wallets", "Installment Plans"]
  },
  {
    title: "Requisition for Supplier",
    tagline: "SUPPLY CHAIN",
    desc: "Spend very little time on managing warehouse processes, get total control of your inventory and reduce losses due to waste. Our CloudPOS software integrated your inventory precisely that keeps track of all of your inventory.",
    img: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=800",
    icon: ClipboardList,
    align: "right",
    bullets: ["Purchase Orders", "Supplier Sync", "Stock Requisition"]
  },
  {
    title: "Customer Loyalty & Promotions",
    tagline: "RETENTION",
    desc: "Prepare & arrange loyalty points and discounts, gift coupons depends on purchase, made advance prices and offers and take control over them very easily.",
    img: "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=800",
    icon: Gift,
    align: "left",
    bullets: ["Loyalty Points", "Gift Coupons", "Advance Offers"]
  },
  {
    title: "Cloud Reports",
    tagline: "GLOBAL INSIGHTS",
    desc: "Wanted to keep track of your store's sales when you are out of town? You can easily do that with our 'CloudPOS' system. You will be able to see detailed reports from anywhere, anytime you want.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    icon: BarChart3,
    align: "right",
    bullets: ["Heat Maps", "Peak Hour Analysis", "Revenue Forecasting"]
  }
];

const complexPoints = [
  { title: "INCREASE EFFICIENCY", icon: TrendingUp, detail: "Streamline workflows and reduce manual tasks to maximize operational output." },
  { title: "IMPROVE CUSTOMER EXPERIENCE", icon: Heart, detail: "Fast checkouts and personalized loyalty programs that keep customers coming back." },
  { title: "INNOVATION", icon: Zap, detail: "Stay ahead with cutting-edge cloud technology updated automatically for your success." },
  { title: "CUSTOMIZABLE", icon: Settings2, detail: "Tailor the system to your specific industry needs with modular and flexible settings." }
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

const Features: React.FC = () => {
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="bg-white overflow-hidden">
      {/* 1. Enhanced Hero Section */}
      <section className="relative hero-bg pt-32 pb-24 md:pt-48 md:pb-40 px-4 text-center text-white overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-brand-cyan/20 rounded-full blur-[120px] animate-pulse-soft pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-brand-blue/30 rounded-full blur-[150px] animate-float pointer-events-none"></div>
        
        {/* Wavy Bottom Overlay */}
        <div className="absolute bottom-0 left-0 w-full z-0 pointer-events-none">
           <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-[120px] md:h-[180px]">
              <path fill="#ffffff" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
           </svg>
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10 space-y-6 md:space-y-8 animate-fade-in">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg">
             <Sparkles size={16} className="text-brand-cyan animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em]">Enterprise Capabilities</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.2] md:leading-[1.1] font-heading tracking-tighter text-shadow-sm px-2">
            Future-Proof Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-cyan to-white">Retail Ecosystem</span>
          </h1>
          <p className="max-w-2xl mx-auto text-white/80 text-base md:text-lg font-medium leading-relaxed px-4">
            From seamless checkouts to deep inventory intelligence – we deliver the ultimate POS technology for your sustainable growth.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 pt-4 px-4">
            <Link to="/contact" className="bg-brand-cyan text-brand-dark hover:bg-white px-8 md:px-10 py-4 rounded-2xl font-black text-xs tracking-[0.2em] uppercase transition-all shadow-xl hover:scale-105 active:scale-95 text-center flex items-center justify-center space-x-3 group">
              <span>Contact Us</span>
              <ArrowRight size={16} className="text-brand-dark group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/plans" className="bg-white/10 backdrop-blur-xl border-2 border-white/20 hover:bg-white hover:text-brand-dark text-white px-8 md:px-10 py-4 rounded-2xl font-black text-xs tracking-[0.2em] uppercase transition-all text-center flex items-center justify-center">
              Price Plan
            </Link>
          </div>
        </div>
      </section>

      {/* 2. "We Serve For" Section */}
      <section className="py-20 md:py-32 px-4 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center mb-16 md:mb-24 space-y-4 md:space-y-6">
          <h2 className="text-2xl md:text-4xl font-black text-gray-900 font-heading tracking-tight uppercase px-4">We Serve For</h2>
          <div className="w-16 md:w-20 h-2 bg-brand-blue mx-auto rounded-full"></div>
          <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px] px-4">Versatile solutions for diverse retail segments</p>
        </div>

        <div className="max-w-7xl mx-auto relative px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10">
            {serveItems.map((item, idx) => (
              <div key={idx} className="group relative flex flex-col items-center">
                <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-2xl border-4 md:border-8 border-slate-50 transition-all duration-700 group-hover:scale-110 group-hover:rotate-6">
                  <img 
                    src={item.img} 
                    alt={item.label} 
                    className="w-full h-full object-cover transition-all duration-1000" 
                  />
                  <div className="absolute inset-0 bg-brand-blue/5 group-hover:bg-transparent transition-colors"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <item.icon size={48} className="text-white drop-shadow-lg" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="mt-6 md:mt-8 text-center space-y-2">
                  <h4 className="text-[10px] md:text-[11px] font-black text-gray-900 uppercase tracking-[0.3em] group-hover:text-brand-blue transition-colors">{item.label}</h4>
                  <div className="w-8 h-1 bg-brand-cyan/20 mx-auto rounded-full group-hover:w-16 group-hover:bg-brand-cyan transition-all duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Feature Showcase Section */}
      <section className="py-20 md:py-40 px-4 bg-slate-50/50 overflow-hidden border-y border-slate-100 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-slate-100 hidden lg:block"></div>
        
        <div className="max-w-7xl mx-auto text-center mb-24 md:mb-40 space-y-6 md:space-y-8 relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter leading-tight font-heading max-w-3xl mx-auto px-2">
            Engineered for <br /><span className="text-brand-blue">Operational Excellence</span>
          </h2>
          <div className="w-24 md:w-32 h-2.5 bg-brand-cyan mx-auto rounded-full shadow-lg shadow-brand-cyan/20"></div>
        </div>

        <div className="max-w-7xl mx-auto space-y-32 md:space-y-64 relative z-10">
          {featureDetails.map((feat, idx) => (
            <div key={idx} className={`flex flex-col ${feat.align === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 md:gap-24 lg:gap-32`}>
              {/* Image Side */}
              <div className="w-full lg:w-1/2 relative group px-2 md:px-0">
                <div className="absolute -inset-4 md:-inset-10 bg-brand-cyan/10 rounded-full blur-[80px] md:blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                <div className="relative">
                  <div className="relative aspect-[16/10] rounded-3xl md:rounded-[3rem] overflow-hidden shadow-2xl border-2 md:border-4 border-white transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                    <img 
                      src={feat.img} 
                      alt={feat.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/20 to-transparent"></div>
                  </div>
                  {/* Floating Stat Badge - Made responsive to avoid horizontal overflow */}
                  <div className={`absolute -bottom-6 md:-bottom-10 ${feat.align === 'left' ? 'right-4 lg:-right-10' : 'left-4 lg:-left-10'} p-4 md:p-8 bg-white/90 backdrop-blur-2xl rounded-2xl md:rounded-[2.5rem] shadow-2xl border border-white/50 z-20 transition-transform duration-500`}>
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <div className="w-10 h-10 md:w-14 md:h-14 bg-brand-dark rounded-xl md:rounded-2xl flex items-center justify-center text-brand-cyan">
                        <feat.icon size={20} className="md:w-7 md:h-7" />
                      </div>
                      <div>
                        <p className="text-[8px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Core Feature</p>
                        <p className="text-xs md:text-sm font-bold text-gray-900 leading-none">{feat.tagline}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Side */}
              <div className="w-full lg:w-1/2 space-y-6 md:space-y-10 px-2 md:px-0 text-center lg:text-left">
                <div className="space-y-4 md:space-y-6">
                  <div className="inline-block px-4 py-1.5 bg-brand-blue/5 rounded-full border border-brand-blue/10">
                     <span className="text-[9px] md:text-[10px] font-black text-brand-blue uppercase tracking-[0.2em]">{feat.tagline}</span>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight font-heading leading-tight">{feat.title}</h3>
                  <p className="text-gray-500 text-base md:text-lg leading-relaxed font-medium">
                    {feat.desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-left">
                  {feat.bullets.map((bullet, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan flex-shrink-0">
                        <CheckCircle2 size={12} className="md:w-3.5 md:h-3.5" />
                      </div>
                      <span className="text-[11px] md:text-xs font-bold text-gray-700 uppercase tracking-widest">{bullet}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 md:pt-6">
                  <Link to="/contact" className="group inline-flex items-center space-x-4 px-8 md:px-10 py-4 md:py-5 bg-white border border-slate-200 rounded-full md:rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] hover:bg-brand-dark hover:text-white hover:border-brand-dark transition-all duration-500">
                    <span>Learn More</span>
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Simplifying the Complex Section */}
      <section className="py-24 md:py-40 px-4 bg-[#0a0f1a] relative overflow-hidden">
        {/* Superior Background Design */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(0,185,242,0.08),transparent_50%)]"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(0,80,129,0.1),transparent_50%)]"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-stretch gap-16 md:gap-20 lg:gap-32">
            
            {/* Left Content Side */}
            <div className="lg:w-1/2 flex flex-col justify-center space-y-10 md:space-y-16">
               <div className="space-y-6 md:space-y-8 text-center lg:text-left">
                 <div className="inline-flex items-center space-x-3 px-4 py-2 bg-brand-cyan/10 rounded-full border border-brand-cyan/20">
                    <Boxes size={18} className="text-brand-cyan animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-cyan">Modular Framework</span>
                 </div>
                 <h2 className="text-3xl md:text-5xl font-[900] text-white tracking-tighter leading-[1.1] md:leading-[0.9] font-heading">
                   Simplifying<br />
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-white">the Complex</span>
                 </h2>
                 <p className="text-white/50 text-base md:text-xl leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
                   Retail operations involve thousands of moving parts. We’ve architected a system that handles the heavy lifting, giving you a clean, unified view of your entire business empire.
                 </p>
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                 {complexPoints.map((point, i) => (
                   <div key={i} className="group relative">
                     <div className="relative h-full flex flex-col items-start space-y-4 md:space-y-6 p-6 md:p-8 bg-white/[0.02] border border-white/5 rounded-3xl md:rounded-[2.5rem] backdrop-blur-3xl transition-all duration-500 hover:bg-white/[0.05] hover:border-brand-cyan/30 hover:-translate-y-2 overflow-hidden">
                        {/* Background Number */}
                        <span className="absolute -right-4 -bottom-6 text-5xl md:text-7xl font-black text-white/[0.02] group-hover:text-white/[0.05] transition-colors">0{i+1}</span>
                        
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan transition-all duration-500 group-hover:bg-brand-cyan group-hover:text-brand-dark group-hover:scale-110">
                          <point.icon size={24} className="md:w-7 md:h-7" strokeWidth={1.5} />
                        </div>
                        <div className="space-y-2 relative z-10">
                          <h4 className="text-[9px] md:text-[10px] font-black text-white uppercase tracking-[0.3em] font-heading">{point.title}</h4>
                          <p className="text-[11px] md:text-xs text-white/30 leading-relaxed font-medium line-clamp-2 group-hover:text-white/60 transition-colors">{point.detail}</p>
                        </div>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
            
            {/* Right Visual Side */}
            <div className="lg:w-1/2 relative flex items-center justify-center px-4 md:px-0">
               {/* Decorative Circles */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] md:w-[120%] h-[110%] md:h-[120%] border border-white/5 rounded-full pointer-events-none"></div>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[100%] h-[90%] md:h-[100%] border border-white/10 rounded-full pointer-events-none"></div>
               
               <div className="relative z-10 w-full group">
                 {/* Floating UI Elements - Repositioned for mobile */}
                 <div className="absolute -top-6 -right-2 md:-top-12 md:-right-12 p-4 md:p-6 bg-brand-dark/80 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl shadow-2xl z-30 animate-float">
                    <div className="flex items-center space-x-3">
                       <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-brand-cyan/20 flex items-center justify-center text-brand-cyan">
                          <Zap size={16} className="md:w-5 md:h-5" />
                       </div>
                       <div>
                          <p className="text-[7px] md:text-[8px] font-black text-white/40 uppercase tracking-widest leading-none mb-1">Performance</p>
                          <p className="text-[10px] md:text-xs font-bold text-white leading-none">40% Faster Sync</p>
                       </div>
                    </div>
                 </div>

                 <div className="absolute -bottom-6 -left-2 md:-bottom-12 md:-left-12 p-4 md:p-6 bg-brand-dark/80 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl shadow-2xl z-30 animate-float" style={{ animationDelay: '1s' }}>
                    <div className="flex items-center space-x-3">
                       <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-green-500/20 flex items-center justify-center text-green-400">
                          <ShieldCheck size={16} className="md:w-5 md:h-5" />
                       </div>
                       <div>
                          <p className="text-[7px] md:text-[8px] font-black text-white/40 uppercase tracking-widest leading-none mb-1">Security</p>
                          <p className="text-[10px] md:text-xs font-bold text-white leading-none">SSL Encrypted</p>
                       </div>
                    </div>
                 </div>

                 <div className="relative rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] bg-slate-900 border border-white/10 p-3 lg:p-8">
                    <div className="absolute inset-0 bg-brand-cyan/5 group-hover:bg-brand-cyan/10 transition-colors"></div>
                    <img 
                      src="https://i.postimg.cc/1zxBvNPL/simplify.jpg" 
                      alt="Interface Visualization" 
                      className="w-full h-auto rounded-[2rem] md:rounded-[3.5rem] transition-all duration-1000 scale-100 group-hover:scale-[1.03]"
                    />
                    {/* Glass Overlay with Icon */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                       <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-700">
                          <Command size={32} className="md:w-10 md:h-10 animate-spin-slow" />
                       </div>
                    </div>
                 </div>
               </div>
            </div>
          </div>

          {/* Integrated Horizontal Stats Bar */}
          <div ref={statsRef} className="mt-24 md:mt-40 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 relative z-10 border-t border-white/5 pt-16 md:pt-24">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center space-y-4 md:space-y-6">
                <h3 className="text-4xl md:text-7xl lg:text-8xl font-[900] text-brand-cyan font-heading tracking-tighter drop-shadow-2xl">
                  <Counter value={stat.value} suffix={stat.suffix} isVisible={isStatsVisible} />
                </h3>
                <div className="w-12 md:w-16 h-1 bg-white/10 mx-auto rounded-full group-hover:w-24 group-hover:bg-brand-cyan transition-all duration-500"></div>
                <p className="text-white/40 text-[8px] md:text-[10px] font-black tracking-[0.4em] md:tracking-[0.5em] uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Ultimate CTA */}
      <section className="py-24 md:py-40 px-4 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto text-center space-y-12 md:space-y-16">
           <div className="inline-block px-6 py-2 bg-brand-blue/5 border border-brand-blue/10 rounded-full">
              <span className="text-[9px] md:text-[10px] font-black text-brand-blue uppercase tracking-[0.4em]">Start Your Transformation</span>
           </div>
           <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 font-heading tracking-tighter leading-[1.1] md:leading-[0.9] px-2">
             Empower Your Staff, <br className="hidden sm:block" />Delight Your Customers
           </h2>
           <p className="text-gray-500 text-lg md:text-xl md:text-2xl font-medium max-w-3xl mx-auto px-4 leading-relaxed">
             Join 250+ retail leaders who trust CloudPOS to drive their daily operations and long-term success.
           </p>
           <div className="pt-4 md:pt-8 flex flex-col sm:flex-row justify-center gap-4 md:gap-6 px-4">
             <Link to="/contact" className="bg-brand-dark text-white px-10 md:px-20 py-5 md:py-8 rounded-full md:rounded-[2.5rem] font-black text-[10px] md:text-[11px] tracking-[0.4em] md:tracking-[0.5em] uppercase transition-all shadow-2xl hover:bg-black hover:scale-105 active:scale-95 text-center">
               Get Started Now
             </Link>
             <Link to="/contact" className="bg-white border-2 border-slate-100 text-brand-dark px-10 md:px-20 py-5 md:py-8 rounded-full md:rounded-[2.5rem] font-black text-[10px] md:text-[11px] tracking-[0.4em] md:tracking-[0.5em] uppercase transition-all hover:bg-slate-50 text-center">
               Watch Demo
             </Link>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
