import { Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Coins } from "lucide-react";

export function Layout() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }
      setUserId(session.user.id);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const { data: credits } = useQuery({
    queryKey: ['credits', userId],
    queryFn: async () => {
      if (!userId) return null;
      const { data, error } = await supabase
        .from('credits')
        .select('amount')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!userId
  });

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#1a1f2c] to-[#2d3748]">
      <AppSidebar />
      <div className="flex-1">
        <header className="p-4 flex justify-end items-center gap-4 border-b border-white/10 backdrop-blur-sm bg-card/30">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border border-yellow-500/30">
            <Coins className="w-5 h-5 text-yellow-400" />
            <span className="font-medium text-yellow-400">
              {credits?.amount ?? 0} créditos
            </span>
          </div>
          <button className="text-muted-foreground hover:text-yellow-400 transition-colors p-2 rounded-full hover:bg-white/5">
            <Settings className="w-5 h-5" />
            <span className="sr-only">Settings</span>
          </button>
        </header>
        <main className="animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}