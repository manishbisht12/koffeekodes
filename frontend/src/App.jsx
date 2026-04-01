import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import SessionsPage from './pages/SessionsPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans selection:bg-primary/30 selection:text-gray-900">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/sessions" element={
                <ProtectedRoute>
                  <SessionsPage />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute adminOnly={true}>
                  <AdminPage />
                </ProtectedRoute>
              } />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
          <Toaster 
            position="top-center" 
            toastOptions={{
              className: 'rounded-2xl bg-gray-900 text-white border-2 border-primary shadow-[0_20px_50px_rgba(78,201,176,0.15)] font-bold py-4 px-6 text-sm',
              duration: 4000,
              success: {
                iconTheme: {
                  primary: '#4EC9B0',
                  secondary: '#000',
                },
              },
            }} 
          />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
