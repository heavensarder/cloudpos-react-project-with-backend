
import React from 'react';
import { Link } from 'react-router-dom';
/* Added Users to the lucide-react imports to resolve "Cannot find name 'Users'" error on line 96 */
import { Target, Eye, ShieldCheck, Award, Rocket, Globe, Sparkles, CheckCircle2, ChevronRight, Quote, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-white overflow-hidden">
      {/* 1. Hero Section - Dynamic & Impactful */}
      <section className="relative min-h-[65vh] flex items-center justify-center pt-32 pb-48 px-4 hero-bg overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-cyan/20 rounded-full blur-[120px] animate-pulse-soft"></div>
        <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-brand-blue/30 rounded-full blur-[150px] animate-float"></div>
        
        {/* Curvy Bottom Design */}
        <div className="absolute bottom-0 left-0 w-full z-0 pointer-events-none">
           <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-[180px]">
              <path fill="#ffffff" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
           </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-8">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-white/10 border border-white/20 backdrop-blur-md rounded-full animate-fade-in">
            <Sparkles size={14} className="text-brand-cyan" />
            <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Established 1998</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] font-heading tracking-tighter text-shadow-sm animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Unveiling Our Story:<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-cyan to-white">Innovation & Dedication</span>
          </h1>
          <p className="max-w-2xl mx-auto text-white/80 text-lg font-medium leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Empowering global commerce through cutting-edge technology and a relentless pursuit of excellence for over two decades.
          </p>
          <div className="flex flex-wrap justify-center gap-5 pt-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link to="/contact" className="bg-brand-dark hover:bg-black text-white px-10 py-4 rounded-2xl font-black text-xs tracking-[0.2em] uppercase transition-all shadow-2xl hover:scale-105 active:scale-95 text-center flex items-center justify-center">
              Contact Our Experts
            </Link>
            <Link to="/plans" className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white hover:text-brand-blue text-white px-10 py-4 rounded-2xl font-black text-xs tracking-[0.2em] uppercase transition-all text-center flex items-center justify-center">
              Pricing Plan
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Legacy Section - Layered & Modern */}
      <section className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-brand-cyan/5 rounded-[3rem] blur-2xl group-hover:bg-brand-cyan/10 transition-colors"></div>
              <div className="relative bg-white p-10 md:p-16 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] rounded-[3rem] border border-gray-100 z-10">
                <div className="inline-block px-3 py-1 bg-brand-blue/5 rounded-lg mb-6">
                   <span className="text-[10px] font-black text-brand-blue uppercase tracking-widest">About Mediasoft</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8 font-heading leading-tight tracking-tight">
                  Who We Are?
                </h2>
                <div className="space-y-6 text-gray-500 text-lg leading-relaxed font-medium">
                  <p>
                    Incepted in 1998, Mediasoft Data Systems Limited emerged with a singular vision: to revolutionize the retail landscape through robust, scalable, and intuitive software solutions.
                  </p>
                  <p>
                    Today, we stand as a leader in cloud-based (POS) technology, serving businesses of all sizes with a suite of features that transform transactions into meaningful business insights.
                  </p>
                </div>
                <div className="pt-10 flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
                    <Award size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-900 uppercase tracking-widest">Certified Excellence</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Quality Guaranteed</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Stat Card */}
              <div className="absolute -bottom-10 -right-6 md:right-10 bg-brand-dark p-8 rounded-[2rem] shadow-2xl z-20 animate-float hidden md:block">
                 <div className="text-center space-y-1">
                   <p className="text-3xl font-black text-brand-cyan font-heading tracking-tighter">25+</p>
                   <p className="text-[9px] font-black text-white/60 uppercase tracking-[0.2em] whitespace-nowrap">Years of Experience</p>
                 </div>
              </div>
            </div>

            <div className="space-y-10 lg:pl-10">
              <div className="relative overflow-hidden rounded-[3rem] shadow-2xl aspect-[4/3] group">
                <img 
                  src="https://i.postimg.cc/Bbd4jg9K/ourteam.jpg" 
                  alt="Our Team" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/80 to-transparent opacity-60"></div>
                <div className="absolute bottom-10 left-10 right-10">
                   <Quote className="text-brand-cyan/40 w-12 h-12 mb-4" />
                   <p className="text-white text-xl font-medium italic leading-relaxed">
                     "Our commitment is to empower every retailer with the tools of tomorrow, today."
                   </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: "Total Clients", val: "250+", icon: Users },
                  { label: "Success Rate", val: "99%", icon: CheckCircle2 }
                ].map((stat, i) => (
                  <div key={i} className="bg-slate-50 p-6 rounded-3xl border border-gray-100 flex items-center space-x-4 hover:bg-white hover:shadow-xl transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-brand-blue shadow-sm group-hover:bg-brand-blue group-hover:text-white transition-all">
                      <stat.icon size={20} />
                    </div>
                    <div>
                      <p className="text-lg font-black text-gray-900 font-heading">{stat.val}</p>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Pillars - Modern Cards */}
      <section className="py-32 px-4 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-cyan/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading tracking-tight">Our Core Pillars</h2>
            <div className="w-20 h-1.5 bg-brand-cyan mx-auto rounded-full"></div>
            <p className="text-white/60 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
              We operate on a foundation of trust, excellence, and agility, ensuring our clients always stay ahead in the global marketplace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Our Mission", 
                icon: Rocket, 
                text: "To provide growing retail businesses superior performance and development through affordable and practical technology solutions.",
                color: "from-brand-cyan/20 to-transparent"
              },
              { 
                title: "Our Vision", 
                icon: Eye, 
                text: "Innovation and distinction in executing end-to-end technology solutions for a global marketplace without compromising quality.",
                color: "from-brand-blue/40 to-transparent"
              },
              { 
                title: "Our Strength", 
                icon: ShieldCheck, 
                text: "We are highly sensitive to client-specific requirements and react quickly to adjust to any changes or additions.",
                color: "from-brand-purple/20 to-transparent"
              }
            ].map((pillar, idx) => (
              <div key={idx} className="group relative">
                <div className={`absolute -inset-0.5 bg-gradient-to-br ${pillar.color} rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`}></div>
                <div className="relative h-full bg-white/[0.03] backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/[0.07] transition-all duration-500 flex flex-col items-center text-center space-y-8">
                  <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center text-brand-cyan group-hover:bg-white group-hover:text-brand-dark group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-2xl">
                    <pillar.icon size={40} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-black font-heading tracking-widest uppercase">{pillar.title}</h3>
                    <p className="text-white/60 text-base leading-relaxed group-hover:text-white transition-colors">
                      {pillar.text}
                    </p>
                  </div>
                  <div className="pt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                     <span className="text-[10px] font-black tracking-[0.3em] text-brand-cyan uppercase">Excellence Driven</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Global Footprint - Minimalist & Sleek */}
      <section className="py-32 px-4 bg-white relative">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2 space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-brand-blue/5 rounded-full border border-brand-blue/10">
                <Globe size={14} className="text-brand-blue animate-spin-slow" />
                <span className="text-[10px] font-black text-brand-blue uppercase tracking-widest">Global Marketplace</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight font-heading tracking-tight">
                Empowering Success<br />
                <span className="text-brand-cyan">Worldwide</span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed font-medium">
                Our solutions are designed to transcend borders, providing retailers everywhere with the competitive edge they need in an increasingly connected world.
              </p>
            </div>
            
            <div className="space-y-6">
              {[
                "Highly sensitive to client requirements",
                "React quickly to market changes",
                "End-to-end technology implementation",
                "Uncompromising focus on quality"
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="w-6 h-6 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
                    <CheckCircle2 size={14} />
                  </div>
                  <span className="text-sm font-bold text-gray-700 uppercase tracking-widest">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 relative flex items-center justify-center">
             <div className="absolute inset-0 bg-brand-cyan/5 blur-[100px] rounded-full"></div>
             <img 
               src="https://i.postimg.cc/4xXNVWHW/ourteam2.jpg" 
               alt="Digital Network" 
               className="relative z-10 w-full h-auto rounded-[3rem] shadow-2xl drop-shadow-2xl transition-all duration-1000"
             />
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="pb-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden bg-brand-dark rounded-[4rem] p-12 md:p-24 text-center space-y-10 group">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-cyan/5 -skew-x-12 translate-x-32"></div>
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
               <h2 className="text-3xl md:text-5xl font-black text-white font-heading tracking-tight">Ready to transform your business?</h2>
               <p className="text-white/60 text-lg md:text-xl font-medium">Join 250+ businesses that trust CloudPOS for their daily operations.</p>
               <div className="pt-6">
                 <Link to="/contact" className="inline-block bg-brand-cyan hover:bg-white text-brand-dark px-14 py-6 rounded-3xl font-black text-xs tracking-[0.3em] uppercase transition-all duration-500 shadow-[0_20px_40px_-10px_rgba(0,185,242,0.4)] hover:scale-105 active:scale-95">
                   Get Started Now
                 </Link>
               </div>
            </div>
            
            <div className="absolute -bottom-10 left-10 opacity-10 group-hover:opacity-20 transition-opacity">
               <Rocket size={200} className="rotate-12" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
