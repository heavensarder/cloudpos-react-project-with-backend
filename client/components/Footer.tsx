import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useSiteSettings } from '../context/SiteSettingsContext';

const Footer: React.FC = () => {
  const { settings } = useSiteSettings();

  return (
    <footer className="bg-brand-dark text-white pt-24 pb-12 relative border-t border-white/5">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-brand-cyan/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 pb-20 relative">
          {/* Subtle separator line - not crossing but integrated */}
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
          
          {/* Column 1: MediaSoft Logo & Contacts */}
          <div className="space-y-10">
            <img 
              src={settings?.footerLogo || "https://i.postimg.cc/QdSBd6bG/mediasoft_logo_v1.png"} 
              alt="Mediasoft" 
              className="h-[72px] w-[180px] object-contain transition-transform hover:scale-105 duration-500"
            />
            <div className="space-y-6">
              <div className="flex items-start space-x-4 text-[11px] text-gray-400">
                <div className="w-8 h-8 rounded-sm bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                  <Phone size={14} className="text-brand-cyan" />
                </div>
                <div>
                  <p className="font-black text-white mb-1 uppercase tracking-[0.1em]">Software Sales Contact:</p>
                  <p className="leading-relaxed font-medium">+88 02 55014045, +88 01708122851<br />(10 am-7 pm)</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 text-[11px] text-gray-400">
                <div className="w-8 h-8 rounded-sm bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                  <Mail size={14} className="text-brand-cyan" />
                </div>
                <div>
                  <p className="font-black text-white mb-1 uppercase tracking-[0.1em]">Email:</p>
                  <p className="font-medium">enquiry@mediasoftbd.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 text-[11px] text-gray-400">
                <div className="w-8 h-8 rounded-sm bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                  <MapPin size={14} className="text-brand-cyan" />
                </div>
                <div>
                  <p className="font-black text-white mb-1 uppercase tracking-[0.1em]">Dhaka Office:</p>
                  <p className="leading-relaxed font-medium">Software Technology Park-1 (STP-1) BDBL Bhaban, Level-5, 12, Kazi Nazrul Islam Avenue, Dhaka-1215</p>
                </div>
              </div>
            </div>
            {/* Social Icons Row - Updated with provided links */}
            <div className="flex space-x-3 pt-4">
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

          {/* Column 2: Industry We Serve */}
          <div>
            <h3 className="text-sm font-black mb-10 uppercase tracking-[0.3em] flex items-center">
              <span className="w-2 h-2 bg-brand-cyan rounded-full mr-3"></span>
              Industry We Serve
            </h3>
            <ul className="space-y-5 text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">
              <li><a href="#" className="hover:text-brand-cyan transition-colors flex items-center group"><span className="w-0 group-hover:w-3 h-0.5 bg-brand-cyan mr-0 group-hover:mr-2 transition-all"></span> Apparel Store</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors flex items-center group"><span className="w-0 group-hover:w-3 h-0.5 bg-brand-cyan mr-0 group-hover:mr-2 transition-all"></span> Super Store</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors flex items-center group"><span className="w-0 group-hover:w-3 h-0.5 bg-brand-cyan mr-0 group-hover:mr-2 transition-all"></span> Pharmacy Store</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors flex items-center group"><span className="w-0 group-hover:w-3 h-0.5 bg-brand-cyan mr-0 group-hover:mr-2 transition-all"></span> Life Style Shop</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors flex items-center group"><span className="w-0 group-hover:w-3 h-0.5 bg-brand-cyan mr-0 group-hover:mr-2 transition-all"></span> Footwear Shops</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors flex items-center group"><span className="w-0 group-hover:w-3 h-0.5 bg-brand-cyan mr-0 group-hover:mr-2 transition-all"></span> Electronics Store</a></li>
            </ul>
          </div>

          {/* Column 3: Features */}
          <div>
            <h3 className="text-sm font-black mb-10 uppercase tracking-[0.3em] flex items-center">
              <span className="w-2 h-2 bg-brand-cyan rounded-full mr-3"></span>
              Features
            </h3>
            <ul className="space-y-5 text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">
              <li><a href="#" className="hover:text-brand-cyan transition-colors flex items-center group"><span className="w-0 group-hover:w-3 h-0.5 bg-brand-cyan mr-0 group-hover:mr-2 transition-all"></span> Robust POS Features</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors flex items-center group"><span className="w-0 group-hover:w-3 h-0.5 bg-brand-cyan mr-0 group-hover:mr-2 transition-all"></span> Better Inventory Management</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors flex items-center group"><span className="w-0 group-hover:w-3 h-0.5 bg-brand-cyan mr-0 group-hover:mr-2 transition-all"></span> Multiple Payment Mode</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors flex items-center group"><span className="w-0 group-hover:w-3 h-0.5 bg-brand-cyan mr-0 group-hover:mr-2 transition-all"></span> Requisition for Supplier</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors flex items-center group"><span className="w-0 group-hover:w-3 h-0.5 bg-brand-cyan mr-0 group-hover:mr-2 transition-all"></span> Customer Loyalty & Promotions</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors flex items-center group"><span className="w-0 group-hover:w-3 h-0.5 bg-brand-cyan mr-0 group-hover:mr-2 transition-all"></span> Cloud Reports</a></li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h3 className="text-sm font-black mb-10 uppercase tracking-[0.3em] flex items-center">
              <span className="w-2 h-2 bg-brand-cyan rounded-full mr-3"></span>
              Company
            </h3>
            <ul className="space-y-5 text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">
              <li><a href="#" className="hover:text-brand-cyan transition-colors flex items-center group"><span className="w-0 group-hover:w-3 h-0.5 bg-brand-cyan mr-0 group-hover:mr-2 transition-all"></span> Customers</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors flex items-center group"><span className="w-0 group-hover:w-3 h-0.5 bg-brand-cyan mr-0 group-hover:mr-2 transition-all"></span> Blog</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors flex items-center group"><span className="w-0 group-hover:w-3 h-0.5 bg-brand-cyan mr-0 group-hover:mr-2 transition-all"></span> Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] font-black tracking-[0.4em] text-gray-500 uppercase">
          <p className="text-center md:text-left">© <span className="text-brand-cyan">Mediasoft Data Systems Limited</span> All Rights Reserved</p>
          <div className="flex space-x-10 mt-6 md:mt-0">
             <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;