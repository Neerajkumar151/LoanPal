import { Bot, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UserMenu } from '@/components/UserMenu';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

export default function Header() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-dark">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-amber-600 flex items-center justify-center shadow-lg shadow-accent/20 group-hover:shadow-accent/40 transition-all duration-500 group-hover:scale-105">
            <Bot className="w-5 h-5 text-accent-foreground" />
          </div>
          <span className="text-xl font-display font-bold text-white tracking-tight">
            LoanPal
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a onClick={() => navigate('/apply')} className="text-sm text-white/60 hover:text-white cursor-pointer transition-colors duration-300 font-medium">Apply Now</a>
          <a onClick={() => navigate('/dashboard')} className="text-sm text-white/60 hover:text-white cursor-pointer transition-colors duration-300 font-medium">Dashboard</a>
          <a onClick={() => navigate('/emi-calculator')} className="text-sm text-white/60 hover:text-white cursor-pointer transition-colors duration-300 font-medium">EMI Calculator</a>
        </nav>

        <div className="flex items-center gap-3">
          {!loading && user ? (
            <>
              <UserMenu />
              <button
                onClick={() => navigate('/apply')}
                className="hidden sm:inline-flex bg-accent text-accent-foreground px-5 py-2.5 rounded-xl font-semibold text-sm shadow-[0_0_20px_hsl(45_100%_51%/0.2)] hover:shadow-[0_0_30px_hsl(45_100%_51%/0.35)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Apply Now
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/auth')}
              className="bg-accent text-accent-foreground px-5 py-2.5 rounded-xl font-semibold text-sm shadow-[0_0_20px_hsl(45_100%_51%/0.2)] hover:shadow-[0_0_30px_hsl(45_100%_51%/0.35)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Get Started
            </button>
          )}
          <button className="md:hidden text-white/70 hover:text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden glass-dark border-t border-white/5 px-5 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <a onClick={() => { navigate('/apply'); setMobileOpen(false); }} className="block text-sm text-white/70 hover:text-white cursor-pointer py-2">Apply Now</a>
          <a onClick={() => { navigate('/dashboard'); setMobileOpen(false); }} className="block text-sm text-white/70 hover:text-white cursor-pointer py-2">Dashboard</a>
          <a onClick={() => { navigate('/emi-calculator'); setMobileOpen(false); }} className="block text-sm text-white/70 hover:text-white cursor-pointer py-2">EMI Calculator</a>
        </div>
      )}
    </header>
  );
}
