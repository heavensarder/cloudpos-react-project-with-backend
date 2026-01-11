import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Check, X, Zap, Star, Layers, ArrowRight, ShieldCheck, 
  Stethoscope, Pill, Activity, Sparkles, Globe, 
  MessageSquare, Plus, Info, CheckCircle2 
} from 'lucide-react';

interface Metric {
  label: string;
  basic: string;
  standard: string;
  enterprise: string;
}

interface FeatureGroup {
  groupName: string;
  features: string[];
}

const keyMetrics: Metric[] = [
  { label: "Product wise Vendor", basic: "Single", standard: "Multiple", enterprise: "Multiple" },
  { label: "Product Layer", basic: "5", standard: "7", enterprise: "9" },
  { label: "Dashboard", basic: "Basic", standard: "Full + Analytics", enterprise: "Full + Analytics" },
  { label: "Customer Layer", basic: "1", standard: "3", enterprise: "6" },
  { label: "Sale Type", basic: "Cash, Card", standard: "Cash, Card, Credit", enterprise: "All Types" },
  { label: "Bargain Sale", basic: "Included", standard: "Included", enterprise: "Included" },
  { label: "Product Attribute", basic: "5", standard: "10", enterprise: "30" },
  { label: "Product Pricing", basic: "Cost, Sale", standard: "Cost, Sale, Wholesale", enterprise: "All Types" },
];

const featureGroups: FeatureGroup[] = [
  {
    groupName: "Sales & Operations",
    features: [
      "Promotion", 
      "Gift Voucher", 
      "Product Unit Conversion",
      "Single Productwise Discount", 
      "Special Discount", 
      "Carton wise Sales",
      "Price Quotation", 
      "Transition Alert", 
      "Service Sale"
    ]
  },
  {
    groupName: "Inventory Management",
    features: [
      "Product Upload (.xls)", 
      "Product Update (.xls)", 
      "Product Upload + Receiving",
      "Price Change by Excel", 
      "Cost View In Report", 
      "Non Saleable Item Inventory",
      "Discount Exemption", 
      "Customer Record in Sales", 
      "Product Image Support",
      "Multiple MRP Warehouse Stock"
    ]
  },
  {
    groupName: "Logistics & Compliance",
    features: [
      "Shop in Shop Operation", 
      "Allocation for Delivery", 
      "Purchase Order",
      "Delivery Challan", 
      "Gift Invoice", 
      "Any Branch Exchange",
      "Any Price Exchange", 
      "Multiple Warehouse", 
      "Console Reporting Setup",
      "Batch Management", 
      "Expiry Management", 
      "FIFO Method",
      "Franchise Outlet Delivery", 
      "Shop wise Sales Price",
      "Reference Discount", 
      "Operation Approval System"
    ]
  }
];

