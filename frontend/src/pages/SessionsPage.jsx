import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { Monitor, Smartphone, Globe, LogOut, Clock, ShieldCheck, MapPin } from 'lucide-react';

const SessionsPage = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchSessions = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/sessions/active`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setSessions(data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch sessions');
      setLoading(false);
    }
  };

  const handleLogoutSession = async (sessionId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'}/sessions/${sessionId}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      toast.success('Session logged out');
      fetchSessions();
    } catch (error) {
      toast.error('Failed to logout session');
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  if (loading) return (
    <div className="pt-32 px-6 max-w-7xl mx-auto flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
      <div className="mb-12 text-center lg:text-left">
        <h1 className="text-4xl font-black text-gray-900 flex items-center justify-center lg:justify-start gap-4 tracking-tight">
          <ShieldCheck className="w-12 h-12 text-primary" /> Active Sessions
        </h1>
        <p className="text-gray-500 mt-3 text-lg font-medium max-w-2xl">Manage all devices currently logged into your account. Terminate any unknown sessions immediately.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sessions.map((session) => (
          <div key={session._id} className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-2xl hover:shadow-primary/5 transition-all duration-500 relative group overflow-hidden hover:border-primary/20">
            {session.jwtToken === user.token && (
              <div className="absolute top-0 right-0 bg-gray-900 text-primary text-[10px] font-black px-5 py-2 rounded-bl-3xl uppercase tracking-widest shadow-lg border-b border-l border-primary/30 z-10">
                Active Now
              </div>
            )}
            
            <div className="flex items-start gap-5 mb-8">
              <div className={`p-4 rounded-full shadow-xl transition-all duration-500 ${session.jwtToken === user.token ? 'bg-gray-900 text-primary border-2 border-primary' : 'bg-gray-50 text-gray-400 border border-gray-100 group-hover:bg-primary/5 group-hover:text-primary group-hover:border-primary/20'}`}>
                {session.os?.toLowerCase().includes('windows') || session.os?.toLowerCase().includes('mac') ? <Monitor className="w-6 h-6" /> : <Smartphone className="w-6 h-6" />}
              </div>
              <div className="mt-1">
                <h3 className="font-black text-gray-900 text-lg tracking-tight leading-tight uppercase">{session.browser || 'Unknown'}</h3>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1.5">{session.os || 'OS Unknown'}</p>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-gray-50 mb-8">
              <div className="flex items-center gap-3.5 text-sm text-gray-600 group/item">
                <div className="p-2 bg-gray-50 rounded-lg group-hover/item:bg-gray-900 transition-colors">
                  <MapPin className="w-4 h-4 text-gray-400 group-hover/item:text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">IP Address</p>
                  <span className="font-bold tracking-tight text-gray-700">{session.ipAddress}</span>
                </div>
              </div>
              <div className="flex items-center gap-3.5 text-sm text-gray-600 group/item">
                <div className="p-2 bg-gray-50 rounded-lg group-hover/item:bg-gray-900 transition-colors">
                  <Clock className="w-4 h-4 text-gray-400 group-hover/item:text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Login Time</p>
                  <span className="font-bold tracking-tight text-gray-700">{new Date(session.createdAt).toLocaleDateString()} {new Date(session.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
              <div className="flex items-center gap-3.5 text-sm text-gray-600 group/item">
                <div className="p-2 bg-gray-50 rounded-lg group-hover/item:bg-gray-900 transition-colors">
                  <Globe className="w-4 h-4 text-gray-400 group-hover/item:text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Last Activity</p>
                  <span className="font-bold tracking-tight text-gray-700">{new Date(session.lastActiveAt).toLocaleDateString()} {new Date(session.lastActiveAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleLogoutSession(session._id)}
              disabled={session.jwtToken === user.token}
              className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 ${
                session.jwtToken === user.token 
                  ? 'bg-gray-50 text-gray-300 cursor-not-allowed border-2 border-transparent' 
                  : 'bg-white text-red-600 border-2 border-red-50 hover:bg-red-500 hover:text-white hover:border-red-500 hover:-translate-y-1 active:translate-y-0 shadow-lg shadow-red-50'
              }`}
            >
              <LogOut className="w-4 h-4" />
              {session.jwtToken === user.token ? 'Primary Session' : 'Revoke Access'}
            </button>
          </div>
        ))}
        {sessions.length === 0 && (
          <div className="col-span-full py-24 text-center bg-gray-50 rounded-[3rem] border-4 border-dashed border-gray-100">
            <Monitor className="w-20 h-20 text-gray-200 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-gray-300 uppercase tracking-widest">No Active Nodes Found</h3>
            <p className="text-gray-400 mt-2 font-medium">This is unusual. Please refresh to check system status.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionsPage;
