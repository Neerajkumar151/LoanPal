import { Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UserMenu } from '@/components/UserMenu';
import { useAuth } from '@/hooks/useAuth';

export default function Header() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  return (
    <header className="dark fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 transition-all text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => navigate('/')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-yellow-600 flex items-center justify-center shadow-lg shadow-accent/20 group-hover:shadow-accent/40 transition-all duration-300">
            <Bot className="w-6 h-6 text-slate-900" />
          </div>
          <span className="text-2xl font-bold font-display text-white tracking-wide">
            LoanPal
          </span>
        </div>

        <div className="flex items-center gap-4">
          {!loading && user ? (
            <>
              <UserMenu />
              <button
                onClick={() => navigate('/apply')}
                className="bg-accent text-slate-900 px-6 py-2.5 rounded-xl font-bold shadow-[0_0_15px_rgba(250,204,21,0.2)] hover:shadow-[0_0_25px_rgba(250,204,21,0.4)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Apply Now
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/auth')}
              className="bg-accent text-slate-900 px-6 py-2.5 rounded-xl font-bold shadow-[0_0_15px_rgba(250,204,21,0.2)] hover:shadow-[0_0_25px_rgba(250,204,21,0.4)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
