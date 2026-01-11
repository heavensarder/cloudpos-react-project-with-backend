import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { 
  Phone, Mail, MapPin, Send, MessageSquare, CheckCircle2, Building2, User, PhoneCall, 
  ChevronRight, Sparkles, Zap, Star, Activity, Headphones, 
  Smartphone, ShieldCheck, Clock, ArrowRight, Lock, Loader2, AlertCircle
} from 'lucide-react';

const Contact: React.FC = () => {
  const location = useLocation();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
  
  const [formData, setFormData] = useState({
    user_name: '',
    business_name: '',
    user_email: '',
    mobile_number: '',
    message: ''
  });

  // Check for incoming plan from router state
  useEffect(() => {
    if (location.state && location.state.plan) {
      setSelectedPlan(location.state.plan);
    }
  }, [location.state]);

  // Initialize EmailJS with the Public Key provided
  useEffect(() => {
    emailjs.init('U12v6CbeRGGTc2Ew-');
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const plans = [
    { id: 'Basic', label: 'BASIC', icon: Zap },
    { id: 'Standard', label: 'STANDARD', icon: Star },
    { id: 'Enterprise', label: 'ENTERPRISE', icon: Building2 },
    { id: 'CloudPharma', label: 'CLOUDPHARMA', icon: Activity }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation check for required fields
    if (!formData.user_name || !formData.user_email || !formData.mobile_number) {
      setStatus({ type: 'error', message: 'Please complete all required fields (*).' });
      return;
    }

    setIsSending(true);
    setStatus({ type: null, message: '' });

    // Prepare template parameters
    const templateParams = {
      user_name: formData.user_name,
      business_name: formData.business_name || 'N/A',
      user_email: formData.user_email,
      mobile_number: formData.mobile_number,
      message: formData.message || 'No message provided.',
      selected_plan: selectedPlan || 'None Selected',
      submission_date: new Date().toLocaleString()
    };

    try {
      const response = await emailjs.send(
        'service_mediasoft', 
        'template_7v9x9jl', 
        templateParams
      );

      console.log('EmailJS Success:', response.status, response.text);
      setStatus({ type: 'success', message: 'Thank you! Your inquiry has been sent successfully.' });
      
      // Clear form on success
      setFormData({ user_name: '', business_name: '', user_email: '', mobile_number: '', message: '' });
      setSelectedPlan(null);
    } catch (error: any) {
      const errorMsg = error?.text || error?.message || JSON.stringify(error);
      console.error('EmailJS Error Detail:', errorMsg);
      setStatus({ type: 'error', message: `Delivery failed: ${errorMsg}` });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-[#fcfdfe] min-h-screen font-sans">
      {/* 1. Header Map Section */}
      <section className="relative w-full h-[450px] lg:h-[550px] overflow-hidden group">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4560.120292438401!2d90.39066147607211!3d23.750934588754365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8bd534c2fdf%3A0x569f318349b6fb22!2sMediasoft%20Data%20Systems%20Limited!5e1!3m2!1sen!2sbd!4v1767867294624!5m2!1sen!2sbd" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale contrast-[1.1] transition-all duration-1000 group-hover:grayscale-0"
        ></iframe>
        <div className="absolute inset-0 bg-gradient-to-t from-[#fcfdfe] via-transparent to-transparent pointer-events-none"></div>
      </section>

      {/* 2. Overlapping Modern Contact Card */}
      <section className="relative z-20 -mt-32 pb-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-stretch bg-white rounded-[3.5rem] shadow-[0_60px_120px_-20px_rgba(0,0,0,0.12)] overflow-hidden border border-gray-100">
            
            {/* Left: Contact Form */}
            <div className="lg:w-3/5 p-8 md:p-16 lg:p-20 space-y-12">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-brand-cyan/10 rounded-full border border-brand-cyan/20">
                   <Sparkles size={14} className="text-brand-cyan animate-pulse" />
                   <span className="text-[10px] font-black text-brand-cyan uppercase tracking-[0.25em]">Connect with Experts</span>
                </div>
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-gray-900 font-heading tracking-tight leading-none">
                  Let’s Start a <br /><span className="text-brand-cyan">Conversation</span>
                </h2>
                <p className="text-gray-500 font-medium text-lg lg:text-xl">Drop us a line and we'll reach out to your business within 24 hours.</p>
              </div>

              <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10" onSubmit={handleSubmit}>
                {/* Status Alert Notification */}
                {status.type && (
                  <div className={`md:col-span-2 p-6 rounded-[2rem] flex items-center space-x-4 border ${status.type === 'success' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'}`}>
                    {status.type === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                    <span className="text-sm font-bold uppercase tracking-wider">{status.message}</span>
                  </div>
                )}

                {/* Name */}
                <div className="relative group">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4 block group-focus-within:text-brand-cyan transition-colors">Contact Person *</label>
                  <div className="flex items-center space-x-4 bg-slate-50 border-2 border-slate-100 rounded-[2rem] px-8 py-6 transition-all focus-within:bg-white focus-within:ring-8 focus-within:ring-brand-cyan/5 focus-within:border-brand-cyan">
                    <User size={20} className="text-slate-300 group-focus-within:text-brand-cyan transition-colors" />
                    <input 
                      type="text" 
                      name="user_name"
                      value={formData.user_name}
                      onChange={handleInputChange}
                      placeholder="Full Name" 
                      required
                      className="w-full bg-transparent outline-none text-base font-bold text-gray-800 placeholder:text-slate-300" 
                    />
                  </div>
                </div>

                {/* Business Name */}
                <div className="relative group">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4 block group-focus-within:text-brand-cyan transition-colors">Business Name</label>
                  <div className="flex items-center space-x-4 bg-slate-50 border-2 border-slate-100 rounded-[2rem] px-8 py-6 transition-all focus-within:bg-white focus-within:ring-8 focus-within:ring-brand-cyan/5 focus-within:border-brand-cyan">
                    <Building2 size={20} className="text-slate-300 group-focus-within:text-brand-cyan transition-colors" />
                    <input 
                      type="text" 
                      name="business_name"
                      value={formData.business_name}
                      onChange={handleInputChange}
                      placeholder="Company Ltd" 
                      className="w-full bg-transparent outline-none text-base font-bold text-gray-800 placeholder:text-slate-300" 
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="relative group md:col-span-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4 block group-focus-within:text-brand-cyan transition-colors">Work Email Address *</label>
                  <div className="flex items-center space-x-4 bg-slate-50 border-2 border-slate-100 rounded-[2rem] px-8 py-6 transition-all focus-within:bg-white focus-within:ring-8 focus-within:ring-brand-cyan/5 focus-within:border-brand-cyan">
                    <Mail size={20} className="text-slate-300 group-focus-within:text-brand-cyan transition-colors" />
                    <input 
                      type="email" 
                      name="user_email"
                      value={formData.user_email}
                      onChange={handleInputChange}
                      placeholder="example@mediasoftbd.com" 
                      required
                      className="w-full bg-transparent outline-none text-base font-bold text-gray-800 placeholder:text-slate-300" 
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="relative group md:col-span-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4 block group-focus-within:text-brand-cyan transition-colors">Mobile Number *</label>
                  <div className="flex items-center space-x-5 bg-slate-50 border-2 border-slate-100 rounded-[2rem] px-8 py-6 transition-all focus-within:bg-white focus-within:ring-8 focus-within:ring-brand-cyan/5 focus-within:border-brand-cyan">
                    <div className="flex items-center space-x-2 border-r-2 border-slate-200 pr-5">
                       <img src="https://flagcdn.com/w20/bd.png" alt="BD" className="w-6 h-auto rounded-sm" />
                       <span className="text-sm font-black text-slate-500">+88</span>
                    </div>
                    <input 
                      type="tel" 
                      name="mobile_number"
                      value={formData.mobile_number}
                      onChange={handleInputChange}
                      placeholder="017XX-XXXXXX" 
                      required
                      className="w-full bg-transparent outline-none text-base font-bold text-gray-800 placeholder:text-slate-300" 
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="relative group md:col-span-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4 block group-focus-within:text-brand-cyan transition-colors">Your Message</label>
                  <div className="bg-slate-50 border-2 border-slate-100 rounded-[2rem] px-8 py-7 transition-all focus-within:bg-white focus-within:ring-8 focus-within:ring-brand-cyan/5 focus-within:border-brand-cyan">
                    <textarea 
                      rows={5} 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us more about your business needs..." 
                      className="w-full bg-transparent outline-none text-base font-bold text-gray-800 resize-none placeholder:text-slate-300"
                    ></textarea>
                  </div>
                </div>

                {/* Plan Selection - Ultra Compact & Side-by-Side Design */}
                <div className="md:col-span-2 space-y-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Choose an Interest (Optional)</label>
                  <div className="flex flex-wrap items-center gap-2">
                    {plans.map((plan) => (
                      <button 
                        key={plan.id}
                        type="button"
                        onClick={() => setSelectedPlan(plan.id === selectedPlan ? null : plan.id)}
                        className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-full border transition-all duration-300 shadow-sm ${
                          selectedPlan === plan.id 
                            ? 'bg-brand-cyan border-brand-cyan text-white shadow-md' 
                            : 'bg-white border-slate-100 text-slate-500 hover:border-brand-cyan/30 hover:text-brand-cyan'
                        }`}
                      >
                         <plan.icon size={14} strokeWidth={2} />
                         <span className="text-[9px] font-black uppercase tracking-[0.1em] whitespace-nowrap">{plan.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Row */}
                <div className="md:col-span-2 pt-10 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-slate-100">
                  <button 
                    type="submit"
                    disabled={isSending}
                    className={`group relative w-full md:w-auto overflow-hidden bg-brand-dark text-white px-20 py-7 rounded-full font-black text-[11px] tracking-[0.5em] uppercase transition-all duration-500 ease-out shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_rgba(0,185,242,0.5)] hover:-translate-y-2 active:scale-95 flex items-center justify-center space-x-6 border border-white/5 hover:border-brand-cyan/50 ${isSending ? 'opacity-80' : ''}`}
                  >
                    <span className="relative z-10 group-hover:tracking-[0.6em] transition-all duration-500">{isSending ? 'Sending...' : 'Send Message'}</span>
                    <div className="relative z-10 p-2 bg-brand-cyan rounded-full transition-all duration-500 group-hover:bg-white group-hover:text-brand-dark group-hover:rotate-[360deg] group-hover:scale-110 shadow-lg">
                      {isSending ? <Loader2 size={20} className="animate-spin" /> : <ArrowRight size={20} />}
                    </div>
                    
                    {/* Animated Liquid Fill Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue via-brand-cyan to-brand-blue opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-150 transition-all duration-700 ease-in-out rounded-full origin-center"></div>
                    
                    {/* Moving Particle/Flare Glimmer */}
                    <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] group-hover:left-[200%] transition-all duration-1000 ease-in-out"></div>
                    
                    {/* Pulse Border Effect */}
                    <div className="absolute inset-0 rounded-full border border-brand-cyan opacity-0 group-hover:opacity-100 group-hover:animate-ping pointer-events-none scale-100 group-hover:scale-105 transition-all duration-500"></div>
                  </button>
                  
                  <div className="flex items-center space-x-5 px-10 py-5 bg-slate-50 rounded-full border border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-brand-cyan">
                      <Lock size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Encrypted</span>
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Privacy Assured</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Right: Info Panel */}
            <div className="lg:w-2/5 bg-brand-dark relative p-8 md:p-16 lg:p-20 overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-brand-cyan/20 rounded-full blur-[120px] pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-[120px] pointer-events-none opacity-50"></div>
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="space-y-16">
                  <div className="space-y-3 text-center lg:text-left">
                    <h3 className="text-4xl font-black font-heading tracking-tight uppercase text-white">Contact Info</h3>
                    <div className="w-20 h-2 bg-brand-cyan rounded-full mx-auto lg:mx-0"></div>
                  </div>

                  <div className="space-y-12">
                    <div className="flex items-start space-x-8 group">
                      <div className="flex-shrink-0 w-14 h-14 rounded-[1.5rem] bg-white/10 border border-white/20 flex items-center justify-center text-brand-cyan transition-all group-hover:bg-brand-cyan group-hover:text-white group-hover:shadow-[0_0_30px_rgba(0,185,242,0.5)]">
                        <MapPin size={24} />
                      </div>
                      <div className="space-y-8">
                        <div className="space-y-2">
                           <h4 className="text-[11px] font-black text-brand-cyan uppercase tracking-widest">Dhaka Headquarters</h4>
                           <p className="text-sm font-semibold text-slate-300 leading-relaxed max-w-[280px]">
                             STP-1, BDBL Bhaban, Level-5, 12 Kazi Nazrul Islam Avenue, Karwan Bazar, Dhaka-1215
                           </p>
                        </div>
                        <div className="space-y-2">
                           <h4 className="text-[11px] font-black text-brand-cyan uppercase tracking-widest">Chattogram Hub</h4>
                           <p className="text-sm font-semibold text-slate-300 leading-relaxed max-w-[280px]">
                             Sekender Plaza, 2nd Floor, 815 CDA Avenue, Dampara Chawkbazar, Chattogram
                           </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-8 group">
                      <div className="flex-shrink-0 w-14 h-14 rounded-[1.5rem] bg-white/10 border border-white/20 flex items-center justify-center text-brand-cyan transition-all group-hover:bg-brand-cyan group-hover:text-white">
                        <PhoneCall size={24} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-[11px] font-black text-brand-cyan uppercase tracking-widest">Global Sales</h4>
                        <p className="text-lg font-black text-white">+88 01708-122851</p>
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Response within 2 hours</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-8 group">
                      <div className="flex-shrink-0 w-14 h-14 rounded-[1.5rem] bg-white/10 border border-white/20 flex items-center justify-center text-brand-cyan transition-all group-hover:bg-brand-cyan group-hover:text-white">
                        <Headphones size={24} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-[11px] font-black text-brand-cyan uppercase tracking-widest">Enterprise Support</h4>
                        <p className="text-lg font-black text-white">+88 02 55014045</p>
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">24/7 Dedicated Line</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-8 group">
                      <div className="flex-shrink-0 w-14 h-14 rounded-[1.5rem] bg-white/10 border border-white/20 flex items-center justify-center text-brand-cyan transition-all group-hover:bg-brand-cyan group-hover:text-white">
                        <Mail size={24} />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-[11px] font-black text-brand-cyan uppercase tracking-widest">Direct Inquiry</h4>
                        <a href="mailto:enquiry@mediasoftbd.com" className="text-lg font-black text-white hover:text-brand-cyan transition-colors underline decoration-brand-cyan/30 underline-offset-8">enquiry@mediasoftbd.com</a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Icons - Updated with Font Awesome & Proper Links */}
                <div className="pt-16 flex flex-col items-center lg:items-start space-y-8 border-t border-white/10">
                  <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-500">Join the Community</span>
                  <div className="flex flex-wrap gap-4">
                    {[
                      { icon: 'fa-brands fa-facebook-f', color: '#1877F2', url: 'https://www.facebook.com/mediasoftbd/' },
                      { icon: 'fa-brands fa-whatsapp', color: '#25D366', url: 'https://wa.me/+8801708122851' },
                      { icon: 'fa-brands fa-x-twitter', color: '#000000', url: 'https://x.com/MediasoftPOS' },
                      { icon: 'fa-brands fa-youtube', color: '#FF0000', url: 'https://www.youtube.com/@mediasoftbd' },
                      { icon: 'fa-brands fa-linkedin-in', color: '#0A66C2', url: 'https://www.linkedin.com/company/mediasoftbd' }
                    ].map((social, i) => (
                      <a 
                        key={i} 
                        href={social.url} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 hover:-translate-y-2 overflow-hidden shadow-lg"
                      >
                        <div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{ backgroundColor: social.color }}
                        ></div>
                        <i className={`${social.icon} relative z-10 text-white text-xl transition-all duration-500 group-hover:scale-125`}></i>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>     
    </div>
  );
};

export default Contact;