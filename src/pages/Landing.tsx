import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3, Zap, Shield } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-[#1a1f2c] to-[#2d3748]">
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 font-mono">
            Análise Inteligente de Público-Alvo
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto font-mono">
            Transforme dados em insights acionáveis para otimizar suas estratégias de marketing e aumentar suas conversões.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link to="/login">
              <Button
                className="w-full sm:w-auto px-8 py-6 text-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 font-mono"
              >
                Começar Agora
              </Button>
            </Link>
            
            <Button
              variant="secondary"
              className="w-full sm:w-auto px-8 py-6 text-lg hover:bg-white/5 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 font-mono"
            >
              Ver Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 px-4 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-lg border border-white/10 bg-card/50 backdrop-blur-sm hover:border-blue-500/50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-mono">Análise Avançada</h3>
              <p className="text-muted-foreground font-mono">
                Insights detalhados sobre comportamento e preferências do seu público-alvo.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-lg border border-white/10 bg-card/50 backdrop-blur-sm hover:border-blue-500/50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-mono">Resultados Rápidos</h3>
              <p className="text-muted-foreground font-mono">
                Obtenha resultados em minutos, não em dias ou semanas.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-lg border border-white/10 bg-card/50 backdrop-blur-sm hover:border-blue-500/50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-mono">Dados Seguros</h3>
              <p className="text-muted-foreground font-mono">
                Segurança e privacidade em primeiro lugar, com criptografia de ponta a ponta.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-24 px-4 bg-gradient-to-b from-black/50 to-background">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-mono">Planos e Preços</h2>
            <p className="text-muted-foreground font-mono">
              Escolha o plano ideal para suas necessidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="p-6 rounded-lg border border-white/10 bg-card/50 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-200">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold font-mono">Starter</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold font-mono">R$ 49</span>
                  <span className="text-muted-foreground ml-2 font-mono">/mês</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                    </div>
                    <span className="font-mono">100 análises/mês</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                    </div>
                    <span className="font-mono">Relatórios básicos</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                    </div>
                    <span className="font-mono">Suporte por email</span>
                  </li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 font-mono">
                  Começar Agora
                </Button>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="p-6 rounded-lg border border-blue-500/50 bg-blue-900/20 backdrop-blur-sm transform scale-105 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500 text-white font-mono">
                  Mais Popular
                </span>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold font-mono">Pro</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold font-mono">R$ 99</span>
                  <span className="text-muted-foreground ml-2 font-mono">/mês</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                    </div>
                    <span className="font-mono">500 análises/mês</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                    </div>
                    <span className="font-mono">Relatórios avançados</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                    </div>
                    <span className="font-mono">Suporte prioritário</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                    </div>
                    <span className="font-mono">API access</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                    </div>
                    <span className="font-mono">Dashboard personalizado</span>
                  </li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 font-mono">
                  Começar Agora
                </Button>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="p-6 rounded-lg border border-white/10 bg-card/50 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-200">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold font-mono">Enterprise</h3>
                <div>
                  <span className="text-2xl font-bold font-mono">Personalizado</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                    </div>
                    <span className="font-mono">Análises ilimitadas</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                    </div>
                    <span className="font-mono">Relatórios customizados</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                    </div>
                    <span className="font-mono">Suporte 24/7</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                    </div>
                    <span className="font-mono">API dedicada</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                    </div>
                    <span className="font-mono">Onboarding VIP</span>
                  </li>
                </ul>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 font-mono">
                  Contatar Vendas
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}