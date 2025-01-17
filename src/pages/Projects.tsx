import { FileText } from "lucide-react";

export default function Projects() {
  return (
    <div className="p-8 bg-pycharm-surface/20 rounded-lg shadow-lg border border-pycharm-border">
      <h1 className="text-2xl font-semibold mb-6 text-pycharm-text">Projetos</h1>
      
      <div className="flex flex-col items-center justify-center min-h-[400px] text-pycharm-text-dim">
        <FileText className="w-12 h-12 mb-4 opacity-50" />
        <p>Nenhum projeto encontrado</p>
      </div>
    </div>
  );
}