import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertProjectSchema, type Project, type InsertProject } from "@/shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { Plus, Edit, Trash2, ExternalLink, Eye, LogOut } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

function AdminContent() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const { toast } = useToast();
  const { logout } = useAuth();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso",
    });
    setLocation("/login");
  };

  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const form = useForm<InsertProject>({
    resolver: zodResolver(insertProjectSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      fullDescription: "",
      type: "powerbi",
      embedUrl: "",
      imageUrl: "",
      date: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertProject) => {
      return await apiRequest("/api/projects", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      form.reset();
      setIsDialogOpen(false);
      setEditingProject(null);
      toast({
        title: "Projeto criado!",
        description: "O projeto foi criado com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao criar projeto",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: InsertProject }) => {
      return await apiRequest(`/api/projects/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      form.reset();
      setIsDialogOpen(false);
      setEditingProject(null);
      toast({
        title: "Projeto atualizado!",
        description: "O projeto foi atualizado com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao atualizar projeto",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest(`/api/projects/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({
        title: "Projeto deletado!",
        description: "O projeto foi deletado com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao deletar projeto",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertProject) => {
    const { id, ...rest } = data as any;

    if (editingProject) {
      updateMutation.mutate({ id: editingProject.id, data: rest });
    } else {
      createMutation.mutate(rest);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    form.reset({
      title: project.title,
      slug: project.slug,
      description: project.description || "",
      fullDescription: project.fullDescription || "",
      type: project.type || "powerbi",
      embedUrl: project.embedUrl || "",
      imageUrl: project.imageUrl || "",
      date: project.date || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja deletar este projeto?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
            <p className="text-gray-600">Gerencie seus projetos e conteúdo</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>

        <div className="mb-8">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingProject(null);
                  form.reset();
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Novo Projeto
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingProject ? "Editar Projeto" : "Criar Novo Projeto"}
                </DialogTitle>
              </DialogHeader>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título do Projeto</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Ex: Dashboard de Vendas 2024"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição Breve</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Descrição resumida do projeto..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo do Projeto</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="powerbi">Power BI</SelectItem>
                            <SelectItem value="n8n">N8N</SelectItem>
                            <SelectItem value="ai">Agente de IA</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fullDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição Completa</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Descrição detalhada do projeto, benefícios e resultados..."
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug (URL amigável)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="projeto-power-bi-vendas"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data do Projeto</FormLabel>
                        <FormControl>
                          <Input 
                            type="date"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                    <FormField
                      control={form.control}
                    name="embedUrl"
                      render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL de Embed (Power BI, N8N, etc.)</FormLabel>
                          <FormControl>
                          <Input 
                            placeholder="https://app.powerbi.com/... ou URL do N8N"
                            {...field}
                            />
                          </FormControl>
                        <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                    name="imageUrl"
                      render={({ field }) => (
                      <FormItem>
                        <FormLabel>Imagem do Projeto</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <div className="flex gap-2">
                              <Input 
                                placeholder="URL da imagem ou clique em Escolher"
                                {...field}
                                className="flex-1"
                              />
                              <Button 
                                type="button" 
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const imageOptions = [
                                    {
                                      name: 'Power BI - Dashboard Analytics',
                                      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop'
                                    },
                                    {
                                      name: 'Power BI - Business Data',
                                      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop'
                                    },
                                    {
                                      name: 'Power BI - Data Visualization',
                                      url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=400&fit=crop'
                                    },
                                    {
                                      name: 'N8N - Automation Network',
                                      url: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=400&fit=crop'
                                    },
                                    {
                                      name: 'N8N - Process Automation',
                                      url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop'
                                    },
                                    {
                                      name: 'N8N - Workflow Integration',
                                      url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop'
                                    },
                                    {
                                      name: 'AI - Artificial Intelligence',
                                      url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop'
                                    },
                                    {
                                      name: 'AI - Machine Learning',
                                      url: 'https://images.unsplash.com/photo-1488229297570-58520851e868?w=800&h=400&fit=crop'
                                    },
                                    {
                                      name: 'AI - Neural Networks',
                                      url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop'
                                    }
                                  ];
                                  
                                  const optionsText = imageOptions.map((img, index) => 
                                    `${index + 1} - ${img.name}`
                                  ).join('\n');
                                  
                                  const selection = prompt(
                                    `Escolha uma imagem:\n\n${optionsText}\n\nOu digite a URL personalizada:`,
                                    '1'
                                  );
                                  
                                  if (selection) {
                                    const num = parseInt(selection);
                                    if (num >= 1 && num <= imageOptions.length) {
                                      field.onChange(imageOptions[num - 1].url);
                                    } else if (selection.startsWith('http')) {
                                      field.onChange(selection);
                                    }
                                  }
                                }}
                              >
                                🖼️ Escolher
                              </Button>
                              {field.value && (
                                <Button 
                                  type="button" 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => field.onChange('')}
                                >
                                  ❌
                                </Button>
                              )}
                            </div>
                            {field.value && (
                              <div className="mt-2">
                                <img 
                                  src={field.value} 
                                  alt="Preview da imagem selecionada" 
                                  className="w-48 h-28 object-cover rounded border shadow-sm"
                                  onError={() => alert('Erro ao carregar imagem. Verifique a URL.')}
                                />
                              </div>
                            )}
                          </div>
                          </FormControl>
                        <FormMessage />
                        </FormItem>
                      )}
                    />

                  <div className="flex gap-3 pt-4">
                    <Button 
                      type="submit" 
                      disabled={createMutation.isPending || updateMutation.isPending}
                      className="flex-1"
                    >
                      {editingProject ? "Atualizar" : "Criar"} Projeto
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        setIsDialogOpen(false);
                        setEditingProject(null);
                        form.reset();
                      }}
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6">
          {projects.map((project) => (
            <Card key={project.id}>
                <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {project.title}
                      <Badge variant="secondary">{project.type}</Badge>
                    </CardTitle>
                    <p className="text-gray-600 mt-1">{project.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(project)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(project.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {project.imageUrl && (
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                )}
                {project.embedUrl && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <ExternalLink className="h-4 w-4" />
                    <span>URL de Embed configurada</span>
                  </div>
                )}
                </CardContent>
              </Card>
            ))}
          </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <AdminContent />
    </ProtectedRoute>
  );
}