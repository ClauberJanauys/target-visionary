import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function Analysis() {
  const [targetAudience, setTargetAudience] = useState("");

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Nova Análise</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-lg mb-2">Informações do Público Alvo</h2>
          <Textarea
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            placeholder="Descreva detalhadamente o público alvo do seu projeto..."
            className="min-h-[200px] resize-none"
          />
        </div>
        
        <Button 
          className="w-full sm:w-auto"
          disabled={!targetAudience.trim()}
        >
          Iniciar análise
        </Button>
      </div>
    </div>
  );
}