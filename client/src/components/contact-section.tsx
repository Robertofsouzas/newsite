import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Mail, Phone, Clock, Loader2 } from "lucide-react";

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Mensagem enviada!",
        description: "Obrigado pelo seu interesse! Em breve entraremos em contato.",
      });
      setFormData({
        name: "",
        email: "",
        company: "",
        service: "",
        message: "",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao enviar mensagem",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.service || !formData.message) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    contactMutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Entre em Contato
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Pronto para transformar seus dados em resultados? Vamos conversar sobre seu projeto.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="animate-slide-in-left">
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              Fale Conosco
            </h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 mt-1">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-1">Email</div>
                  <div className="text-muted-foreground">contato@rfstechs.com</div>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mr-4 mt-1">
                  <Phone className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-1">Telefone</div>
                  <div className="text-muted-foreground">+55 (11) 99999-9999</div>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mr-4 mt-1">
                  <Clock className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <div className="font-semibold text-foreground mb-1">Horário de Atendimento</div>
                  <div className="text-muted-foreground">Segunda a Sexta: 9h às 18h</div>
                </div>
              </div>
            </div>
          </div>

          <Card className="bg-white shadow-sm border-0 animate-slide-in-right">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-foreground font-medium">
                    Nome Completo *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Seu nome completo"
                    className="mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-foreground font-medium">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="seu@email.com"
                    className="mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="company" className="text-foreground font-medium">
                    Empresa
                  </Label>
                  <Input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    placeholder="Nome da sua empresa"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="service" className="text-foreground font-medium">
                    Serviço de Interesse *
                  </Label>
                  <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Selecione um serviço" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="powerbi">Dashboard Power BI</SelectItem>
                      <SelectItem value="n8n">Automação N8N</SelectItem>
                      <SelectItem value="ia">Inteligência Artificial</SelectItem>
                      <SelectItem value="consultoria">Consultoria Geral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message" className="text-foreground font-medium">
                    Mensagem *
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Descreva seu projeto ou necessidade..."
                    className="mt-2"
                    rows={4}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={contactMutation.isPending}
                >
                  {contactMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar Mensagem"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
