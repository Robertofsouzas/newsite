import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
          alt="Business meeting with data analytics charts"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Transforme Dados em{" "}
            <span className="text-accent">Resultados</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-90">
            Especialistas em análise de dados, automação e agentes de IA.
            Soluções Power BI e N8N que impulsionam seu negócio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
            <Button
              onClick={() => scrollToSection("portfolio")}
              size="lg"
              className="bg-accent text-white hover:bg-accent/90 px-8 py-4 text-lg font-semibold"
            >
              Ver Projetos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={() => scrollToSection("contact")}
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold"
            >
              Solicitar Orçamento
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
