import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Ana Silva",
      company: "TechVendas Ltda",
      role: "Diretora Comercial",
      content: "Os dashboards Power BI criados pela RFSTechs revolucionaram nossa análise de vendas. Agora conseguimos identificar tendências em tempo real e tomar decisões mais assertivas.",
      rating: 5,
      service: "Power BI"
    },
    {
      name: "Carlos Mendes",
      company: "Logística Express",
      role: "Gerente de Operações",
      content: "A automação com N8N reduziu em 70% o tempo gasto em processos manuais. Nossa equipe agora foca no que realmente importa: estratégia e atendimento ao cliente.",
      rating: 5,
      service: "Automação N8N"
    },
    {
      name: "Marina Costa",
      company: "RetailMax",
      role: "CEO",
      content: "O agente de IA implementado pela RFSTechs otimizou nosso controle de estoque automaticamente. Reduzimos custos e melhoramos a disponibilidade de produtos.",
      rating: 5,
      service: "Agentes de IA"
    },
    {
      name: "Roberto Oliveira",
      company: "FinanceFlow",
      role: "CTO",
      content: "A integração entre nossos sistemas ERP e CRM funcionou perfeitamente. Dados sincronizados em tempo real e zero problemas de compatibilidade.",
      rating: 5,
      service: "Integração"
    },
    {
      name: "Juliana Santos",
      company: "EcoSolutions",
      role: "Diretora Financeira",
      content: "O dashboard financeiro nos deu visibilidade completa sobre custos e receitas. Identificamos oportunidades de economia que não víamos antes.",
      rating: 5,
      service: "Power BI"
    },
    {
      name: "Pedro Almeida",
      company: "InnovaTech",
      role: "Diretor de TI",
      content: "Equipe extremamente competente e profissional. Entregaram o projeto no prazo e com qualidade excepcional. Superou nossas expectativas.",
      rating: 5,
      service: "Consultoria"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-accent fill-accent" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Veja como nossas soluções têm ajudado empresas a alcançar seus objetivos
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={`${testimonial.name}-${index}`}
              className="hover:shadow-lg transition-all duration-300 animate-slide-up border-0 bg-muted/30"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Quote className="w-8 h-8 text-primary/20" />
                  <div className="flex space-x-1">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                      <p className="text-sm font-medium text-primary">
                        {testimonial.company}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                        {testimonial.service}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid md:grid-cols-4 gap-8 text-center animate-slide-up">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">98%</div>
            <div className="text-muted-foreground">Satisfação dos Clientes</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-secondary mb-2">50+</div>
            <div className="text-muted-foreground">Projetos Entregues</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent mb-2">24h</div>
            <div className="text-muted-foreground">Tempo Médio de Resposta</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <div className="text-muted-foreground">Projetos no Prazo</div>
          </div>
        </div>
      </div>
    </section>
  );
}