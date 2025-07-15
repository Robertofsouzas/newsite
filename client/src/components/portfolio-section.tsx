import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, GitBranch, PieChart, Bot, Brain, Puzzle, ArrowRight } from "lucide-react";

export default function PortfolioSection() {
  const powerBIProjects = [
    {
      icon: BarChart3,
      title: "Dashboard de Vendas",
      description: "Painel executivo com métricas de vendas, análise de performance e previsões de receita.",
      badge: "Power BI",
      badgeColor: "bg-primary text-primary-foreground",
      gradient: "from-primary to-secondary",
    },
    {
      icon: PieChart,
      title: "Análise Financeira",
      description: "Dashboard financeiro com controle de custos, análise de rentabilidade e fluxo de caixa.",
      badge: "Power BI",
      badgeColor: "bg-primary text-primary-foreground",
      gradient: "from-accent to-primary",
    },
  ];

  const otherProjects = [
    {
      icon: GitBranch,
      title: "Automação de CRM",
      description: "Workflow automatizado para captura de leads, nutrição e integração com sistema de vendas.",
      badge: "N8N",
      badgeColor: "bg-secondary text-secondary-foreground",
      gradient: "from-secondary to-accent",
    },
    {
      icon: Brain,
      title: "Agente de IA Preditivo",
      description: "Agente inteligente que monitora padrões de demanda e otimiza automaticamente níveis de estoque.",
      badge: "Agente IA",
      badgeColor: "bg-accent text-accent-foreground",
      gradient: "from-secondary to-primary",
    },
    {
      icon: Puzzle,
      title: "Integração de Sistemas",
      description: "Conexão entre ERP, CRM e plataformas de e-commerce com sincronização em tempo real.",
      badge: "Integração",
      badgeColor: "bg-primary text-primary-foreground",
      gradient: "from-accent to-secondary",
    },
  ];

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
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Dashboards Power BI
          </h3>
          <div className="grid md:grid-cols-2 gap-8 justify-center">
            {powerBIProjects.map((project, index) => {
              const Icon = project.icon;
              return (
                <Card
                  key={project.title}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-slide-up border-0 bg-muted/30"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                    <Icon className="h-12 w-12 text-white" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <Badge className={project.badgeColor}>
                        {project.badge}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
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
              );
            })}
          </div>
        </div>

        {/* Other Projects */}
        <div>
          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Automação & Inteligência Artificial
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {otherProjects.map((project, index) => {
              const Icon = project.icon;
              return (
                <Card
                  key={project.title}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-slide-up border-0 bg-muted/30"
                  style={{ animationDelay: `${(index + 2) * 0.1}s` }}
                >
                  <div className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                    <Icon className="h-12 w-12 text-white" />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <Badge className={project.badgeColor}>
                        {project.badge}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
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
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
