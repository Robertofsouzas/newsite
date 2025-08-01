import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BarChart3, GitBranch, Brain, Puzzle, ArrowRight, ExternalLink, Loader2 } from "lucide-react";

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
  const [iframeLoading, setIframeLoading] = useState(true);

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
    setIframeLoading(true);
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
                  className="portfolio-card group overflow-hidden transition-all duration-300 animate-slide-up border-0 bg-gradient-to-br from-white to-muted/20 cursor-pointer relative"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleProjectClick(project)}
                >
                  {/* Interactive Badge */}
                  {project.powerbiUrl && (
                    <div className="absolute top-3 right-3 z-10">
                      <Badge className="bg-green-500 text-white shadow-md">
                        <BarChart3 className="h-3 w-3 mr-1" />
                        Interativo
                      </Badge>
                    </div>
                  )}
                  
                  {project.imageUrl && (
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Overlay gradient for better text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  )}
                  
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-primary text-primary-foreground">
                        <BarChart3 className="h-3 w-3 mr-1" />
                        Power BI
                      </Badge>
                      {project.technologies && project.technologies.length > 0 && (
                        <span className="text-xs text-muted-foreground">
                          +{project.technologies.length} tecnologias
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <Button
                        variant="link"
                        className="p-0 h-auto font-medium text-primary hover:text-primary/80 group-hover:translate-x-1 transition-transform"
                      >
                        {project.powerbiUrl ? 'Ver Dashboard' : 'Ver Projeto'}
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                      
                                             {project.powerbiUrl && (
                         <div className="flex items-center text-xs text-green-600 font-medium">
                           <div className="w-2 h-2 bg-green-500 rounded-full mr-2 pulse-green" />
                           Dashboard Ativo
                         </div>
                       )}
                    </div>
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
          <DialogContent className={`${selectedProject?.type === 'powerbi' && selectedProject?.powerbiUrl ? 'max-w-[95vw] max-h-[95vh]' : 'max-w-4xl max-h-[90vh]'} overflow-hidden`}>
            <DialogHeader className="pb-4">
              <DialogTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {selectedProject && (
                    <>
                      {(() => {
                        const Icon = getTypeIcon(selectedProject.type);
                        return <Icon className="h-6 w-6 text-primary" />;
                      })()}
                      {selectedProject.title}
                    </>
                  )}
                </div>
                {/* Power BI External Link Button */}
                {selectedProject?.type === 'powerbi' && selectedProject?.powerbiUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(selectedProject.powerbiUrl, '_blank')}
                    className="ml-2"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Abrir em Nova Aba
                  </Button>
                )}
              </DialogTitle>
            </DialogHeader>

            {selectedProject && (
              <div className={`${selectedProject.type === 'powerbi' && selectedProject.powerbiUrl ? 'h-full flex flex-col' : 'space-y-6 overflow-y-auto'}`}>
                
                {/* Power BI Dashboard - Layout Especial */}
                {selectedProject.type === 'powerbi' && selectedProject.powerbiUrl ? (
                  <div className="flex-1 flex flex-col min-h-0">
                    {/* Informações do Projeto - Compacta */}
                    <div className="flex-shrink-0 mb-4 p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getTypeBadge(selectedProject.type).color}>
                              {getTypeBadge(selectedProject.type).text}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {selectedProject.description}
                          </p>
                          {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {selectedProject.technologies.map((tech, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        {selectedProject.imageUrl && (
                          <div className="flex-shrink-0 w-32 h-20 rounded-lg overflow-hidden">
                            <img
                              src={selectedProject.imageUrl}
                              alt={selectedProject.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                                         {/* Dashboard Interativo - Área Principal */}
                     <div className="flex-1 min-h-0">
                       <div className="h-full powerbi-iframe-container relative">
                         {/* Loading State */}
                         {iframeLoading && (
                           <div className="absolute inset-0 bg-white flex items-center justify-center z-10">
                             <div className="flex flex-col items-center gap-3">
                               <Loader2 className="h-8 w-8 animate-spin text-primary" />
                               <p className="text-sm text-muted-foreground">Carregando dashboard...</p>
                             </div>
                           </div>
                         )}
                         
                         <iframe
                           title={selectedProject.title}
                           width="100%"
                           height="100%"
                           src={selectedProject.powerbiUrl}
                           frameBorder="0"
                           allowFullScreen
                           className="w-full h-full"
                           style={{ minHeight: '600px' }}
                           onLoad={() => setIframeLoading(false)}
                           onError={() => setIframeLoading(false)}
                         />
                       </div>
                     </div>

                    {/* Benefícios - Opcional e Compacto */}
                    {selectedProject.benefits && (
                      <div className="flex-shrink-0 mt-4 p-3 bg-muted/30 rounded-lg">
                        <h5 className="text-sm font-semibold mb-2 text-foreground">Principais Benefícios:</h5>
                        <div className="text-xs text-muted-foreground">
                          <pre className="whitespace-pre-line font-sans leading-relaxed">
                            {selectedProject.benefits}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Layout Padrão para Outros Projetos */
                  <div className="space-y-6 overflow-y-auto">
                    {/* Badge */}
                    <div>
                      <Badge className={getTypeBadge(selectedProject.type).color}>
                        {getTypeBadge(selectedProject.type).text}
                      </Badge>
                    </div>

                    {/* Image for non-Power BI projects */}
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