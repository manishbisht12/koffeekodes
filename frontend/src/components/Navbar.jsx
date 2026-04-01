import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard, Monitor, ShieldCheck, ChevronDown, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Close dropdown on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const firstLetter = user.name ? user.name.charAt(0).toUpperCase() : '?';

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm px-6 py-4 fixed w-full top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/dashboard" 
          className="text-xl font-black text-gray-900 border-l-4 border-primary pl-3 hover:opacity-80 transition-opacity uppercase tracking-tighter"
        >
          Koffeekodes
        </Link>

        <div className="flex items-center gap-6">
          <Link 
            to="/dashboard" 
            className="flex items-center text-gray-600 hover:text-primary font-bold text-sm tracking-tight transition-colors"
          >
            <LayoutDashboard className="w-4 h-4 mr-1.5" />
            Dashboard
          </Link>

          <Link 
            to="/sessions" 
            className="flex items-center text-gray-600 hover:text-primary font-bold text-sm tracking-tight transition-colors"
          >
            <Monitor className="w-4 h-4 mr-1.5" />
            Sessions
          </Link>

          {user.role === 'admin' && (
            <Link 
              to="/admin" 
              className="flex items-center text-gray-900 hover:bg-primary/10 font-black text-xs uppercase tracking-widest transition-all px-3 py-1.5 rounded-full border-2 border-gray-900"
            >
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-primary" />
              Admin
            </Link>
          )}

          <div className="h-6 w-px bg-gray-200 mx-1" />

          {/* User Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-all duration-200 focus:outline-none border-2 border-transparent hover:border-gray-200"
            >
              <div className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center text-primary font-black text-base shadow-md border-2 border-primary">
                {firstLetter}
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 transform origin-top-right transition-all duration-200 scale-100">
                <div className="px-5 py-4 border-b border-gray-50 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-lg">
                    {firstLetter}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-black text-gray-900 truncate tracking-tight uppercase">{user.name}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">{user.role}</p>
                  </div>
                </div>
                
                <div className="p-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-xs font-black text-red-500 hover:bg-red-50 rounded-xl transition-all group uppercase tracking-widest"
                  >
                    <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
