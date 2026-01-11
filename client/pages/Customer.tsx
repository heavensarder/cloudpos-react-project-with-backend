
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Quote, Star, ChevronLeft, ChevronRight, CheckCircle2, Sparkles } from 'lucide-react';
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

const Customer: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [clientLogos, setClientLogos] = useState<string[]>(initialLogos);
  const [testimonials, setTestimonials] = useState(initialTestimonials);

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

  return (
    <div className="bg-white overflow-hidden font-sans">
      {/* 1. Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.postimg.cc/cCjw6VLh/cutomer.jpg" 
            alt="Customer Success Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-dark/60 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center space-y-8 animate-fade-in">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white font-heading leading-tight tracking-tight text-shadow-sm">
            Navigating Excellence in<br />Customer Satisfaction
          </h1>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link to="/contact" className="bg-brand-cyan hover:bg-white text-white hover:text-brand-dark px-10 py-4 rounded-lg font-black text-[11px] tracking-widest uppercase transition-all shadow-xl hover:scale-105 active:scale-95">
              CONTACT US
            </Link>
            <Link to="/plans" className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-10 py-4 rounded-lg font-black text-[11px] tracking-widest uppercase transition-all hover:scale-105 active:scale-95">
              SEE OUR PLAN
            </Link>
          </div>
        </div>

        {/* Wavy transition to next section */}
        <div className="absolute bottom-[-1px] left-0 w-full z-10">
          <svg className="w-full h-24 text-white fill-current" viewBox="0 0 1440 100" preserveAspectRatio="none">
             <path d="M0,100 L1440,100 L1440,0 C1080,80 360,80 0,0 L0,100 Z"></path>
          </svg>
        </div>
      </section>

      {/* 2. Redesigned Client Logo Showcase */}
      <section className="py-32 px-4 bg-[#fcfdfe] relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] pointer-events-none"></div>
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-cyan/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-6 mb-24">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-brand-cyan/5 rounded-full border border-brand-cyan/10">
              <Sparkles size={14} className="text-brand-cyan" />
              <span className="text-[10px] font-black text-brand-cyan uppercase tracking-[0.2em]">Our Prestigious Clients</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 font-heading tracking-tight">
              Leading Brands Trust Us
            </h2>
            <div className="w-20 h-1.5 bg-brand-cyan mx-auto rounded-full"></div>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto text-lg">
              We empower industry leaders across Bangladesh with robust retail technology that drives growth and operational efficiency.
            </p>
          </div>

          {/* Staggered Dynamic Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
            {clientLogos.map((logo, idx) => {
              // Create some visual variation in card styles
              const rotations = ['rotate-1', '-rotate-1', 'rotate-0', 'rotate-2', '-rotate-2'];
              const rotation = rotations[idx % rotations.length];
              const delays = ['0s', '0.1s', '0.2s', '0.3s', '0.4s'];
              const delay = delays[idx % delays.length];

              return (
                <div 
                  key={idx} 
                  style={{ animationDelay: delay }}
                  className={`group relative bg-white p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex items-center justify-center h-44 w-full transition-all duration-700 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-3 ${rotation} hover:rotate-0 animate-fade-in`}
                >
                  {/* Subtle hover glow */}
                  <div className="absolute inset-0 bg-brand-cyan/5 opacity-0 group-hover:opacity-100 rounded-[2.5rem] transition-opacity duration-500"></div>
                  
                  {/* Logo - Always Colorful */}
                  <img 
                    src={logo} 
                    alt="Client Partner" 
                    className="max-h-full max-w-full object-contain relative z-10 transition-all duration-500 group-hover:scale-110" 
                  />
                  
                  {/* Decorative dot */}
                  <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-brand-cyan opacity-0 group-hover:opacity-40 group-hover:animate-ping transition-opacity"></div>
                </div>
              );
            })}
          </div>

          <div className="mt-24 text-center">
            <div className="inline-flex items-center space-x-8 px-10 py-4 bg-white rounded-full shadow-lg border border-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400">
               <span className="flex items-center space-x-2"><div className="w-2 h-2 rounded-full bg-brand-cyan"></div> <span>Real-time Retail</span></span>
               <span className="flex items-center space-x-2"><div className="w-2 h-2 rounded-full bg-brand-blue"></div> <span>Enterprise Ready</span></span>
               <span className="flex items-center space-x-2"><div className="w-2 h-2 rounded-full bg-purple-400"></div> <span>250+ Deployments</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Testimonials (Imported Design from Home Page) */}
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
              Trusted By The Experts
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
    </div>
  );
};

export default Customer;
