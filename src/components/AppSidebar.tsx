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
    <div className="w-[240px] min-h-screen bg-card border-r border-border p-4">
      <nav className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              location.pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent hover:text-accent-foreground"
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