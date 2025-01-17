import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3, Zap, Shield } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-pycharm-bg text-pycharm-text">
      {/* Hero Section */}
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

      {/* Features Section */}
      <div className="py-24 px-4 bg-pycharm-surface/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-lg border border-pycharm-border bg-pycharm-surface/50 backdrop-blur-sm hover:border-pycharm-accent/50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-pycharm-accent/20 flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-pycharm-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-mono">Análise Avançada</h3>
              <p className="text-pycharm-text-dim font-mono">
                Insights detalhados sobre comportamento e preferências do seu público-alvo.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-lg border border-pycharm-border bg-pycharm-surface/50 backdrop-blur-sm hover:border-pycharm-accent/50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-pycharm-accent/20 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-pycharm-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-mono">Resultados Rápidos</h3>
              <p className="text-pycharm-text-dim font-mono">
                Obtenha resultados em minutos, não em dias ou semanas.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-lg border border-pycharm-border bg-pycharm-surface/50 backdrop-blur-sm hover:border-pycharm-accent/50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-pycharm-accent/20 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-pycharm-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-mono">Dados Seguros</h3>
              <p className="text-pycharm-text-dim font-mono">
                Segurança e privacidade em primeiro lugar, com criptografia de ponta a ponta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}