import { FileText } from "lucide-react";

export default function Projects() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">Projetos</h1>
      
      <div className="flex flex-col items-center justify-center min-h-[400px] text-muted-foreground">
        <FileText className="w-12 h-12 mb-4" />
        <p>Nenhum projeto encontrado</p>
      </div>
    </div>
  );
}