import { useState, useRef } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import { usePracticeAreas } from "@/hooks/usePracticeAreas";
import { useTranslateTeamMember } from "@/hooks/useTranslateTeamMember";
import { Languages, Loader2, Check, X, RefreshCw, Eye, EyeOff, Upload, Camera, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const TeamMembers = () => {
  const queryClient = useQueryClient();
  const { data: members = [], isLoading } = useTeamMembers();
  const { data: practiceAreas = [] } = usePracticeAreas();
  const { translateMember, translateAllMembers, isTranslating } = useTranslateTeamMember();
  const [translatingId, setTranslatingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleTranslateOne = async (member: typeof members[0]) => {
    setTranslatingId(member.id);
    try {
      await translateMember({
        memberId: member.id,
        title: member.title,
        bio: member.bio,
        education: member.education || undefined,
        publications: member.publications || undefined,
      });
    } finally {
      setTranslatingId(null);
    }
  };

  const handleUpdateMainArea = async (memberId: string, mainArea: string | null) => {
    setUpdatingId(memberId);
    try {
      const { error } = await supabase
        .from("team_members")
        .update({ main_area: mainArea })
        .eq("id", memberId);

      if (error) throw error;
      
      await queryClient.invalidateQueries({ queryKey: ["team-members"] });
      toast.success("Área principal atualizada");
    } catch (error) {
      console.error("Error updating main area:", error);
      toast.error("Erro ao atualizar área principal");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleTogglePublished = async (memberId: string, published: boolean) => {
    setUpdatingId(memberId);
    try {
      const { error } = await supabase
        .from("team_members")
        .update({ published })
        .eq("id", memberId);

      if (error) throw error;
      
      await queryClient.invalidateQueries({ queryKey: ["team-members"] });
      toast.success(published ? "Perfil publicado" : "Perfil ocultado");
    } catch (error) {
      console.error("Error toggling published:", error);
      toast.error("Erro ao atualizar status de publicação");
    } finally {
      setUpdatingId(null);
    }
  };

  const handlePhotoUpload = async (memberId: string, file: File) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Por favor, selecione uma imagem válida");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("A imagem deve ter no máximo 5MB");
      return;
    }

    setUploadingId(memberId);
    try {
      // Generate unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${memberId}-${Date.now()}.${fileExt}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from("team-photos")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("team-photos")
        .getPublicUrl(fileName);

      // Update team member with photo URL
      const { error: updateError } = await supabase
        .from("team_members")
        .update({ photo_url: publicUrl })
        .eq("id", memberId);

      if (updateError) throw updateError;

      await queryClient.invalidateQueries({ queryKey: ["team-members"] });
      toast.success("Foto atualizada com sucesso");
    } catch (error) {
      console.error("Error uploading photo:", error);
      toast.error("Erro ao fazer upload da foto");
    } finally {
      setUploadingId(null);
    }
  };

  const handleRemovePhoto = async (memberId: string) => {
    setUploadingId(memberId);
    try {
      const { error } = await supabase
        .from("team_members")
        .update({ photo_url: null })
        .eq("id", memberId);

      if (error) throw error;

      await queryClient.invalidateQueries({ queryKey: ["team-members"] });
      toast.success("Foto removida");
    } catch (error) {
      console.error("Error removing photo:", error);
      toast.error("Erro ao remover foto");
    } finally {
      setUploadingId(null);
    }
  };

  const hasEnglishTranslation = (member: typeof members[0]) => {
    return !!(member.title_en && member.bio_en);
  };

  const getAreaTitle = (areaId: string | null) => {
    if (!areaId) return null;
    return practiceAreas.find(a => a.id === areaId)?.title || areaId;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold">Equipe</h1>
            <p className="text-muted-foreground">
              Gerencie perfis, áreas de atuação e publicação
            </p>
          </div>
          <Button
            onClick={translateAllMembers}
            disabled={isTranslating}
            className="gap-2"
          >
            {isTranslating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Languages className="h-4 w-4" />
            )}
            Traduzir Todos
          </Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid gap-4">
            {members.map((member) => (
              <Card key={member.id}>
                <CardHeader className="pb-3">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {/* Photo Upload Section */}
                      <div className="relative group">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          ref={(el) => (fileInputRefs.current[member.id] = el)}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handlePhotoUpload(member.id, file);
                            e.target.value = "";
                          }}
                        />
                        {member.photo_url ? (
                          <div className="relative w-16 h-16 rounded-full overflow-hidden">
                            <img
                              src={member.photo_url}
                              alt={member.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-white hover:text-white hover:bg-white/20"
                                onClick={() => fileInputRefs.current[member.id]?.click()}
                                disabled={uploadingId === member.id}
                              >
                                <Camera className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-white hover:text-red-400 hover:bg-white/20"
                                onClick={() => handleRemovePhoto(member.id)}
                                disabled={uploadingId === member.id}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => fileInputRefs.current[member.id]?.click()}
                            disabled={uploadingId === member.id}
                            className="w-16 h-16 rounded-full bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center flex-shrink-0 hover:ring-2 hover:ring-primary transition-all cursor-pointer disabled:cursor-not-allowed"
                          >
                            {uploadingId === member.id ? (
                              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                            ) : (
                              <div className="text-center">
                                <Upload className="h-5 w-5 mx-auto text-muted-foreground/50 group-hover:text-primary transition-colors" />
                                <span className="text-[10px] text-muted-foreground/50">Foto</span>
                              </div>
                            )}
                          </button>
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <CardDescription>{member.title}</CardDescription>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {member.published ? (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          <Eye className="w-3 h-3 mr-1" />
                          Publicado
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground border-muted-foreground">
                          <EyeOff className="w-3 h-3 mr-1" />
                          Oculto
                        </Badge>
                      )}
                      {hasEnglishTranslation(member) ? (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          <Check className="w-3 h-3 mr-1" />
                          Traduzido
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-amber-600 border-amber-600">
                          <X className="w-3 h-3 mr-1" />
                          Sem tradução
                        </Badge>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTranslateOne(member)}
                        disabled={isTranslating || translatingId === member.id}
                      >
                        {translatingId === member.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <RefreshCw className="h-4 w-4" />
                        )}
                        <span className="ml-2 hidden sm:inline">
                          {hasEnglishTranslation(member) ? "Retraduzir" : "Traduzir"}
                        </span>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Main Area Selection */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <Label className="font-medium min-w-fit">Área Principal:</Label>
                    <Select
                      value={member.main_area || "none"}
                      onValueChange={(value) => handleUpdateMainArea(member.id, value === "none" ? null : value)}
                      disabled={updatingId === member.id}
                    >
                      <SelectTrigger className="w-full sm:w-[280px]">
                        <SelectValue placeholder="Selecione a área principal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Nenhuma (usar título)</SelectItem>
                        {practiceAreas.map((area) => (
                          <SelectItem key={area.id} value={area.id}>
                            {area.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {member.main_area && (
                      <span className="text-sm text-muted-foreground">
                        Exibido como: <strong>{getAreaTitle(member.main_area)}</strong>
                      </span>
                    )}
                  </div>

                  {/* Areas of Practice */}
                  {member.areas && member.areas.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm text-muted-foreground mr-2">Áreas:</span>
                      {member.areas.map((areaId) => (
                        <Badge key={areaId} variant="secondary" className="text-xs">
                          {getAreaTitle(areaId) || areaId}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Publish Toggle */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-0.5">
                      <Label className="font-medium">Publicar Perfil</Label>
                      <p className="text-sm text-muted-foreground">
                        Quando ativado, o perfil aparecerá nas páginas públicas do site
                      </p>
                    </div>
                    <Switch
                      checked={member.published}
                      onCheckedChange={(checked) => handleTogglePublished(member.id, checked)}
                      disabled={updatingId === member.id}
                    />
                  </div>

                  {/* English Translation Preview */}
                  {hasEnglishTranslation(member) && (
                    <div className="text-sm text-muted-foreground space-y-2 border-t pt-3">
                      <p>
                        <span className="font-medium">Título (EN):</span>{" "}
                        {member.title_en}
                      </p>
                      <p className="line-clamp-2">
                        <span className="font-medium">Bio (EN):</span>{" "}
                        {member.bio_en}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default TeamMembers;
