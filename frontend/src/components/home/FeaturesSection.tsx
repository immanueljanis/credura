import { Shield, Gift, Zap, Globe, Users, Award } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Blockchain Verified",
      description:
        "All certificates and achievements are stored on-chain for permanent verification",
      color: "bg-[#58CC02]",
    },
    {
      icon: Gift,
      title: "Earn While Learning",
      description: "Get rewarded with tokens and NFTs for completing courses and quizzes",
      color: "bg-[#FF6F61]",
    },
    {
      icon: Zap,
      title: "Interactive Learning",
      description: "Hands-on projects and real-world applications to reinforce your knowledge",
      color: "bg-[#4E6C50]",
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Connect with thousands of learners and instructors from around the world",
      color: "bg-[#58CC02]",
    },
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Learn from industry professionals and blockchain pioneers",
      color: "bg-[#FF6F61]",
    },
    {
      icon: Award,
      title: "Career Ready",
      description: "Build a portfolio of projects and skills that employers are looking for",
      color: "bg-[#4E6C50]",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Credura?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of education with blockchain-powered learning that rewards your
            progress
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="card group hover:scale-105 transition-transform duration-200"
              >
                <div
                  className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
