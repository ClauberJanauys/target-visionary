import { Settings } from "lucide-react";
import { AppSidebar } from "./AppSidebar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <AppSidebar />
      <div className="flex-1">
        <header className="p-4 flex justify-end border-b border-border">
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Settings className="w-5 h-5" />
            <span className="sr-only">Créditos</span>
          </button>
        </header>
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}