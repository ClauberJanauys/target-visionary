import { useEffect, useState } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Coins, BarChart3, FolderKanban } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
    <div className="min-h-screen flex flex-col bg-pycharm-bg">
      <header className="border-b border-pycharm-border backdrop-blur-sm bg-pycharm-surface/90 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <nav className="flex items-center gap-6">
              <Link
                to="/app"
                className="flex items-center gap-2 text-sm font-medium text-pycharm-text hover:text-pycharm-accent transition-colors"
              >
                <BarChart3 className="w-4 h-4" />
                Análise
              </Link>
              
              <Link
                to="/app/projects"
                className="flex items-center gap-2 text-sm font-medium text-pycharm-text hover:text-pycharm-accent transition-colors"
              >
                <FolderKanban className="w-4 h-4" />
                Projetos
              </Link>
            </nav>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/20 hover:bg-yellow-500/30 transition-colors">
                    <Coins className="w-4 h-4 text-yellow-500/90" />
                    <span className="font-medium text-yellow-500/90">
                      {credits?.amount ?? 0}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Créditos disponíveis</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </header>
      
      <main className="flex-1 animate-fade-in max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}