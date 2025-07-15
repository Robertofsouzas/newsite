import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Settings, Brain, Check } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      icon: BarChart3,
      title: "Análise de Dados",
      description: "Dashboards Power BI interativos, relatórios automatizados e insights estratégicos para tomada de decisões baseadas em dados.",
      features: ["Dashboards Power BI", "Modelagem de Dados", "Relatórios Automatizados"],
      color: "primary",
    },
    {
      icon: Settings,
      title: "Automação",
      description: "Workflows N8N personalizados para automatizar processos repetitivos e integrar sistemas de forma eficiente.",
      features: ["Workflows N8N", "Integração de APIs", "Automação de Processos"],
      color: "secondary",
    },
    {
      icon: Brain,
      title: "Inteligência Artificial",
      description: "Implementação de soluções de IA para otimização de processos, análise preditiva e tomada de decisões inteligentes.",
      features: ["Machine Learning", "Análise Preditiva", "Processamento de Linguagem"],
      color: "accent",
    },
  ];

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Nossos Serviços
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Oferecemos soluções completas em tecnologia para transformar sua operação
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.title}
                className="hover:shadow-lg transition-all duration-300 animate-slide-up border-0 bg-white"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-8">
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-6 ${
                    service.color === "primary" ? "bg-primary/10" :
                    service.color === "secondary" ? "bg-secondary/10" :
                    "bg-accent/10"
                  }`}>
                    <Icon className={`h-8 w-8 ${
                      service.color === "primary" ? "text-primary" :
                      service.color === "secondary" ? "text-secondary" :
                      "text-accent"
                    }`} />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-muted-foreground">
                        <Check className={`h-4 w-4 mr-2 ${
                          service.color === "primary" ? "text-primary" :
                          service.color === "secondary" ? "text-secondary" :
                          "text-accent"
                        }`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
