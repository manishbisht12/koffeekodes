import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Mail, Lock, User, ShieldCheck } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(formData);
    if (success) {
      navigate('/login');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full animate-in fade-in zoom-in duration-500">
        <div className="bg-white border border-gray-100 shadow-2xl rounded-[2.5rem] p-10 transition-all duration-500">
          <div className="text-center mb-10">
            <div className="bg-gray-900 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl border-2 border-primary group hover:scale-110 transition-transform duration-500">
              <UserPlus className="text-primary w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Registration</h1>
            <p className="text-[10px] text-gray-400 mt-2 font-black uppercase tracking-[0.2em]">Create your secure node</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-primary transition-all outline-none text-gray-900 font-medium"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-primary transition-all outline-none text-gray-900 font-medium"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-primary transition-all outline-none text-gray-900 font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Account Role</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <ShieldCheck className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                </div>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-primary transition-all outline-none text-gray-900 font-medium appearance-none"
                >
                  <option value="user">Standard User</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 text-white border-2 border-primary rounded-xl py-4 font-black shadow-lg shadow-primary/10 hover:bg-primary hover:text-gray-900 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 mt-4 uppercase tracking-widest text-sm"
            >
              Create Account
            </button>
          </form>

          <footer className="mt-8 pt-8 border-t border-gray-50 flex flex-col items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Already have an account?</span>
              <Link to="/login" className="text-gray-900 font-black hover:text-primary transition-colors border-b-2 border-primary">
                Login
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
