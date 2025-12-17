import { Shield, Lock, FileCheck, Award, Users, Landmark } from 'lucide-react';

const trustBadges = [
  {
    icon: Shield,
    title: 'RBI Compliant',
    description: 'Fully compliant with Reserve Bank of India regulations',
  },
  {
    icon: Lock,
    title: '256-bit Encryption',
    description: 'Bank-grade security for all your data',
  },
  {
    icon: FileCheck,
    title: 'Secure Processing',
    description: 'ISO 27001 certified data centers',
  },
  {
    icon: Award,
    title: 'Industry Certified',
    description: 'Recognized by leading fintech bodies',
  },
  {
    icon: Users,
    title: 'Trusted by 50K+',
    description: 'Growing community of satisfied users',
  },
  {
    icon: Landmark,
    title: 'Partner Banks',
    description: 'Partnered with top Indian banks',
  },
];

export default function Trust() {
  return (
    <section className="py-20 bg-gradient-to-b from-secondary/50 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Your Trust is Our Priority
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Security & Credibility
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We take your privacy and security seriously. Your data is protected with industry-leading security measures.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {trustBadges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 bg-card rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-border"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">
                    {badge.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-12 flex flex-col justify-center">
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Your Data, Your Control
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                  </div>
                  <p className="leading-relaxed">
                    <strong className="text-foreground">End-to-end encryption</strong> ensures your data is never exposed during transmission
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                  </div>
                  <p className="leading-relaxed">
                    <strong className="text-foreground">No data sharing</strong> with third parties without your explicit consent
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                  </div>
                  <p className="leading-relaxed">
                    <strong className="text-foreground">Regular security audits</strong> by independent cybersecurity firms
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                  </div>
                  <p className="leading-relaxed">
                    <strong className="text-foreground">GDPR compliant</strong> data handling and storage practices
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-accent/10 to-primary/10 p-12 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent to-primary rounded-3xl rotate-6 opacity-20"></div>
                <div className="relative bg-card rounded-3xl shadow-2xl p-8 border border-border">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                    <Shield className="w-16 h-16 text-primary-foreground" />
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-foreground mb-2">100%</div>
                    <div className="text-muted-foreground font-medium">Secure & Protected</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
