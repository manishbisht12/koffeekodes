import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard, Monitor, ShieldCheck, UserCircle } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm px-6 py-4 fixed w-full top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/dashboard" 
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text hover:opacity-80 transition-opacity"
        >
          SecureAuth
        </Link>

        <div className="flex items-center gap-6">
          <Link 
            to="/dashboard" 
            className="flex items-center text-gray-600 hover:text-blue-600 font-medium transition-colors"
          >
            <LayoutDashboard className="w-5 h-5 mr-1" />
            Dashboard
          </Link>

          <Link 
            to="/sessions" 
            className="flex items-center text-gray-600 hover:text-blue-600 font-medium transition-colors"
          >
            <Monitor className="w-5 h-5 mr-1" />
            Sessions
          </Link>

          {user.role === 'admin' && (
            <Link 
              to="/admin" 
              className="flex items-center text-indigo-600 hover:text-indigo-700 font-semibold transition-colors bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100"
            >
              <ShieldCheck className="w-4 h-4 mr-1" />
              Admin
            </Link>
          )}

          <div className="h-6 w-px bg-gray-200 mx-2" />

          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end mr-2">
              <span className="text-sm font-semibold text-gray-900">{user.name}</span>
              <span className="text-xs text-gray-500 capitalize">{user.role}</span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-300"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
