const AdminPage = () => {
    return (
      <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
        <div className="bg-indigo-900 text-white rounded-3xl p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl ring-8 ring-white/5 opacity-50" />
          <div className="relative z-10">
            <span className="px-4 py-1 bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 rounded-full text-xs font-black uppercase tracking-widest mb-6 inline-block">Admin Control Panel</span>
            <h1 className="text-5xl font-black mb-4 tracking-tighter">System Administration</h1>
            <p className="text-xl text-indigo-200 max-w-2xl font-medium mb-12">
              Welcome to the administrative portal. Only users with heightened privileges can access these systems.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'User Records', value: '1,280', color: 'bg-blue-500' },
                { label: 'Security Logs', value: '45,091', color: 'bg-rose-500' },
                { label: 'System Health', value: '99.9%', color: 'bg-emerald-500' }
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                  <p className="text-sm font-bold text-indigo-300 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-3xl font-black mt-1">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default AdminPage;
