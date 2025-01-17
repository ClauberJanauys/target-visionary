import { BarChart3, Zap, Shield } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

export const FeaturesSection = () => {
  const features = [
    {
      icon: BarChart3,
      title: "Análise Avançada",
      description: "Insights detalhados sobre comportamento e preferências do seu público-alvo.",
    },
    {
      icon: Zap,
      title: "Resultados Rápidos",
      description: "Obtenha resultados em minutos, não em dias ou semanas.",
    },
    {
      icon: Shield,
      title: "Dados Seguros",
      description: "Segurança e privacidade em primeiro lugar, com criptografia de ponta a ponta.",
    },
  ];

  return (
    <div className="py-24 px-4 bg-pycharm-surface/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
};