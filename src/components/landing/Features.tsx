import { Brain, Zap, Eye, FileCheck, Shield, MessageSquare } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Decisions',
    description: 'Advanced machine learning algorithms analyze your profile in seconds for accurate loan assessment',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    icon: Zap,
    title: 'Instant Eligibility Check',
    description: 'Know your chances instantly before applying. No impact on your credit score',
    gradient: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: Eye,
    title: 'Transparent Feedback',
    description: 'Clear explanations for approvals and rejections. Know exactly what factors influence your application',
    gradient: 'from-teal-500 to-teal-600',
  },
  {
    icon: FileCheck,
    title: 'Downloadable Sanction Letter',
    description: 'Get your official sanction letter instantly upon approval, ready to use',
    gradient: 'from-cyan-500 to-cyan-600',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Bank-grade encryption protects your data. We never share your information without consent',
    gradient: 'from-blue-600 to-teal-600',
  },
  {
    icon: MessageSquare,
    title: 'Chat-Based Experience',
    description: 'Friendly conversational interface makes applying for loans feel natural and easy',
    gradient: 'from-emerald-600 to-blue-600',
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Key Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to make your loan application experience seamless and stress-free
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-300/50 transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="flex flex-col space-y-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
