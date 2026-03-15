import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Tech Entrepreneur",
    content: "LoanPal revolutionized how I access capital. The AI-driven process was seamless, and I received funding in less than 15 minutes. Truly next-gen finance.",
    image: "/images/testimonial-alex.png",
    rating: 5
  },
  {
    name: "Sarah Chen",
    role: "Freelance Designer",
    content: "As a freelancer, traditional banks often make things difficult. LoanPal's AI understood my income patterns perfectly. The transparency is refreshing.",
    image: "https://i.pravatar.cc/150?u=sarah",
    rating: 5
  },
  {
    name: "Marcus Thorne",
    role: "Small Business Owner",
    content: "Absolute clarity from start to finish. I knew exactly where I stood at every step. The speed of disbursement is unmatched in the industry.",
    image: "https://i.pravatar.cc/150?u=marcus",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-32 bg-slate-900 border-t border-white/5 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <p className="text-accent font-semibold tracking-wider uppercase text-sm mb-3">Customer Voices</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 font-display tracking-tight">
            Trusted by Modern <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-600">Visionaries.</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Our algorithmic precision meets human ambition. Here is what those who chose the future have to say.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="group relative bg-slate-950/40 backdrop-blur-xl rounded-[2rem] p-8 border border-white/10 hover:border-accent/30 transition-all duration-500 animate-in fade-in slide-in-from-bottom-12 fill-mode-both"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-white/5 group-hover:text-accent/10 transition-colors duration-500" />
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/10 group-hover:border-accent/40 transition-colors duration-500">
                  <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-white font-bold font-display text-lg">{testimonial.name}</h4>
                  <p className="text-slate-500 text-sm">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              <p className="text-slate-300 font-light leading-relaxed italic">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
