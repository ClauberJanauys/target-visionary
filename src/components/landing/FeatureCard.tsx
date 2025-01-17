import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <div className="p-6 rounded-lg border border-pycharm-border bg-pycharm-surface/50 backdrop-blur-sm hover:border-pycharm-accent/50 transition-colors">
      <div className="w-12 h-12 rounded-full bg-pycharm-accent/20 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-pycharm-accent" />
      </div>
      <h3 className="text-xl font-semibold mb-2 font-mono">{title}</h3>
      <p className="text-pycharm-text-dim font-mono">{description}</p>
    </div>
  );
};