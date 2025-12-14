import { Bot, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
    const navigate = useNavigate();
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 pt-24 pb-20 overflow-hidden">

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vaWQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              AI-Powered Loan Assistant
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Get Your Loan Approved{' '}
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                Smarter, Faster
              </span>{' '}
              with LoanPal
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Our AI-powered platform analyzes your profile instantly,
              gives you transparent feedback, and helps you get the
              personal loan you need—without the hassle.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => navigate('/apply')} className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 transition-all duration-200">
                Apply Now
              </button>
              <button onClick={() => navigate('/apply')}  className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200">
                Check Eligibility
              </button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-emerald-400 border-2 border-white"
                  />
                ))}
              </div>
              <div>
                <p className="text-sm text-gray-500">Trusted by</p>
                <p className="text-lg font-semibold text-gray-900">50,000+ users</p>
              </div>
            </div>
          </div>

          <div className="relative lg:h-[600px] flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-emerald-400 rounded-3xl rotate-3 opacity-20 blur-2xl"></div>

            <div className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-emerald-600 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">LoanPal AI Assistant</p>
                  <p className="text-sm text-emerald-600">● Online</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-4 max-w-[85%]">
                  <p className="text-gray-700">Hi! I'm here to help you get your loan approved. What amount are you looking for?</p>
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl rounded-tr-sm p-4 max-w-[85%] ml-auto">
                  <p>I need ₹5,00,000 for home renovation</p>
                </div>

                <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-4 max-w-[85%]">
                  <p className="text-gray-700">Great! Based on your profile, you're likely eligible. Let me check a few more details...</p>
                </div>

                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
                <span>🔒 Secure & Encrypted</span>
                <span>✓ RBI Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
