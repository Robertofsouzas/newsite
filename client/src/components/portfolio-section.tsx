import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BarChart3, GitBranch, Brain, Puzzle, ArrowRight, ExternalLink } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  type: 'powerbi' | 'n8n' | 'ai';
  benefits?: string;
  powerbiUrl?: string;
  imageUrl?: string;
  technologies?: string[];
  isActive: boolean;
  featured: boolean;
}

export default function PortfolioSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Buscar projetos ativos do banco de dados
  const { data: projectsData = [], isLoading } = useQuery({
    queryKey: ["/api/projects/active"],
    queryFn: async () => {
      const res = await fetch("/api/projects/active");
      return res.json();
    },
  });

  // Garante que projects seja sempre um array
  const projects = Array.isArray(projectsData)
    ? projectsData
    : projectsData.projects || projectsData.data || [];

  // Separar projetos por tipo
  const powerBIProjects = projects.filter((project: Project) => project.type === 'powerbi');

  // Projetos estáticos para serviços (quando não há projetos específicos no banco)
  const staticServices = [
    {
      id: 'n8n-service',
      icon: GitBranch,
      title: "Automação N8N",
      description: "Workflows automatizados para captura de leads, nutrição e integração com sistemas de vendas.",
      badge: "N8N",
      badgeColor: "bg-secondary text-secondary-foreground",
      gradient: "from-secondary to-accent",
      type: 'n8n' as const,
    },
    {
      id: 'ai-service',
      icon: Brain,
      title: "Agentes de IA",
      description: "Agentes inteligentes que monitoram padrões e otimizam automaticamente processos de negócio.",
      badge: "Agente IA",
      badgeColor: "bg-accent text-accent-foreground",
      gradient: "from-secondary to-primary",
      type: 'ai' as const,
    },
    {
      id: 'integration-service',
      icon: Puzzle,
      title: "Integração de Sistemas",
      description: "Conexão entre ERP, CRM e plataformas de e-commerce com sincronização em tempo real.",
      badge: "Integração",
      badgeColor: "bg-primary text-primary-foreground",
      gradient: "from-accent to-secondary",
      type: 'integration' as const,
    },
  ];

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  const handleServiceClick = (service: any) => {
    // Para serviços estáticos, mostrar informações gerais
    const serviceInfo = {
      id: service.id,
      title: service.title,
      description: service.description,
      type: service.type,
      benefits: getServiceBenefits(service.type),
    };
    setSelectedProject(serviceInfo as Project);
    setIsDialogOpen(true);
  };

  const getServiceBenefits = (type: string) => {
    switch (type) {
      case 'n8n':
        return "• Redução de 70% no tempo de processos manuais\n• Integração automática entre sistemas\n• Workflows personalizados para sua empresa\n• Monitoramento em tempo real";
      case 'ai':
        return "• Disponibilidade 24/7 sem interrupções\n• Aprendizado contínuo e melhoria automática\n• Decisões baseadas em dados objetivos\n• Escalabilidade ilimitada";
      case 'integration':
        return "• Sincronização de dados em tempo real\n• Eliminação de trabalho duplicado\n• Visão unificada de todos os sistemas\n• Redução de erros manuais";
      default:
        return "";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'powerbi': return BarChart3;
      case 'n8n': return GitBranch;
      case 'ai': return Brain;
      default: return Puzzle;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'powerbi': return { text: 'Power BI', color: 'bg-primary text-primary-foreground' };
      case 'n8n': return { text: 'N8N', color: 'bg-secondary text-secondary-foreground' };
      case 'ai': return { text: 'Agente IA', color: 'bg-accent text-accent-foreground' };
      default: return { text: 'Integração', color: 'bg-primary text-primary-foreground' };
    }
  };

  if (isLoading) {
    return (
      <section id="portfolio" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando projetos...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Portfólio de Projetos
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Conheça alguns dos projetos que desenvolvemos para nossos clientes
          </p>
        </div>

        {/* Power BI Projects */}
        {powerBIProjects.length > 0 && (
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Dashboards Power BI
          </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {powerBIProjects.map((project: Project, index: number) => (
                <Card
                  key={project.id}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-slide-up border-0 bg-muted/30 cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleProjectClick(project)}
                >
                  {project.imageUrl && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                  </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <Badge className="bg-primary text-primary-foreground">
                        Power BI
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <Button
                      variant="link"
                      className="p-0 h-auto font-medium text-primary hover:text-primary/80"
                    >
                      Ver Projeto
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Other Services */}
        <div>
          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Automação & Inteligência Artificial
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {staticServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={service.id}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-slide-up border-0 bg-muted/30 cursor-pointer"
                  style={{ animationDelay: `${(index + powerBIProjects.length) * 0.1}s` }}
                  onClick={() => handleServiceClick(service)}
                >
                  <div className={`h-48 bg-gradient-to-br ${service.gradient} flex items-center justify-center`}>
                    <Icon className="h-12 w-12 text-white" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <Badge className={service.badgeColor}>
                        {service.badge}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {service.description}
                    </p>
                    <Button
                      variant="link"
                      className="p-0 h-auto font-medium text-primary hover:text-primary/80"
                    >
                      Ver Detalhes
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Project Details Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                {selectedProject && (
                  <>
                    {(() => {
                      const Icon = getTypeIcon(selectedProject.type);
                      return <Icon className="h-6 w-6 text-primary" />;
                    })()}
                    {selectedProject.title}
                  </>
                )}
              </DialogTitle>
            </DialogHeader>

            {selectedProject && (
              <div className="space-y-6">
                {/* Badge */}
                <div>
                  <Badge className={getTypeBadge(selectedProject.type).color}>
                    {getTypeBadge(selectedProject.type).text}
                  </Badge>
                </div>

                {/* Image for Power BI projects */}
                {selectedProject.imageUrl && (
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src={selectedProject.imageUrl}
                      alt={selectedProject.title}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                )}

                {/* Description */}
                <div>
                  <h4 className="text-lg font-semibold mb-2">Descrição</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Benefits */}
                {selectedProject.benefits && (
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Benefícios</h4>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <pre className="text-sm text-muted-foreground whitespace-pre-line font-sans">
                        {selectedProject.benefits}
                      </pre>
                    </div>
                  </div>
                )}

                {/* Technologies */}
                {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Tecnologias</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <Badge key={index} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Power BI Interactive Link */}
                {selectedProject.type === 'powerbi' && selectedProject.powerbiUrl && (
                  <div className="border-t pt-6">
                    <h4 className="text-lg font-semibold mb-2">Dashboard Interativo</h4>
                    <div className="w-full" style={{ minHeight: 400 }}>
                      <iframe
                        title={selectedProject.title}
                        width="100%"
                        height="400"
                        src={selectedProject.powerbiUrl}
                        frameBorder="0"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}