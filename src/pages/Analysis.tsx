import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export default function Analysis() {
  const [targetAudience, setTargetAudience] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAnalysis = async () => {
    if (!targetAudience.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, descreva o público alvo do seu projeto.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // 1. Check and deduct credits
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user?.id;
      
      if (!userId) {
        throw new Error("Usuário não autenticado");
      }

      const { data: credits, error: creditsError } = await supabase
        .from("credits")
        .select("amount")
        .eq("id", userId)
        .single();

      if (creditsError) throw creditsError;

      if (!credits || credits.amount < 1) {
        toast({
          title: "Créditos insuficientes",
          description: "Você precisa de créditos para realizar uma análise.",
          variant: "destructive",
        });
        return;
      }

      // Deduct 1 credit
      const { error: updateError } = await supabase
        .from("credits")
        .update({ amount: credits.amount - 1 })
        .eq("id", userId);

      if (updateError) throw updateError;

      // 2. Create project
      const { data: project, error: projectError } = await supabase
        .from("projects")
        .insert({
          user_id: userId,
          status: "pending"
        })
        .select()
        .single();

      if (projectError) throw projectError;

      // 3. Send to webhook
      const webhookUrl = "https://n8n.clauberj.com/webhook-test/85c6d2e9-9a03-48e8-af85-b65195da4dff";
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project_id: project.project_id,
          message: targetAudience
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar dados para análise");
      }

      toast({
        title: "Sucesso!",
        description: "Sua análise foi iniciada com sucesso.",
      });

      // Clear the textarea after successful submission
      setTargetAudience("");
      
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao iniciar a análise. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
          disabled={!targetAudience.trim() || isLoading}
          onClick={handleAnalysis}
        >
          {isLoading ? "Iniciando análise..." : "Iniciar análise"}
        </Button>
      </div>
    </div>
  );
}