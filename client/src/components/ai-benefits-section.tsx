import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, Zap, Shield, Brain, Users } from "lucide-react";

export default function AIBenefitsSection() {
  const benefits = [
    {
      icon: Clock,
      title: "Disponibilidade 24/7",
      description: "Agentes de IA trabalham continuamente, sem pausas, garantindo operações ininterruptas e respostas imediatas.",
      badge: "Sempre Ativo",
      color: "primary",
    },
    {
      icon: TrendingUp,
      title: "Melhoria Contínua",
      description: "Aprendem constantemente com novos dados, refinando processos e aumentando a eficiência ao longo do tempo.",
      badge: "Auto-Aprendizado",
      color: "secondary",
    },
    {
      icon: Zap,
      title: "Eficiência Máxima",
      description: "Processam grandes volumes de dados instantaneamente, executando tarefas complexas em uma fração do tempo humano.",
      badge: "Alta Performance",
      color: "accent",
    },
    {
      icon: Shield,
      title: "Precisão Consistente",
      description: "Eliminam erros humanos e mantêm qualidade consistente, com decisões baseadas em dados objetivos.",
      badge: "Zero Erro",
      color: "primary",
    },
    {
      icon: Brain,
      title: "Tomada de Decisão Inteligente",
      description: "Analisam padrões complexos e tomam decisões estratégicas baseadas em múltiplas variáveis simultaneamente.",
      badge: "IA Avançada",
      color: "secondary",
    },
    {
      icon: Users,
      title: "Escalabilidade Ilimitada",
      description: "Atendem múltiplos clientes simultaneamente sem perda de qualidade, expandindo conforme a demanda cresce.",
      badge: "Sem Limites",
      color: "accent",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Por que Agentes de IA?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Descubra as vantagens revolucionárias dos agentes inteligentes para seu negócio
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card
                key={benefit.title}
                className="hover:shadow-lg transition-all duration-300 animate-slide-up border-0 bg-white/70 backdrop-blur-sm"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      benefit.color === "primary" ? "bg-primary/10" :
                      benefit.color === "secondary" ? "bg-secondary/10" :
                      "bg-accent/10"
                    }`}>
                      <Icon className={`h-6 w-6 ${
                        benefit.color === "primary" ? "text-primary" :
                        benefit.color === "secondary" ? "text-secondary" :
                        "text-accent"
                      }`} />
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`${
                        benefit.color === "primary" ? "bg-primary/10 text-primary" :
                        benefit.color === "secondary" ? "bg-secondary/10 text-secondary" :
                        "bg-accent/10 text-accent"
                      } border-0`}
                    >
                      {benefit.badge}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional highlight section */}
        <div className="mt-16 text-center animate-slide-up">
          <Card className="bg-gradient-to-r from-primary to-secondary text-white border-0 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                O Futuro dos Negócios é Agora
              </h3>
              <p className="text-lg opacity-90 mb-6">
                Empresas que implementam agentes de IA relatam aumento de 40% na produtividade,
                redução de 60% nos custos operacionais e melhoria de 80% na satisfação do cliente.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-accent mb-2">+40%</div>
                  <div className="text-white/80">Produtividade</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent mb-2">-60%</div>
                  <div className="text-white/80">Custos Operacionais</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent mb-2">+80%</div>
                  <div className="text-white/80">Satisfação do Cliente</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}