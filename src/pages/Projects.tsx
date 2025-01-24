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

type DocumentViewerProps = {
  isOpen: boolean;
  onClose: () => void;
  document?: Document;
  title: string;
};

const DocumentViewer = ({ isOpen, onClose, document, title }: DocumentViewerProps) => {
  if (!document) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] bg-white">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
          <ReactMarkdown className="prose prose-purple max-w-none">
            {document.text}
          </ReactMarkdown>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default function Projects() {
  const [selectedDocument, setSelectedDocument] = useState<Document | undefined>();
  const [documentTitle, setDocumentTitle] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data: projectsData, error: projectsError } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (projectsError) throw projectsError;

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

  const handleDocumentClick = (document: Document | undefined, title: string) => {
    if (document) {
      setSelectedDocument(document);
      setDocumentTitle(title);
      setIsDialogOpen(true);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 bg-[#1A1F2C]/5 rounded-lg shadow-lg border border-[#9b87f5]/20">
        <h1 className="text-2xl font-semibold mb-6 text-[#1A1F2C]">Projetos</h1>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-pulse text-[#8E9196]">Carregando projetos...</div>
        </div>
      </div>
    );
  }

  if (!projects?.length) {
    return (
      <div className="p-8 bg-[#1A1F2C]/5 rounded-lg shadow-lg border border-[#9b87f5]/20">
        <h1 className="text-2xl font-semibold mb-6 text-[#1A1F2C]">Projetos</h1>
        <div className="flex flex-col items-center justify-center min-h-[400px] text-[#8E9196]">
          <FileText className="w-12 h-12 mb-4 opacity-50" />
          <p>Nenhum projeto encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-[#1A1F2C]/5 rounded-lg shadow-lg border border-[#9b87f5]/20">
      <h1 className="text-2xl font-semibold mb-6 text-[#1A1F2C]">Projetos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.project_id} className="bg-white border-[#9b87f5]/20 hover:border-[#9b87f5]/40 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#1A1F2C]">
                <FileText className="w-5 h-5 text-[#9b87f5]" />
                Projeto
              </CardTitle>
              <CardDescription>
                Criado em {format(new Date(project.created_at), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <button 
                  onClick={() => handleDocumentClick(project.documents.research, "Pesquisa")}
                  className="w-full flex items-start gap-2 p-2 rounded-lg hover:bg-[#9b87f5]/5 transition-colors"
                >
                  <BookOpen className="w-5 h-5 mt-1 text-[#9b87f5]" />
                  <div className="text-left">
                    <p className="font-medium text-[#1A1F2C]">Pesquisa</p>
                    <p className="text-sm text-[#8E9196]">
                      {project.documents.research ? "Clique para visualizar" : "Pendente"}
                    </p>
                  </div>
                </button>

                <button 
                  onClick={() => handleDocumentClick(project.documents.bigfive, "Big Five")}
                  className="w-full flex items-start gap-2 p-2 rounded-lg hover:bg-[#9b87f5]/5 transition-colors"
                >
                  <Brain className="w-5 h-5 mt-1 text-[#7E69AB]" />
                  <div className="text-left">
                    <p className="font-medium text-[#1A1F2C]">Big Five</p>
                    <p className="text-sm text-[#8E9196]">
                      {project.documents.bigfive ? "Clique para visualizar" : "Pendente"}
                    </p>
                  </div>
                </button>

                <button 
                  onClick={() => handleDocumentClick(project.documents.eneagrama, "Eneagrama")}
                  className="w-full flex items-start gap-2 p-2 rounded-lg hover:bg-[#9b87f5]/5 transition-colors"
                >
                  <User className="w-5 h-5 mt-1 text-[#D6BCFA]" />
                  <div className="text-left">
                    <p className="font-medium text-[#1A1F2C]">Eneagrama</p>
                    <p className="text-sm text-[#8E9196]">
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