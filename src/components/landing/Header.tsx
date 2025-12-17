import { Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import { UserMenu } from '@/components/UserMenu';
import { useAuth } from '@/hooks/useAuth';

export default function Header() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Bot className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            LoanPal
          </span>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {!loading && user ? (
            <>
              <UserMenu />
              <button
                onClick={() => navigate('/apply')}
                className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-5 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Apply Now
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/auth')}
              className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-5 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
