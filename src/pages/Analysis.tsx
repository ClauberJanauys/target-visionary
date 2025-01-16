import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function Analysis() {
  const [targetAudience, setTargetAudience] = useState("");

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-pycharm-text">Nova Análise</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-lg mb-2 text-pycharm-text">Informações do Público Alvo</h2>
          <Textarea
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            placeholder="Descreva detalhadamente o público alvo do seu projeto..."
            className="min-h-[200px] resize-none bg-pycharm-surface border-pycharm-border text-pycharm-text placeholder:text-pycharm-text-dim"
          />
        </div>
        
        <Button 
          className="w-full sm:w-auto bg-pycharm-accent hover:bg-pycharm-accent-hover text-pycharm-text"
          disabled={!targetAudience.trim()}
        >
          Iniciar análise
        </Button>
      </div>
    </div>
  );
}