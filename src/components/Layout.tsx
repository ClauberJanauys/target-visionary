import { Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { supabase } from "@/integrations/supabase/client";

export function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [credits, setCredits] = useState<number>(0);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      const { data: creditsData } = await supabase
        .from("credits")
        .select("amount")
        .eq("id", session.user.id)
        .single();

      if (creditsData) {
        setCredits(creditsData.amount);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen flex">
      <AppSidebar />
      <div className="flex-1">
        <header className="p-4 flex justify-end items-center gap-4 border-b border-border">
          <span className="text-yellow-500 font-medium">{credits} credits</span>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Settings className="w-5 h-5" />
            <span className="sr-only">Settings</span>
          </button>
        </header>
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}