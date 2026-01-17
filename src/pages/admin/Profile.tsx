import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, User, Loader2, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { usePracticeAreas } from "@/hooks/usePracticeAreas";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface TeamMemberProfile {
  id: string;
  name: string;
  title: string;
  title_en: string | null;
  bio: string;
  bio_en: string | null;
  main_area: string | null;
  areas: string[] | null;
  email: string | null;
  whatsapp: string | null;
  education: string[] | null;
  education_en: string[] | null;
  publications: string[] | null;
  publications_en: string[] | null;
  photo: string | null;
  photo_url: string | null;
  published: boolean;
  user_id: string | null;
}

export default function AdminProfile() {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data: practiceAreas, isLoading: loadingAreas } = usePracticeAreas();

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

  // Fetch user's team member profile
  const { data: profile, isLoading: loadingProfile } = useQuery({
    queryKey: ['my-team-profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      return data as TeamMemberProfile | null;
    },
    enabled: !!user?.id,
  });

  // Update form when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        main_area: profile.main_area || "",
        bio: profile.bio || "",
        areas: profile.areas || [],
        email: profile.email || "",
        whatsapp: profile.whatsapp || "",
        education: profile.education?.join("\n") || "",
        publications: profile.publications?.join("\n") || "",
        published: profile.published || false,
      });
      setPhotoPreview(profile.photo_url || null);
    } else if (user) {
      // Pre-fill with user data if no profile exists
      setFormData(prev => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [profile, user]);

  const withRetry = async <T,>(fn: () => Promise<T>, retries = 2): Promise<T> => {
    let lastError: unknown;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await fn();
      } catch (err) {
        lastError = err;
        const message = err instanceof Error ? err.message : String(err);
        const isNetworkError = message.toLowerCase().includes("failed to fetch");

        if (!isNetworkError || attempt === retries) break;

        await new Promise((r) => setTimeout(r, 500 * (attempt + 1)));
      }
    }

    throw lastError instanceof Error ? lastError : new Error(String(lastError));
  };

  // Save mutation using RPC (SECURITY DEFINER) to bypass RLS issues
  const saveMutation = useMutation({
    mutationFn: async () => {
      // 1. Validar sessão antes de qualquer operação
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !sessionData.session?.access_token) {
        console.error("Sessão inválida ou expirada:", { sessionError, hasSession: !!sessionData.session });
        throw new Error("SESSION_EXPIRED");
      }

      console.log("Sessão válida, procedendo com salvamento...", {
        userId: sessionData.session.user.id,
        hasAccessToken: !!sessionData.session.access_token,
      });

      let photoUrl: string | null = profile?.photo_url || null;

      // Handle photo removal
      if (!photoPreview && !photoFile) {
        photoUrl = null;
      }
      // Upload photo if changed
      else if (photoFile) {
        const fileExt = photoFile.name.includes(".")
          ? photoFile.name.split(".").pop()
          : photoFile.type.split("/").pop();
        const safeExt = (fileExt || "jpg").toLowerCase();
        const fileName = `${sessionData.session.user.id}-${Date.now()}.${safeExt}`;

        await withRetry(async () => {
          const { error: uploadError } = await supabase.storage
            .from('team-photos')
            .upload(fileName, photoFile, { upsert: true });

          if (uploadError) throw uploadError;
          return true;
        });

        const { data: urlData } = supabase.storage
          .from('team-photos')
          .getPublicUrl(fileName);

        photoUrl = urlData.publicUrl;
      }

      // 2. Usar RPC para salvar perfil (bypass RLS, seguro via SECURITY DEFINER)
      const { data: result, error: rpcError } = await supabase.rpc('upsert_my_team_member_profile', {
        p_name: formData.name,
        p_bio: formData.bio,
        p_main_area: formData.main_area || null,
        p_areas: formData.areas.length > 0 ? formData.areas : null,
        p_email: formData.email || null,
        p_whatsapp: formData.whatsapp || null,
        p_education: formData.education ? formData.education.split("\n").filter(Boolean) : null,
        p_publications: formData.publications ? formData.publications.split("\n").filter(Boolean) : null,
        p_photo_url: photoUrl,
        p_published: formData.published,
      });

      if (rpcError) {
        console.error("Erro na RPC upsert_my_team_member_profile:", rpcError);
        throw rpcError;
      }

      console.log("Perfil salvo com sucesso via RPC:", result);
      return result;
    },
    onSuccess: () => {
      toast({ title: "Perfil salvo com sucesso!" });
      queryClient.invalidateQueries({ queryKey: ['my-team-profile'] });
      queryClient.invalidateQueries({ queryKey: ['team-members'] });
    },
    onError: (error: unknown) => {
      const supabaseError = error as { message?: string; code?: string; details?: string; hint?: string };
      console.error("Erro ao salvar perfil:", {
        message: supabaseError?.message,
        code: supabaseError?.code,
        details: supabaseError?.details,
        hint: supabaseError?.hint,
        raw: error,
      });

      const message = supabaseError?.message || "Erro inesperado";
      
      // Sessão expirada - redirecionar para login
      if (message === "SESSION_EXPIRED" || message.includes("não autenticado")) {
        toast({
          title: "Sessão expirada",
          description: "Sua sessão expirou. Redirecionando para login...",
          variant: "destructive",
        });
        // Forçar logout e redirecionar
        supabase.auth.signOut().then(() => {
          window.location.href = "/admin/login";
        });
        return;
      }

      const isNetwork = message.toLowerCase().includes("failed to fetch");
      const isRLS = message.toLowerCase().includes("row-level security");

      let description = message;
      if (isNetwork) {
        description = "Falha de conexão. Verifique sua internet e tente novamente.";
      } else if (isRLS) {
        description = "Erro de permissão. Por favor, faça logout e login novamente.";
      }

      toast({
        title: "Erro ao salvar perfil",
        description,
        variant: "destructive",
      });
    },
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({ title: "Arquivo muito grande", description: "Máximo 2MB", variant: "destructive" });
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
    saveMutation.mutate();
  };

  const isLoading = loadingProfile || loadingAreas;

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-4 md:space-y-6 max-w-4xl">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold">Meu Perfil</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1 md:mt-2">
            Gerencie suas informações profissionais
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Toggle de Publicação */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>Status de Publicação</CardTitle>
              <CardDescription>Controle a visibilidade do seu perfil no site</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Publicar perfil no site</p>
                  <p className="text-sm text-muted-foreground">
                    {formData.published 
                      ? "Seu perfil está visível para visitantes do site" 
                      : "Seu perfil está oculto do site público"}
                  </p>
                </div>
                <Switch
                  checked={formData.published}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Foto de Perfil */}
          <Card>
            <CardHeader>
              <CardTitle>Foto de Perfil</CardTitle>
              <CardDescription>Adicione uma foto profissional</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-muted flex items-center justify-center overflow-hidden shrink-0">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Preview" className="h-full w-full object-cover" />
                  ) : (
                    <User className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground" />
                  )}
                </div>
                <div className="space-y-2 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <label htmlFor="photo-upload">
                      <Button type="button" variant="outline" size="sm" asChild>
                        <span>
                          <Upload className="mr-2 h-4 w-4" />
                          Fazer Upload
                          <input
                            id="photo-upload"
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
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remover
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG ou GIF. Máximo 2MB.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input 
                    id="name" 
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Dr. João Silva" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="main_area">Área de Atuação Principal</Label>
                  <Select 
                    value={formData.main_area} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, main_area: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione sua área principal" />
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
                  placeholder="Conte sobre sua experiência e especialidades..."
                  rows={5}
                />
              </div>
            </CardContent>
          </Card>

          {/* Áreas de Atuação */}
          <Card>
            <CardHeader>
              <CardTitle>Áreas de Atuação</CardTitle>
              <CardDescription>Selecione todas as áreas em que você atua</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {practiceAreas?.map((area) => (
                  <div key={area.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={area.id} 
                      checked={formData.areas.includes(area.id)}
                      onCheckedChange={() => handleAreaToggle(area.id)}
                    />
                    <label
                      htmlFor={area.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {area.title}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contatos */}
          <Card>
            <CardHeader>
              <CardTitle>Contatos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="seu@email.com.br" 
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
            </CardContent>
          </Card>

          {/* Formação Acadêmica */}
          <Card>
            <CardHeader>
              <CardTitle>Formação Acadêmica</CardTitle>
              <CardDescription>Adicione suas formações, uma por linha</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea 
                value={formData.education}
                onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
                placeholder="Bacharel em Direito - Universidade X (2010)&#10;Pós-graduação em Direito Penal - Universidade Y (2012)"
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Publicações */}
          <Card>
            <CardHeader>
              <CardTitle>Publicações</CardTitle>
              <CardDescription>Liste suas publicações, uma por linha</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea 
                value={formData.publications}
                onChange={(e) => setFormData(prev => ({ ...prev, publications: e.target.value }))}
                placeholder="Artigo sobre Direito Penal - Revista Jurídica (2020)&#10;Livro: Fundamentos do Direito - Editora X (2021)"
                rows={4}
              />
            </CardContent>
          </Card>

          <Button type="submit" disabled={saveMutation.isPending} size="lg">
            {saveMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              "Salvar Alterações"
            )}
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
}