const Plans: React.FC = () => {
  const navigate = useNavigate();

  const handlePlanSelection = (planId: string) => {
    navigate('/contact', { state: { plan: planId } });
  };

  const FeatureCheck = ({ included, colorClass }: { included: boolean, colorClass: string }) => (
    <div className="flex items-center justify-center">
      {included ? (
        <div className={`w-7 h-7 rounded-full flex items-center justify-center ${colorClass} bg-opacity-10 shadow-sm transition-transform group-hover:scale-110`}>
          <Check size={16} className={colorClass} strokeWidth={3} />
        </div>
      ) : (
        <X size={16} className="text-slate-300" strokeWidth={2} />
      )}
    </div>
  );

  return (
    <div className="bg-[#fcfdfe] min-h-screen font-sans">
      {/* 1. Hero Header - Matched with About Page Header Design */}
      <section className="relative pt-44 pb-32 px-4 hero-bg overflow-hidden text-center text-white">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-cyan/20 rounded-full blur-[120px] animate-pulse-soft"></div>
        <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-brand-blue/30 rounded-full blur-[150px] animate-float"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-8">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-white/10 border border-white/20 backdrop-blur-md rounded-full animate-fade-in">
            <Sparkles size={16} className="text-brand-cyan" />
            <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Investment Roadmap</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-[900] text-white leading-[1.1] font-heading tracking-tighter text-shadow-sm animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Transparent<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-cyan to-white">POS Intelligence</span>
          </h1>
          <p className="max-w-2xl mx-auto text-white/80 text-lg md:text-xl font-medium leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Enterprise-grade capabilities scaled to fit your business trajectory. No hidden fees, just pure performance.
          </p>
        </div>
      </section>

      {/* 2. Main Plans & Pricing Section */}
      <section className="relative z-20 -mt-16 px-4 pb-32">
        <div className="max-w-7xl mx-auto">
          
          {/* MOBILE VIEW: Cards for better UX */}
          <div className="lg:hidden grid grid-cols-1 gap-12">
            {[
              { id: 'Basic', icon: Zap, color: 'text-brand-cyan', bg: 'bg-brand-cyan', desc: 'Ideal for small boutiques and startups.' },
              { id: 'Standard', icon: Star, color: 'text-brand-blue', bg: 'bg-brand-blue', desc: 'Perfect for growing multi-location retail.', popular: true },
              { id: 'Enterprise', icon: Layers, color: 'text-red-500', bg: 'bg-red-500', desc: 'The ultimate powerhouse for large chains.' }
            ].map((plan) => (
              <div key={plan.id} className={`bg-white rounded-[3rem] shadow-2xl overflow-hidden border ${plan.popular ? 'border-brand-blue/30 ring-4 ring-brand-blue/5' : 'border-gray-100'}`}>
                <div className={`p-10 ${plan.bg} text-white text-center space-y-4`}>
                  {plan.popular && <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-[9px] font-black uppercase tracking-widest mb-2">Most Popular</span>}
                  <plan.icon size={48} className="mx-auto" />
                  <h3 className="text-3xl font-black uppercase tracking-widest">{plan.id}</h3>
                  <p className="text-white/70 text-sm font-medium">{plan.desc}</p>
                </div>
                
                <div className="p-10 space-y-10">
                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b pb-2">Core Metrics</p>
                    {keyMetrics.slice(0, 6).map((m, i) => (
                      <div key={i} className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 font-bold">{m.label}</span>
                        <span className={`${plan.color} font-black`}>
                          {plan.id === 'Basic' ? m.basic : plan.id === 'Standard' ? m.standard : m.enterprise}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4 pt-6 border-t border-gray-50">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pb-2">Top Features</p>
                    <div className="grid grid-cols-1 gap-3">
                       {featureGroups[0].features.slice(0, 5).map((f, i) => (
                         <div key={i} className="flex items-center space-x-3">
                           <CheckCircle2 size={16} className={plan.color} />
                           <span className="text-xs font-semibold text-gray-700">{f}</span>
                         </div>
                       ))}
                       <p className="text-[9px] font-bold text-gray-400 italic mt-2">+ And many more detailed functions</p>
                    </div>
                  </div>

                  {/* Button at the bottom for Mobile */}
                  <div className="pt-4">
                    <button 
                      onClick={() => handlePlanSelection(plan.id)}
                      className={`w-full py-6 rounded-2xl ${plan.bg} text-white font-black text-sm tracking-[0.4em] uppercase shadow-xl hover:scale-[1.02] active:scale-95 transition-all`}
                    >
                      SELECT
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP VIEW: Unified Comparison Grid */}
          <div className="hidden lg:block bg-white rounded-[3.5rem] shadow-[0_60px_120px_-20px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-4">
              {/* Table Headers */}
              <div className="p-12 bg-slate-50/50 flex flex-col justify-end">
                <h3 className="text-3xl font-black text-gray-900 font-heading leading-tight">Compare <br />Features</h3>
                <div className="w-12 h-1.5 bg-brand-cyan rounded-full mt-4"></div>
              </div>
              
              <div className="p-12 text-center border-l border-gray-50 group hover:bg-brand-cyan/[0.02] transition-colors">
                <Zap size={40} className="text-brand-cyan mx-auto mb-6 transition-transform group-hover:scale-110" />
                <h4 className="text-2xl font-black text-brand-cyan uppercase tracking-widest">Basic</h4>
                <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase">Foundation Tier</p>
              </div>

              <div className="p-12 text-center border-l border-gray-50 relative group hover:bg-brand-blue/[0.02] transition-colors">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-blue"></div>
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-brand-blue text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Popular Choice</div>
                <Star size={40} className="text-brand-blue mx-auto mb-6 pt-2 transition-transform group-hover:scale-110" />
                <h4 className="text-2xl font-black text-brand-blue uppercase tracking-widest">Standard</h4>
                <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase">Growth Tier</p>
              </div>

              <div className="p-12 text-center border-l border-gray-50 group hover:bg-red-500/[0.01] transition-colors">
                <Layers size={40} className="text-red-500 mx-auto mb-6 transition-transform group-hover:scale-110" />
                <h4 className="text-2xl font-black text-red-500 uppercase tracking-widest">Enterprise</h4>
                <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase">Infinite Tier</p>
              </div>

              {/* Technical Metrics Rows */}
              <div className="col-span-4 bg-slate-50/50 py-4 px-12 border-t border-gray-100">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">Operational Parameters</span>
              </div>
              
              {keyMetrics.map((metric, idx) => (
                <React.Fragment key={idx}>
                  <div className="p-6 px-12 flex items-center border-t border-gray-50">
                    <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">{metric.label}</span>
                  </div>
                  <div className="p-6 border-t border-l border-gray-50 text-center font-black text-brand-cyan text-xs">{metric.basic}</div>
                  <div className="p-6 border-t border-l border-gray-50 text-center font-black text-brand-blue text-xs bg-brand-blue/[0.01]">{metric.standard}</div>
                  <div className="p-6 border-t border-l border-gray-50 text-center font-black text-red-500 text-xs">{metric.enterprise}</div>
                </React.Fragment>
              ))}

              {/* Feature Matrix Groups */}
              {featureGroups.map((group, gIdx) => (
                <React.Fragment key={gIdx}>
                  <div className="col-span-4 bg-slate-50/50 py-4 px-12 border-t border-gray-100">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">{group.groupName}</span>
                  </div>
                  {group.features.map((feature, fIdx) => {
                    const isBasic = gIdx === 0 && fIdx === 0;
                    const isStandardExcl = gIdx === 2 && fIdx >= 1;
                    return (
                      <React.Fragment key={fIdx}>
                        <div className="p-6 px-12 border-t border-gray-50 flex items-center group/row">
                          <span className="text-sm font-semibold text-gray-600 transition-colors group-hover/row:text-gray-900">{feature}</span>
                        </div>
                        <div className="p-6 border-t border-l border-gray-50"><FeatureCheck included={isBasic} colorClass="text-brand-cyan" /></div>
                        <div className="p-6 border-t border-l border-gray-50 bg-brand-blue/[0.01]"><FeatureCheck included={!isStandardExcl} colorClass="text-brand-blue" /></div>
                        <div className="p-6 border-t border-l border-gray-50"><FeatureCheck included={true} colorClass="text-red-500" /></div>
                      </React.Fragment>
                    );
                  })}
                </React.Fragment>
              ))}

              {/* FINAL BUTTONS ROW AT BOTTOM FOR DESKTOP */}
              <div className="p-12 border-t border-gray-100 flex items-center justify-center bg-slate-50">
                 <div className="text-center space-y-2">
                    <Sparkles className="text-brand-cyan mx-auto mb-2 animate-pulse" size={24} />
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Unlock Efficiency</p>
                 </div>
              </div>
              
              <div className="p-12 border-t border-l border-gray-100 text-center flex items-center justify-center">
                <button 
                  onClick={() => handlePlanSelection('Basic')}
                  className="w-full bg-brand-cyan text-white py-6 rounded-2xl font-black text-[12px] tracking-[0.5em] uppercase shadow-lg shadow-brand-cyan/20 hover:shadow-brand-cyan/40 hover:-translate-y-1 transition-all"
                >
                  SELECT
                </button>
              </div>

              <div className="p-12 border-t border-l border-gray-100 text-center bg-brand-blue/[0.02] flex items-center justify-center">
                <button 
                  onClick={() => handlePlanSelection('Standard')}
                  className="w-full bg-brand-blue text-white py-6 rounded-2xl font-black text-[12px] tracking-[0.5em] uppercase shadow-lg shadow-brand-blue/20 hover:shadow-brand-blue/40 hover:-translate-y-1 transition-all"
                >
                  SELECT
                </button>
              </div>

              <div className="p-12 border-t border-l border-gray-100 text-center flex items-center justify-center">
                <button 
                  onClick={() => handlePlanSelection('Enterprise')}
                  className="w-full bg-red-500 text-white py-6 rounded-2xl font-black text-[12px] tracking-[0.5em] uppercase shadow-lg shadow-red-500/20 hover:shadow-red-500/40 hover:-translate-y-1 transition-all"
                >
                  SELECT
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Specialized CloudPharma Highlight */}
      <section className="pb-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="bg-brand-dark rounded-[4rem] p-12 md:p-24 relative overflow-hidden text-white group">
            {/* Background accents */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-cyan/10 rounded-full blur-[150px] pointer-events-none transition-all duration-1000 group-hover:scale-110"></div>
            <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[150px] pointer-events-none transition-all duration-1000 group-hover:scale-110"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 relative z-10">
              <div className="space-y-10">
                <div className="inline-flex items-center space-x-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                  <Pill size={18} className="text-brand-cyan" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">Life Sciences Logic</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black font-heading leading-none tracking-tighter">
                  CloudPharma <br />
                  <span className="text-brand-cyan">Clinical Tier</span>
                </h2>
                <p className="text-white/60 text-lg md:text-xl font-medium leading-relaxed">
                  Engineered specifically for pharmacies and drug stores. Full batch management, expiry logic, and DGDA reporting compliance built right in.
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-brand-cyan border border-white/5">
                      <ShieldCheck size={24} />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/50">Full Compliance</p>
                  </div>
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-brand-cyan border border-white/5">
                      <Stethoscope size={24} />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/50">Pharma Specific</p>
                  </div>
                </div>
                <div className="pt-6">
                  <button 
                    onClick={() => handlePlanSelection('CloudPharma')}
                    className="bg-brand-cyan text-brand-dark px-14 py-7 rounded-[2rem] font-black text-xs tracking-[0.4em] uppercase shadow-2xl hover:bg-white hover:scale-105 active:scale-95 transition-all"
                  >
                    SELECT
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-brand-cyan/20 blur-[100px] rounded-full pointer-events-none"></div>
                <img 
                  src="https://i.postimg.cc/nctYjtLS/cloudpharma.webp" 
                  alt="Medical POS" 
                  className="rounded-[3rem] shadow-2xl relative z-10 w-full object-cover aspect-[4/3] grayscale hover:grayscale-0 transition-all duration-1000 border-4 border-white/10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Expert Consultation CTA */}
      <section className="pb-32 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <div className="inline-flex items-center space-x-2 text-brand-blue">
             <Info size={20} />
             <span className="text-[10px] font-black uppercase tracking-widest">Consulting Available</span>
          </div>
          <h3 className="text-3xl md:text-5xl font-black text-gray-900 font-heading tracking-tighter">
            Scaling a massive <br /> retail chain?
          </h3>
          <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed">
            Our solution architects can design a custom technical framework for enterprises with 500+ outlets and complex logistical needs.
          </p>
          <div className="pt-4">
            <button 
              onClick={() => navigate('/contact')}
              className="group inline-flex items-center space-x-4 bg-brand-dark text-white px-16 py-7 rounded-[2.5rem] font-black text-[11px] tracking-[0.5em] uppercase transition-all shadow-2xl hover:bg-black hover:-translate-y-2"
            >
              <MessageSquare size={20} className="text-brand-cyan" />
              <span>Expert Consultation</span>
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Plans;