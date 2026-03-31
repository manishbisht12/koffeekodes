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
      const { data } = await axios.get('http://localhost:5000/api/sessions/active', {
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
      await axios.delete(`http://localhost:5000/api/sessions/${sessionId}`, {
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
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
      <div className="mb-10 text-center lg:text-left">
        <h1 className="text-4xl font-extrabold text-gray-900 flex items-center gap-3">
          <ShieldCheck className="w-10 h-10 text-green-500" /> Active Sessions
        </h1>
        <p className="text-gray-500 mt-2 text-lg">Manage all devices currently logged into your account</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.map((session) => (
          <div key={session._id} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 relative group overflow-hidden">
            {session.jwtToken === user.token && (
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-tighter shadow-sm z-10">
                This Session
              </div>
            )}
            
            <div className="flex items-start gap-4 mb-6">
              <div className={`p-4 rounded-2xl ${session.os?.toLowerCase().includes('windows') || session.os?.toLowerCase().includes('mac') ? 'bg-indigo-50 text-indigo-600' : 'bg-green-50 text-green-600'}`}>
                {session.os?.toLowerCase().includes('windows') || session.os?.toLowerCase().includes('mac') ? <Monitor className="w-7 h-7" /> : <Smartphone className="w-7 h-7" />}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg leading-snug">{session.browser || 'Unknown Browser'}</h3>
                <p className="text-sm font-medium text-gray-500">{session.os || 'Unknown OS'}</p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-50 mb-6">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span className="font-medium">{session.ipAddress}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-amber-500" />
                <span className="font-medium">Started: {new Date(session.createdAt).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Globe className="w-4 h-4 text-blue-500" />
                <span className="font-medium">Last active: {new Date(session.lastActiveAt).toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => handleLogoutSession(session._id)}
              disabled={session.jwtToken === user.token}
              className={`w-full py-3 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all duration-300 ${
                session.jwtToken === user.token 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50' 
                  : 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white shadow-sm hover:shadow-red-200'
              }`}
            >
              <LogOut className="w-4 h-4" />
              {session.jwtToken === user.token ? 'Primary Session' : 'Logout Device'}
            </button>
          </div>
        ))}
        {sessions.length === 0 && (
          <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <Monitor className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-500">No active sessions found</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionsPage;
