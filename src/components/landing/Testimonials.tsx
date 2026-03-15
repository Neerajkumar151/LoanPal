import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Tech Entrepreneur",
    content: "LoanPal revolutionized how I access capital. The AI-driven process was seamless, and I received funding in less than 15 minutes. Truly next-gen.",
    image: "/images/testimonial-alex.png",
    rating: 5
  },
  {
    name: "Sarah Chen",
    role: "Freelance Designer",
    content: "As a freelancer, traditional banks often make things difficult. LoanPal's AI understood my income patterns perfectly. Refreshing transparency.",
    image: "https://i.pravatar.cc/150?u=sarah",
    rating: 5
  },
  {
    name: "Marcus Thorne",
    role: "Small Business Owner",
    content: "Absolute clarity from start to finish. Knew exactly where I stood at every step. The speed of disbursement is unmatched in the industry.",
    image: "https://i.pravatar.cc/150?u=marcus",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-32 bg-[hsl(220,25%,7%)] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/4 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <p className="text-overline text-accent uppercase tracking-[0.2em] mb-4">Customer Voices</p>
          <h2 className="font-display text-display-md sm:text-display-lg text-white mb-6 tracking-tight">
            Trusted by <span className="gradient-text">Visionaries.</span>
          </h2>
          <p className="text-body-lg text-white/40 max-w-xl mx-auto">
            Algorithmic precision meets human ambition.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="group relative bg-white/[0.02] backdrop-blur-sm rounded-3xl p-8 border border-white/[0.06] hover:border-accent/20 transition-all duration-500 border-gradient"
            >
              <Quote className="absolute top-8 right-8 w-10 h-10 text-white/[0.03] group-hover:text-accent/10 transition-colors duration-500" />
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/[0.08] group-hover:border-accent/30 transition-colors duration-500">
                  <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                </div>
                <div>
                  <h4 className="text-white font-display font-semibold text-base tracking-tight">{testimonial.name}</h4>
                  <p className="text-overline text-white/25 uppercase">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex gap-0.5 mb-5">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                ))}
              </div>

              <p className="text-caption text-white/40 leading-relaxed italic">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
