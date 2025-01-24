import { useQuery } from "@tanstack/react-query";
import { FileText, BookOpen, Brain, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type Document = {
  document_id: string;
  text: string;
  created_at: string;
};

type Project = {
  project_id: string;
  created_at: string;
  status: string;
  documents: {
    research?: Document;
    bigfive?: Document;
    eneagrama?: Document;
  };
};

export default function Projects() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      // Buscar projetos do usuário
      const { data: projectsData, error: projectsError } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (projectsError) throw projectsError;

      // Para cada projeto, buscar os documentos relacionados
      const projectsWithDocs = await Promise.all(
        projectsData.map(async (project) => {
          const [researchDoc, bigfiveDoc, eneagramaDoc] = await Promise.all([
            supabase
              .from("document_research")
              .select("*")
              .eq("project_id", project.project_id)
              .maybeSingle(),
            supabase
              .from("document_bigfive")
              .select("*")
              .eq("project_id", project.project_id)
              .maybeSingle(),
            supabase
              .from("document_eneagrama")
              .select("*")
              .eq("project_id", project.project_id)
              .maybeSingle(),
          ]);

          return {
            ...project,
            documents: {
              research: researchDoc.data,
              bigfive: bigfiveDoc.data,
              eneagrama: eneagramaDoc.data,
            },
          };
        })
      );

      return projectsWithDocs as Project[];
    },
  });

  if (isLoading) {
    return (
      <div className="p-8 bg-pycharm-surface/20 rounded-lg shadow-lg border border-pycharm-border">
        <h1 className="text-2xl font-semibold mb-6 text-pycharm-text">Projetos</h1>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-pulse text-pycharm-text">Carregando projetos...</div>
        </div>
      </div>
    );
  }

  if (!projects?.length) {
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

  return (
    <div className="p-8 bg-pycharm-surface/20 rounded-lg shadow-lg border border-pycharm-border">
      <h1 className="text-2xl font-semibold mb-6 text-pycharm-text">Projetos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.project_id} className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Projeto
              </CardTitle>
              <CardDescription>
                Criado em {format(new Date(project.created_at), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <BookOpen className="w-5 h-5 mt-1 text-blue-500" />
                  <div>
                    <p className="font-medium">Pesquisa</p>
                    <p className="text-sm text-gray-500">
                      {project.documents.research ? "Documento criado" : "Pendente"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Brain className="w-5 h-5 mt-1 text-purple-500" />
                  <div>
                    <p className="font-medium">Big Five</p>
                    <p className="text-sm text-gray-500">
                      {project.documents.bigfive ? "Documento criado" : "Pendente"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <User className="w-5 h-5 mt-1 text-green-500" />
                  <div>
                    <p className="font-medium">Eneagrama</p>
                    <p className="text-sm text-gray-500">
                      {project.documents.eneagrama ? "Documento criado" : "Pendente"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}