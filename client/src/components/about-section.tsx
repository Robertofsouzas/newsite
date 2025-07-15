import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ArrowRight } from "lucide-react";

export default function AboutSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const achievements = [
    "+50 projetos concluídos com sucesso",
    "Especialistas certificados Power BI",
    "Consultoria personalizada",
    "Suporte técnico especializado",
  ];

  const stats = [
    { number: "50+", label: "Projetos", color: "primary" },
    { number: "5+", label: "Anos Experiência", color: "secondary" },
    { number: "30+", label: "Clientes Satisfeitos", color: "accent" },
    { number: "24/7", label: "Suporte", color: "neutral" },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-slide-in-left">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Sobre a RFSTechs
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Somos especialistas em transformar dados em insights valiosos e automatizar processos
              para impulsionar o crescimento dos negócios. Com expertise em Power BI, N8N e
              agentes de IA que trabalham 24/7 para maximizar seus resultados.
            </p>
            <div className="space-y-4 mb-8">
              {achievements.map((achievement) => (
                <div key={achievement} className="flex items-center">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-foreground">{achievement}</span>
                </div>
              ))}
            </div>
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Fale Conosco
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-6 animate-slide-in-right">
            {stats.map((stat, index) => (
              <Card
                key={stat.label}
                className={`text-center border-0 ${
                  stat.color === "primary" ? "bg-primary/5" :
                  stat.color === "secondary" ? "bg-secondary/5" :
                  stat.color === "accent" ? "bg-accent/5" :
                  "bg-muted/30"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className={`text-3xl font-bold mb-2 ${
                    stat.color === "primary" ? "text-primary" :
                    stat.color === "secondary" ? "text-secondary" :
                    stat.color === "accent" ? "text-accent" :
                    "text-foreground"
                  }`}>
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
