import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Calendar, MapPin, Laptop, ShieldCheck } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-gray-900 border-l-8 border-primary pl-6 tracking-tight">Dashboard</h1>
        <p className="text-gray-500 mt-2 ml-8 text-lg font-medium">
          Welcome, <span className="font-black text-gray-900">{user?.name}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-10 shadow-2xl border border-gray-50 hover:border-primary/20 transition-all duration-500">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
            <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center text-primary shadow-xl border-2 border-primary group hover:scale-105 transition-transform duration-500">
              <User className="w-10 h-10 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-black text-gray-900 tracking-tight uppercase">{user?.name}</h2>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-3">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] ${
                  user?.role === 'admin' ? 'bg-gray-900 text-primary border border-primary' : 'bg-primary/10 text-primary border border-primary/20'
                }`}>
                  {user?.role}
                </span>
                <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Verified Profile
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t border-gray-50">
            <div className="flex items-center gap-5 group">
              <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-gray-900 group-hover:text-primary transition-all duration-300">
                <Mail className="w-6 h-6 text-gray-400 group-hover:text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Email Address</p>
                <p className="text-gray-900 font-bold text-lg">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-5 group">
              <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-gray-900 group-hover:text-primary transition-all duration-300">
                <Calendar className="w-6 h-6 text-gray-400 group-hover:text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Account Created</p>
                <p className="text-gray-900 font-bold text-lg">March 31, 2026</p>
              </div>
            </div>
          </div>
        </div>

        {/* Status Card */}
        <div className="space-y-8">
          <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white shadow-2xl border-2 border-primary relative overflow-hidden group">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500" />
            <h3 className="text-xl font-black mb-8 border-b border-primary/20 pb-4 tracking-tight">Security Status</h3>
            <div className="space-y-5">
              <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl hover:bg-white/10 transition-colors border border-white/5">
                <span className="text-sm font-bold opacity-70 tracking-wide uppercase text-xs">Auth Token</span>
                <span className="text-[10px] font-black px-3 py-1 bg-primary text-gray-900 rounded-lg tracking-widest">ACTIVE</span>
              </div>
              <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl hover:bg-white/10 transition-colors border border-white/5">
                <span className="text-sm font-bold opacity-70 tracking-wide uppercase text-xs">Device Tracking</span>
                <span className="text-[10px] font-black px-3 py-1 bg-primary text-gray-900 rounded-lg tracking-widest">ON</span>
              </div>
              <div className="pt-4 px-1">
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full w-full bg-primary rounded-full shadow-[0_0_15px_rgba(78,201,176,0.5)]" />
                </div>
                <p className="text-[10px] mt-4 opacity-40 uppercase tracking-[0.25em] text-center font-black">100% Secure Environment</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-gray-50 flex items-center justify-between group hover:border-primary/20 transition-all">
            <div className="flex items-center gap-5">
              <div className="p-4 bg-primary rounded-2xl shadow-lg shadow-primary/20">
                <Shield className="w-8 h-8 text-gray-900" />
              </div>
              <div>
                <h4 className="font-black text-gray-900 leading-tight text-lg">System Access</h4>
                <p className="text-[10px] text-primary uppercase font-black tracking-widest mt-1">Authorized Node</p>
              </div>
            </div>
            <span className="text-2xl font-black text-gray-100 group-hover:text-primary/10 transition-colors">#01</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
