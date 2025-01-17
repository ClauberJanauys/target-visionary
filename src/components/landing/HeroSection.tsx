import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-pycharm-bg to-pycharm-surface">
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-pycharm-text font-mono">
          Análise Inteligente de Público-Alvo
        </h1>
        
        <p className="text-lg sm:text-xl text-pycharm-text-dim max-w-2xl mx-auto font-mono">
          Transforme dados em insights acionáveis para otimizar suas estratégias de marketing e aumentar suas conversões.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link to="/login">
            <Button
              className="w-full sm:w-auto px-8 py-6 text-lg bg-pycharm-accent hover:bg-pycharm-accent-hover shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 font-mono"
            >
              Começar Agora
            </Button>
          </Link>
          
          <Button
            variant="secondary"
            className="w-full sm:w-auto px-8 py-6 text-lg bg-pycharm-surface hover:bg-pycharm-hover shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 font-mono"
          >
            Ver Demo
          </Button>
        </div>
      </div>
    </div>
  );
};