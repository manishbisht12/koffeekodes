import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Calendar, MapPin, Laptop } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 border-l-8 border-indigo-600 pl-4">Dashboard</h1>
        <p className="text-gray-500 mt-2 ml-6 text-lg">Welcome back, <span className="font-bold text-indigo-600">{user?.name}</span></p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 bg-gradient-to-tr from-indigo-100 to-blue-100 rounded-3xl flex items-center justify-center text-indigo-600">
              <User className="w-12 h-12" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                  user?.role === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-green-100 text-green-700'
                }`}>
                  {user?.role}
                </span>
                <span className="text-gray-400 text-sm flex items-center">
                  <Shield className="w-3 h-3 mr-1" /> Verified Account
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-50">
            <div className="flex items-center gap-4 group">
              <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-indigo-50 transition-colors">
                <Mail className="w-5 h-5 text-gray-400 group-hover:text-indigo-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</p>
                <p className="text-gray-700 font-medium">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-indigo-50 transition-colors">
                <Calendar className="w-5 h-5 text-gray-400 group-hover:text-indigo-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Joined On</p>
                <p className="text-gray-700 font-medium">March 31, 2026</p>
              </div>
            </div>
          </div>
        </div>

        {/* Status Card */}
        <div className="space-y-8">
          <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-lg shadow-indigo-200">
            <h3 className="text-xl font-bold mb-4 opacity-90">Security Status</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-white/10 p-3 rounded-2xl">
                <span className="text-sm font-medium opacity-80">JWT Token</span>
                <span className="text-xs font-bold px-2 py-0.5 bg-green-400/20 text-green-300 rounded-md">ACTIVE</span>
              </div>
              <div className="flex justify-between items-center bg-white/10 p-3 rounded-2xl">
                <span className="text-sm font-medium opacity-80">Device Tracking</span>
                <span className="text-xs font-bold px-2 py-0.5 bg-green-400/20 text-green-300 rounded-md">ENABLED</span>
              </div>
              <div className="pt-2">
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-green-400 rounded-full" />
                </div>
                <p className="text-[10px] mt-2 opacity-50 uppercase tracking-widest text-center font-bold">100% Protected Session</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-50 rounded-2xl">
                <Shield className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 leading-tight">Access Level</h4>
                <p className="text-sm text-gray-500 uppercase font-black text-[10px] tracking-tighter">Authorized Portal</p>
              </div>
            </div>
            <span className="text-lg font-black text-gray-200">#01</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
