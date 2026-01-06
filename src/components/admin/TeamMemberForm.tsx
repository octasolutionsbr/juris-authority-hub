import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, User, Loader2, Trash2 } from "lucide-react";
import { usePracticeAreas } from "@/hooks/usePracticeAreas";
import { supabase } from "@/integrations/supabase/client";
import type { TeamMember } from "@/hooks/useTeamMembers";

interface TeamMemberFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member?: TeamMember | null;
  onSave: (data: TeamMemberFormData) => Promise<void>;
  isSaving?: boolean;
}

export interface TeamMemberFormData {
  name: string;
  title: string;
  bio: string;
  main_area: string | null;
  areas: string[] | null;
  email: string | null;
  whatsapp: string | null;
  education: string[] | null;
  publications: string[] | null;
  photo_url: string | null;
  published: boolean;
}

export function TeamMemberForm({ open, onOpenChange, member, onSave, isSaving }: TeamMemberFormProps) {
  const { data: practiceAreas } = usePracticeAreas();

  const [formData, setFormData] = useState({
    name: "",
    main_area: "",
    bio: "",
    areas: [] as string[],
    email: "",
    whatsapp: "",
    education: "",
    publications: "",
    published: false,
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Reset form when dialog opens/closes or member changes
  useEffect(() => {
    if (open && member) {
      setFormData({
        name: member.name || "",
        main_area: member.main_area || "",
        bio: member.bio || "",
        areas: member.areas || [],
        email: member.email || "",
        whatsapp: member.whatsapp || "",
        education: member.education?.join("\n") || "",
        publications: member.publications?.join("\n") || "",
        published: member.published || false,
      });
      setPhotoPreview(member.photo_url || null);
      setPhotoFile(null);
    } else if (open && !member) {
      // Reset for new member
      setFormData({
        name: "",
        main_area: "",
        bio: "",
        areas: [],
        email: "",
        whatsapp: "",
        education: "",
        publications: "",
        published: false,
      });
      setPhotoPreview(null);
      setPhotoFile(null);
    }
  }, [open, member]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Arquivo muito grande. Máximo 2MB");
        return;
      }
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleAreaToggle = (areaId: string) => {
    setFormData(prev => ({
      ...prev,
      areas: prev.areas.includes(areaId)
        ? prev.areas.filter(a => a !== areaId)
        : [...prev.areas, areaId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let photoUrl: string | null = member?.photo_url || null;

    // Handle photo removal
    if (!photoPreview && !photoFile) {
      photoUrl = null;
    }
    // Upload photo if changed
    else if (photoFile) {
      setUploading(true);
      try {
        const fileExt = photoFile.name.split('.').pop();
        const fileName = `admin-${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('team-photos')
          .upload(fileName, photoFile, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('team-photos')
          .getPublicUrl(fileName);
        
        photoUrl = urlData.publicUrl;
      } catch (error) {
        console.error("Erro ao fazer upload da foto:", error);
      } finally {
        setUploading(false);
      }
    }

    const title = formData.main_area 
      ? practiceAreas?.find(a => a.id === formData.main_area)?.title || "Advogado"
      : "Advogado";

    await onSave({
      name: formData.name,
      title,
      bio: formData.bio,
      main_area: formData.main_area || null,
      areas: formData.areas.length > 0 ? formData.areas : null,
      email: formData.email || null,
      whatsapp: formData.whatsapp || null,
      education: formData.education ? formData.education.split("\n").filter(Boolean) : null,
      publications: formData.publications ? formData.publications.split("\n").filter(Boolean) : null,
      photo_url: photoUrl,
      published: formData.published,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{member ? "Editar Membro" : "Novo Membro da Equipe"}</DialogTitle>
          <DialogDescription>
            {member ? "Edite as informações do membro" : "Preencha as informações do novo membro"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Status de Publicação */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Publicar no site</p>
              <p className="text-sm text-muted-foreground">
                {formData.published ? "Visível para visitantes" : "Oculto do site público"}
              </p>
            </div>
            <Switch
              checked={formData.published}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
            />
          </div>

          {/* Foto de Perfil */}
          <div className="space-y-2">
            <Label>Foto de Perfil</Label>
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <User className="h-10 w-10 text-muted-foreground" />
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label htmlFor="photo-upload-form">
                    <Button type="button" variant="outline" size="sm" asChild>
                      <span>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                        <input
                          id="photo-upload-form"
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="sr-only"
                        />
                      </span>
                    </Button>
                  </label>
                  {photoPreview && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setPhotoFile(null);
                        setPhotoPreview(null);
                      }}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">JPG, PNG. Máximo 2MB.</p>
              </div>
            </div>
          </div>

          {/* Informações Básicas */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo *</Label>
              <Input 
                id="name" 
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Dr. João Silva"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="main_area">Área Principal</Label>
              <Select 
                value={formData.main_area} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, main_area: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a área" />
                </SelectTrigger>
                <SelectContent>
                  {practiceAreas?.map((area) => (
                    <SelectItem key={area.id} value={area.id}>
                      {area.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Biografia</Label>
            <Textarea 
              id="bio" 
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Experiência e especialidades..."
              rows={4}
            />
          </div>

          {/* Áreas de Atuação */}
          <div className="space-y-2">
            <Label>Áreas de Atuação</Label>
            <div className="grid gap-3 md:grid-cols-2 p-3 border rounded-lg">
              {practiceAreas?.map((area) => (
                <div key={area.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`area-${area.id}`}
                    checked={formData.areas.includes(area.id)}
                    onCheckedChange={() => handleAreaToggle(area.id)}
                  />
                  <label htmlFor={`area-${area.id}`} className="text-sm cursor-pointer">
                    {area.title}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Contatos */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="email@exemplo.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input 
                id="whatsapp" 
                value={formData.whatsapp}
                onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
                placeholder="+55 11 99999-9999"
              />
            </div>
          </div>

          {/* Formação e Publicações */}
          <div className="space-y-2">
            <Label htmlFor="education">Formação Acadêmica (uma por linha)</Label>
            <Textarea 
              id="education"
              value={formData.education}
              onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
              placeholder="Bacharel em Direito - USP (2010)&#10;Mestrado em Direito Civil - PUC (2015)"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="publications">Publicações (uma por linha)</Label>
            <Textarea 
              id="publications"
              value={formData.publications}
              onChange={(e) => setFormData(prev => ({ ...prev, publications: e.target.value }))}
              placeholder="Artigo sobre Contratos - Revista Jurídica (2020)"
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSaving || uploading || !formData.name}>
              {(isSaving || uploading) ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                member ? "Salvar Alterações" : "Criar Membro"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
