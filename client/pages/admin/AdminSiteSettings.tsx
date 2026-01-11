import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Upload, Link as LinkIcon, Image as ImageIcon, Loader2, Save, Globe } from 'lucide-react';
import { useSiteSettings } from '../../context/SiteSettingsContext';

const AdminSiteSettings: React.FC = () => {
  const { settings, refreshSettings } = useSiteSettings();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [navbarLogoLight, setNavbarLogoLight] = useState('');
  const [navbarLogoDark, setNavbarLogoDark] = useState('');
  const [footerLogo, setFooterLogo] = useState('');
  const [favicon, setFavicon] = useState('');

  // Active Tab for each field (url vs upload) - simplifying to allow both URL input or file upload
  // For simplicity in this version, we will stick to URL input principally, but provide a generic file uploader helper
  
  useEffect(() => {
     if (settings) {
        setNavbarLogoLight(settings.navbarLogoLight);
        setNavbarLogoDark(settings.navbarLogoDark);
        setFooterLogo(settings.footerLogo);
        setFavicon(settings.favicon);
     }
  }, [settings]);

  const handleFileUpload = async (file: File) => {
      const formData = new FormData();
      formData.append('image', file);
      const res = await api.post('/upload', formData, {
         headers: { 'Content-Type': 'multipart/form-data' }
      });
      return res.data.div?.url || res.data.url;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void) => {
     if (e.target.files && e.target.files[0]) {
        try {
           setUploading(true);
           const url = await handleFileUpload(e.target.files[0]);
           setter(url);
        } catch (error) {
           console.error('Upload failed', error);
           alert('Upload failed');
        } finally {
           setUploading(false);
        }
     }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
       await api.put('/site-settings', {
          navbarLogoLight,
          navbarLogoDark,
          footerLogo,
          favicon
       });
       await refreshSettings();
       alert('Settings saved successfully!');
    } catch (error) {
       console.error('Error saving settings:', error);
       alert('Failed to save settings');
    } finally {
       setLoading(false);
    }
  };

  const InputGroup = ({ label, value, setter, helpText, imgClass = "h-12 w-auto object-contain" }: any) => (
     <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm">
        <div className="flex items-start justify-between mb-6">
           <div>
              <h3 className="text-lg font-bold text-gray-900">{label}</h3>
              <p className="text-sm text-gray-500 mt-1">{helpText}</p>
           </div>
           {value && (
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                 <img src={value} alt="Preview" className={imgClass} />
              </div>
           )}
        </div>
        
        <div className="space-y-4">
           <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Image URL</label>
              <div className="relative group">
                 <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                 <input 
                    type="text" 
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    className="w-full pl-12 p-4 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-medium text-gray-900"
                    placeholder="https://..."
                 />
              </div>
           </div>

           <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                 <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center">
                 <span className="px-2 bg-white text-xs text-gray-400 font-medium uppercase">Or Upload File</span>
              </div>
           </div>

           <div>
              <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-200 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 hover:border-blue-300 transition-all group">
                 <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {uploading ? <Loader2 className="animate-spin text-blue-500" /> : <Upload className="w-8 h-8 text-gray-400 group-hover:text-blue-500 transition-colors" />}
                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span></p>
                 </div>
                 <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, setter)} disabled={uploading} />
              </label>
           </div>
        </div>
     </div>
  );

  if (!settings) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-blue-500" /></div>;

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-20">
      {/* Header */}
      <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-sm flex justify-between items-center">
         <div>
            <h2 className="text-2xl font-black font-heading text-gray-900">Site Settings</h2>
            <p className="text-gray-500 font-medium text-sm mt-1">Manage global site assets and branding</p>
         </div>
         <button 
            onClick={handleSubmit}
            disabled={loading || uploading}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2"
         >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            <span>Save Changes</span>
         </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
         <InputGroup 
            label="Navbar Logo (Light Mode)" 
            helpText="Displayed on light backgrounds. Recommended size: 180x72 px."
            value={navbarLogoLight} 
            setter={setNavbarLogoLight} 
         />
         
         <InputGroup 
            label="Navbar Logo (Dark Mode)" 
            helpText="Displayed on dark backgrounds/overlays. Recommended size: 180x72 px."
            value={navbarLogoDark} 
            setter={setNavbarLogoDark} 
         />

         <InputGroup 
            label="Footer Logo" 
            helpText="Displayed in the site footer. Recommended size: 180x72 px."
            value={footerLogo} 
            setter={setFooterLogo} 
         />

         <InputGroup 
            label="Favicon" 
            helpText="Browser tab icon. Recommended size: 500x500 px."
            value={favicon} 
            setter={setFavicon}
            imgClass="h-12 w-12 object-contain"
         />
      </form>
    </div>
  );
};

export default AdminSiteSettings;
