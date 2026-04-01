const AdminPage = () => {
    return (
      <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
        <div className="bg-gray-900 text-white rounded-[2.5rem] p-12 relative overflow-hidden shadow-2xl border-2 border-primary">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-[80px]" />
          <div className="relative z-10">
            <span className="px-5 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full text-[10px] font-black uppercase tracking-[0.25em] mb-8 inline-block">Security Command Center</span>
            <h1 className="text-5xl font-black mb-6 tracking-tighter">System Administration</h1>
            <p className="text-xl text-gray-400 max-w-2xl font-medium mb-12 leading-relaxed">
              Welcome to the administrative portal. Access restricted to authorized personnel with <span className="text-primary font-black">Level 01</span> clearance.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
              {[
                { label: 'Total Users', value: '1,280', color: 'primary' },
                { label: 'Active Sessions', value: '45,091', color: 'primary' },
                { label: 'System Integrity', value: '100%', color: 'primary' }
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/5 p-8 rounded-3xl group hover:border-primary/30 transition-all duration-300">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                  <p className="text-4xl font-black mt-1 text-white group-hover:text-primary transition-colors">{stat.value}</p>
                  <div className="h-1 w-8 bg-primary/20 mt-4 rounded-full group-hover:w-16 transition-all duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default AdminPage;
