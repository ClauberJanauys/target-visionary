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
      const { data: projectsData, error: projectsError } = await supabase
        .from("projects")
        .select(`
          *,
          document_research (*),
          document_bigfive (*),
          document_eneagrama (*)
        `)
        .order("created_at", { ascending: false });

      console.log("Raw Supabase response:", projectsData);
      
      if (projectsError) {
        console.error("Projects query error:", projectsError);
        throw projectsError;
      }

      const processedProjects = projectsData.map(project => ({
        ...project,
        documents: {
          research: project.document_research?.[0] || null,
          bigfive: project.document_bigfive?.[0] || null,
          eneagrama: project.document_eneagrama?.[0] || null,
        },
      }));

      console.log("Processed projects:", processedProjects);
      return processedProjects as Project[];
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
                  disabled={!project.documents.research}
                >
                  <BookOpen className="w-5 h-5 mt-1 text-blue-500" />
                  <div className="text-left">
                    <p className="font-medium text-pycharm-text">Pesquisa</p>
                    <p className="text-sm text-pycharm-text-dim">
                      {project.documents.research ? "Clique para visualizar" : "Pendente"}
                    </p>
                  </div>
                </button>

                <button 
                  onClick={() => handleDocumentClick(project.documents.bigfive, "Big Five")}
                  className="w-full flex items-start gap-2 p-2 rounded-lg hover:bg-pycharm-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!project.documents.bigfive}
                >
                  <Brain className="w-5 h-5 mt-1 text-blue-500" />
                  <div className="text-left">
                    <p className="font-medium text-pycharm-text">Big Five</p>
                    <p className="text-sm text-pycharm-text-dim">
                      {project.documents.bigfive ? "Clique para visualizar" : "Pendente"}
                    </p>
                  </div>
                </button>

                <button 
                  onClick={() => handleDocumentClick(project.documents.eneagrama, "Eneagrama")}
                  className="w-full flex items-start gap-2 p-2 rounded-lg hover:bg-pycharm-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!project.documents.eneagrama}
                >
                  <User className="w-5 h-5 mt-1 text-blue-500" />
                  <div className="text-left">
                    <p className="font-medium text-pycharm-text">Eneagrama</p>
                    <p className="text-sm text-pycharm-text-dim">
                      {project.documents.eneagrama ? "Clique para visualizar" : "Pendente"}
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