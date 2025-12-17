import { Clock, FileX, AlertCircle, MessagesSquare } from 'lucide-react';

const reasons = [
  {
    icon: Clock,
    title: 'Faster Than Traditional Banks',
    description: 'Get decisions in minutes, not days or weeks. No more waiting in long queues or endless phone calls.',
    stat: '10x',
    statLabel: 'Faster',
  },
  {
    icon: FileX,
    title: 'No Paperwork Hassle',
    description: 'Digital-first approach means less paperwork, fewer visits, and more convenience. Everything online.',
    stat: '100%',
    statLabel: 'Digital',
  },
  {
    icon: AlertCircle,
    title: 'Clear Rejection Reasons',
    description: 'Unlike traditional lenders, we tell you exactly why your application was rejected and how to improve.',
    stat: '95%',
    statLabel: 'Transparency',
  },
  {
    icon: MessagesSquare,
    title: 'User-Friendly Experience',
    description: 'Chat-based interface feels natural. No confusing forms or banking jargon. Just simple conversations.',
    stat: '4.8/5',
    statLabel: 'User Rating',
  },
];

export default function WhyChoose() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Why Choose LoanPal?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're reimagining personal loans with technology, transparency, and a human touch
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>

                <div className="relative bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-border">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                        <Icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                    </div>

                    <div className="flex-1 space-y-3">
                      <h3 className="text-2xl font-bold text-foreground">
                        {reason.title}
                      </h3>

                      <p className="text-muted-foreground leading-relaxed">
                        {reason.description}
                      </p>

                      <div className="pt-2">
                        <div className="inline-flex items-baseline gap-2 bg-gradient-to-r from-primary/10 to-accent/10 px-4 py-2 rounded-lg border border-primary/20">
                          <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            {reason.stat}
                          </span>
                          <span className="text-sm text-muted-foreground font-medium">
                            {reason.statLabel}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-primary to-accent rounded-3xl p-12 text-center shadow-2xl">
          <h3 className="text-3xl font-bold text-primary-foreground mb-4">
            Join thousands of satisfied customers
          </h3>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            People across India trust LoanPal for their personal loan needs. Experience the difference today.
          </p>
          <div className="flex flex-wrap justify-center gap-12 text-primary-foreground">
            <div>
              <div className="text-4xl font-bold mb-1">50K+</div>
              <div className="text-primary-foreground/80">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-1">₹500Cr+</div>
              <div className="text-primary-foreground/80">Loans Disbursed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-1">15 mins</div>
              <div className="text-primary-foreground/80">Avg. Approval Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-1">4.8★</div>
              <div className="text-primary-foreground/80">User Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
