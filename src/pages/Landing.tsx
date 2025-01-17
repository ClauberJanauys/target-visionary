import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";

export default function Landing() {
  return (
    <div className="min-h-screen bg-pycharm-bg text-pycharm-text">
      <HeroSection />
      <FeaturesSection />
    </div>
  );
}