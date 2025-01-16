import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
          Target Vision AI
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Potencialize suas análises de público-alvo com inteligência artificial avançada.
          Descubra insights valiosos e tome decisões mais precisas.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link to="/login">
            <Button
              className="w-full sm:w-auto px-8 py-6 text-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Começar agora
            </Button>
          </Link>
          
          <Link to="/signup">
            <Button
              variant="outline"
              className="w-full sm:w-auto px-8 py-6 text-lg border-2 hover:bg-white/5 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Criar conta
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}