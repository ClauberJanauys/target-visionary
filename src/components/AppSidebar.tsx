import { BarChart2, FolderOpen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const location = useLocation();
  
  const items = [
    {
      title: "Análise",
      icon: BarChart2,
      href: "/",
    },
    {
      title: "Projetos",
      icon: FolderOpen,
      href: "/projects",
    },
  ];

  return (
    <div className="w-[240px] min-h-screen bg-card/50 backdrop-blur-sm border-r border-white/10 p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent">
          Dashboard
        </h1>
      </div>
      <nav className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
              location.pathname === item.href
                ? "bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 text-yellow-400 shadow-lg shadow-yellow-500/10 border border-yellow-500/30"
                : "hover:bg-white/5 text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}