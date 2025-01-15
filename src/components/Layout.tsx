import { Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

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
    <div className="min-h-screen flex">
      <AppSidebar />
      <div className="flex-1">
        <header className="p-4 flex justify-end items-center gap-4 border-b border-border">
          <span className="text-yellow-500 font-medium">{credits?.amount ?? 0} credits</span>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Settings className="w-5 h-5" />
            <span className="sr-only">Settings</span>
          </button>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}