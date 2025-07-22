import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Upload, Link, Image, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function ImageUpload({ value, onChange, placeholder = "URL da imagem" }: ImageUploadProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(value || "");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Sugestões de imagens populares para diferentes tipos de projeto
  const suggestedImages = {
    powerbi: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?w=800&h=400&fit=crop"
    ],
    n8n: [
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop"
    ],
    ai: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1488229297570-58520851e868?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
    ]
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Verificar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Erro",
        description: "Por favor, selecione apenas arquivos de imagem",
        variant: "destructive"
      });
      return;
    }

    // Verificar tamanho (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Erro", 
        description: "A imagem deve ter no máximo 5MB",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);

    try {
      // Simular upload - em produção você conectaria com um serviço real
      // Por agora, vamos converter para base64 ou usar um placeholder
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImageUrl(result);
        toast({
          title: "Sucesso",
          description: "Imagem carregada com sucesso!"
        });
        setUploading(false);
      };
      reader.readAsDataURL(file);
      
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao fazer upload da imagem",
        variant: "destructive"
      });
      setUploading(false);
    }
  };

  const handleUrlSubmit = () => {
    if (!imageUrl.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira uma URL válida",
        variant: "destructive"
      });
      return;
    }

    onChange(imageUrl);
    setIsOpen(false);
    toast({
      title: "Sucesso",
      description: "URL da imagem salva!"
    });
  };

  const handleSuggestedImage = (url: string) => {
    setImageUrl(url);
    onChange(url);
    setIsOpen(false);
    toast({
      title: "Sucesso", 
      description: "Imagem selecionada!"
    });
  };

  const clearImage = () => {
    setImageUrl("");
    onChange("");
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={value || ""}
          placeholder={placeholder}
          readOnly
          className="flex-1"
        />
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant="outline" size="sm">
              <Image className="h-4 w-4 mr-1" />
              Escolher
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Selecionar Imagem</DialogTitle>
            </DialogHeader>
            
            <Tabs defaultValue="url" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="url">URL Manual</TabsTrigger>
                <TabsTrigger value="upload">Upload Arquivo</TabsTrigger>
                <TabsTrigger value="gallery">Galeria</TabsTrigger>
              </TabsList>
              
              <TabsContent value="url" className="space-y-4">
                <div className="space-y-2">
                  <Label>URL da Imagem</Label>
                  <Input
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
                {imageUrl && (
                  <div className="space-y-2">
                    <Label>Preview</Label>
                    <img 
                      src={imageUrl} 
                      alt="Preview" 
                      className="w-full max-w-md h-48 object-cover rounded border"
                      onError={() => toast({
                        title: "Erro",
                        description: "URL de imagem inválida",
                        variant: "destructive"
                      })}
                    />
                  </div>
                )}
                <Button onClick={handleUrlSubmit} className="w-full">
                  <Link className="h-4 w-4 mr-2" />
                  Usar esta URL
                </Button>
              </TabsContent>
              
              <TabsContent value="upload" className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium mb-2">Selecione um arquivo</p>
                  <p className="text-sm text-gray-500 mb-4">PNG, JPG, GIF até 5MB</p>
                  <Button 
                    type="button" 
                    onClick={handleFileSelect}
                    disabled={uploading}
                  >
                    {uploading ? "Carregando..." : "Escolher Arquivo"}
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
                {imageUrl && (
                  <div className="space-y-2">
                    <Label>Preview</Label>
                    <img 
                      src={imageUrl} 
                      alt="Preview" 
                      className="w-full max-w-md h-48 object-cover rounded border"
                    />
                    <Button onClick={handleUrlSubmit} className="w-full">
                      Usar esta Imagem
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="gallery" className="space-y-4">
                <div className="space-y-6">
                  {Object.entries(suggestedImages).map(([category, images]) => (
                    <div key={category} className="space-y-3">
                      <h3 className="font-medium capitalize">
                        {category === 'powerbi' ? 'Power BI & Analytics' : 
                         category === 'n8n' ? 'Automação & N8N' : 
                         'Inteligência Artificial'}
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {images.map((url, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleSuggestedImage(url)}
                            className="relative group overflow-hidden rounded border hover:border-primary transition-colors"
                          >
                            <img 
                              src={url} 
                              alt={`${category} ${index + 1}`}
                              className="w-full h-24 object-cover group-hover:scale-105 transition-transform"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="bg-white rounded-full p-1">
                                  <Image className="h-4 w-4" />
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
        
        {value && (
          <Button type="button" variant="outline" size="sm" onClick={clearImage}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {value && (
        <div className="mt-2">
          <img 
            src={value} 
            alt="Preview da imagem selecionada" 
            className="w-32 h-20 object-cover rounded border"
          />
        </div>
      )}
    </div>
  );
}