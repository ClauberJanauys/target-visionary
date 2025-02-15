import { useQuery } from "@tanstack/react-query";
import { FileText, BookOpen, Brain, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import ReactMarkdown from 'react-markdown';
import { ScrollArea } from "@/components/ui/scroll-area";

type Document = {
  document_id: string;
  text: string;
  created_at: string;
  project_id: string;
} | null;

type Project = {
  project_id: string;
  created_at: string;
  status: string;
  documents: {
    research: Document;
    bigfive: Document;
    eneagrama: Document;
  };
};

type DocumentViewerProps = {
  isOpen: boolean;
  onClose: () => void;
  document?: Document | null;
  title: string;
};

const DocumentViewer = ({ isOpen, onClose, document, title }: DocumentViewerProps) => {
  if (!document) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] bg-pycharm-bg border-pycharm-border">
        <DialogHeader>
          <DialogTitle className="text-pycharm-text">{title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] w-full rounded-md border border-pycharm-border p-4">
          <ReactMarkdown className="prose prose-invert max-w-none text-pycharm-text">
            {document.text}
          </ReactMarkdown>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default function Projects() {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [documentTitle, setDocumentTitle] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      // 1. Fetch projects first
      const { data: projectsData, error: projectsError } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (projectsError) {
        console.error("Error fetching projects:", projectsError);
        throw projectsError;
      }

      console.log("Projects found:", projectsData);

      // 2. Fetch documents for each project
      const projectsWithDocs = await Promise.all(
        projectsData.map(async (project) => {
          console.log("Fetching documents for project:", project.project_id);

          // Fetch research document
          const { data: researchDocs, error: researchError } = await supabase
            .from("document_research")
            .select("*")
            .eq("project_id", project.project_id);

          if (researchError) console.error("Research doc error:", researchError);
          console.log("Research docs found:", researchDocs);

          // Fetch bigfive document
          const { data: bigfiveDocs, error: bigfiveError } = await supabase
            .from("document_bigfive")
            .select("*")
            .eq("project_id", project.project_id);

          if (bigfiveError) console.error("Big Five doc error:", bigfiveError);
          console.log("Big Five docs found:", bigfiveDocs);

          // Fetch eneagrama document
          const { data: eneagramaDocs, error: eneagramaError } = await supabase
            .from("document_eneagrama")
            .select("*")
            .eq("project_id", project.project_id);

          if (eneagramaError) console.error("Eneagrama doc error:", eneagramaError);
          console.log("Eneagrama docs found:", eneagramaDocs);

          return {
            ...project,
            documents: {
              research: researchDocs?.[0] || null,
              bigfive: bigfiveDocs?.[0] || null,
              eneagrama: eneagramaDocs?.[0] || null,
            },
          };
        })
      );

      console.log("Final projects with docs:", projectsWithDocs);
      return projectsWithDocs as Project[];
    },
  });

  const handleDocumentClick = (document: Document | null, title: string) => {
    if (!document) return;
    setSelectedDocument(document);
    setDocumentTitle(title);
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="p-8 bg-pycharm-bg rounded-lg shadow-lg border border-pycharm-border">
        <h1 className="text-2xl font-semibold mb-6 text-pycharm-text">Projetos</h1>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-pulse text-pycharm-text-dim">Carregando projetos...</div>
        </div>
      </div>
    );
  }

  if (!projects?.length) {
    return (
      <div className="p-8 bg-pycharm-bg rounded-lg shadow-lg border border-pycharm-border">
        <h1 className="text-2xl font-semibold mb-6 text-pycharm-text">Projetos</h1>
        <div className="flex flex-col items-center justify-center min-h-[400px] text-pycharm-text-dim">
          <FileText className="w-12 h-12 mb-4 opacity-50" />
          <p>Nenhum projeto encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-pycharm-bg rounded-lg shadow-lg border border-pycharm-border">
      <h1 className="text-2xl font-semibold mb-6 text-pycharm-text">Projetos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.project_id} className="bg-pycharm-surface border-pycharm-border hover:border-pycharm-accent transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-pycharm-text">
                <FileText className="w-5 h-5 text-blue-500" />
                Projeto
              </CardTitle>
              <CardDescription className="text-pycharm-text-dim">
                Criado em {format(new Date(project.created_at), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <button 
                  onClick={() => handleDocumentClick(project.documents.research, "Pesquisa")}
                  className="w-full flex items-start gap-2 p-2 rounded-lg hover:bg-pycharm-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!project.documents.research?.text}
                >
                  <BookOpen className="w-5 h-5 mt-1 text-blue-500" />
                  <div className="text-left">
                    <p className="font-medium text-pycharm-text">Pesquisa</p>
                    <p className="text-sm text-pycharm-text-dim">
                      {project.documents.research?.text ? "Clique para visualizar" : "Pendente"}
                    </p>
                  </div>
                </button>

                <button 
                  onClick={() => handleDocumentClick(project.documents.bigfive, "Big Five")}
                  className="w-full flex items-start gap-2 p-2 rounded-lg hover:bg-pycharm-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!project.documents.bigfive?.text}
                >
                  <Brain className="w-5 h-5 mt-1 text-blue-500" />
                  <div className="text-left">
                    <p className="font-medium text-pycharm-text">Big Five</p>
                    <p className="text-sm text-pycharm-text-dim">
                      {project.documents.bigfive?.text ? "Clique para visualizar" : "Pendente"}
                    </p>
                  </div>
                </button>

                <button 
                  onClick={() => handleDocumentClick(project.documents.eneagrama, "Eneagrama")}
                  className="w-full flex items-start gap-2 p-2 rounded-lg hover:bg-pycharm-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!project.documents.eneagrama?.text}
                >
                  <User className="w-5 h-5 mt-1 text-blue-500" />
                  <div className="text-left">
                    <p className="font-medium text-pycharm-text">Eneagrama</p>
                    <p className="text-sm text-pycharm-text-dim">
                      {project.documents.eneagrama?.text ? "Clique para visualizar" : "Pendente"}
                    </p>
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <DocumentViewer
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        document={selectedDocument}
        title={documentTitle}
      />
    </div>
  );
}