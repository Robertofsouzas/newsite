import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Image, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function ImageUpload({ value, onChange, placeholder = "URL da imagem" }: ImageUploadProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(value || "");
  const { toast } = useToast();

  // Sugestões de imagens populares para diferentes tipos de projeto
  const suggestedImages = [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1488229297570-58520851e868?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop"
  ];

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
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Selecionar Imagem</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* URL Manual */}
              <div className="space-y-4">
                <h3 className="font-medium">Inserir URL Manual</h3>
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
                  Usar esta URL
                </Button>
              </div>

              {/* Galeria de Sugestões */}
              <div className="space-y-4">
                <h3 className="font-medium">Galeria de Imagens</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {suggestedImages.map((url, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSuggestedImage(url)}
                      className="relative group overflow-hidden rounded border hover:border-primary transition-colors"
                    >
                      <img 
                        src={url} 
                        alt={`Sugestão ${index + 1}`}
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
            </div>
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