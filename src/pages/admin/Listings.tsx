import { useState, useRef, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Upload, X, ImageIcon, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useListings, useCreateListing, useUpdateListing, useDeleteListing, type Listing } from "@/hooks/useListings";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

const categoryLabels: Record<string, string> = {
  imoveis: "Imóveis",
  precatorios: "Precatórios",
  creditos: "Créditos Tributários",
  outros: "Outros Ativos",
};

const statusLabels: Record<string, string> = {
  available: "Ativo",
  pending: "Pendente",
  sold: "Vendido",
};

type ListingFormData = {
  category: string;
  title: string;
  title_en: string;
  description: string;
  description_en: string;
  long_description: string;
  long_description_en: string;
  price: string;
  status: string;
  location: string;
  location_en: string;
  area: string;
  features: string;
  features_en: string;
  images: string[];
};

const initialFormData: ListingFormData = {
  category: "",
  title: "",
  title_en: "",
  description: "",
  description_en: "",
  long_description: "",
  long_description_en: "",
  price: "",
  status: "available",
  location: "",
  location_en: "",
  area: "",
  features: "",
  features_en: "",
  images: [],
};

export default function AdminListings() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingListing, setEditingListing] = useState<Listing | null>(null);
  const [formData, setFormData] = useState<ListingFormData>(initialFormData);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: listings = [], isLoading } = useListings();
  const createListing = useCreateListing();
  const updateListing = useUpdateListing();
  const deleteListing = useDeleteListing();

  // Reset form when dialog closes
  useEffect(() => {
    if (!isDialogOpen) {
      setFormData(initialFormData);
      setEditingListing(null);
    }
  }, [isDialogOpen]);

  const openEditDialog = (listing: Listing) => {
    setEditingListing(listing);
    setFormData({
      category: listing.category,
      title: listing.title,
      title_en: listing.title_en || "",
      description: listing.description,
      description_en: listing.description_en || "",
      long_description: listing.long_description || "",
      long_description_en: listing.long_description_en || "",
      price: listing.price?.toString() || "",
      status: listing.status,
      location: listing.location || "",
      location_en: listing.location_en || "",
      area: listing.area?.toString() || "",
      features: listing.features?.join(", ") || "",
      features_en: listing.features_en?.join(", ") || "",
      images: listing.images || [],
    });
    setIsDialogOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (const file of Array.from(files)) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `listings/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("listing-images")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("listing-images")
          .getPublicUrl(filePath);

        uploadedUrls.push(data.publicUrl);
      }

      setFormData(prev => ({ ...prev, images: [...prev.images, ...uploadedUrls] }));
      toast({ title: "Imagens enviadas com sucesso!" });
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Erro ao enviar imagens",
        description: "Não foi possível enviar as imagens.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const parseFeatures = (featuresStr: string): string[] => {
    if (!featuresStr.trim()) return [];
    return featuresStr.split(",").map(f => f.trim()).filter(f => f);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category || !formData.title || !formData.description) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const listingData = {
      category: formData.category as any,
      title: formData.title,
      title_en: formData.title_en || null,
      description: formData.description,
      description_en: formData.description_en || null,
      long_description: formData.long_description || null,
      long_description_en: formData.long_description_en || null,
      price: formData.price ? parseFloat(formData.price) : null,
      status: formData.status as any,
      location: formData.location || null,
      location_en: formData.location_en || null,
      area: formData.area ? parseFloat(formData.area) : null,
      features: parseFeatures(formData.features),
      features_en: parseFeatures(formData.features_en),
      images: formData.images.length > 0 ? formData.images : null,
    };

    try {
      if (editingListing) {
        await updateListing.mutateAsync({ id: editingListing.id, ...listingData });
        toast({ title: "Anúncio atualizado com sucesso!" });
      } else {
        await createListing.mutateAsync(listingData);
        toast({ title: "Anúncio criado com sucesso!" });
      }
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: editingListing ? "Erro ao atualizar anúncio" : "Erro ao criar anúncio",
        description: "Não foi possível salvar o anúncio.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este anúncio?")) {
      try {
        await deleteListing.mutateAsync(id);
        toast({ title: "Anúncio excluído com sucesso!" });
      } catch (error) {
        toast({
          title: "Erro ao excluir anúncio",
          description: "Não foi possível excluir o anúncio.",
          variant: "destructive",
        });
      }
    }
  };

  const updateFormField = (field: keyof ListingFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold">Anúncios</h1>
            <p className="text-muted-foreground mt-2">
              Gerencie seus anúncios de oportunidades
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Anúncio
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingListing ? "Editar Anúncio" : "Criar Novo Anúncio"}</DialogTitle>
                <DialogDescription>
                  {editingListing ? "Atualize as informações do anúncio" : "Preencha as informações do anúncio"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria *</Label>
                    <Select value={formData.category} onValueChange={(v) => updateFormField("category", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="imoveis">Imóveis</SelectItem>
                        <SelectItem value="precatorios">Precatórios</SelectItem>
                        <SelectItem value="creditos">Créditos Tributários</SelectItem>
                        <SelectItem value="outros">Outros Ativos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(v) => updateFormField("status", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Ativo</SelectItem>
                        <SelectItem value="pending">Pendente</SelectItem>
                        <SelectItem value="sold">Vendido</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Title */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título (PT) *</Label>
                    <Input 
                      id="title" 
                      placeholder="Título em português" 
                      value={formData.title}
                      onChange={(e) => updateFormField("title", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title_en">Título (EN)</Label>
                    <Input 
                      id="title_en" 
                      placeholder="Title in English" 
                      value={formData.title_en}
                      onChange={(e) => updateFormField("title_en", e.target.value)}
                    />
                  </div>
                </div>

                {/* Short Description */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição Curta (PT) *</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Breve descrição em português..."
                      rows={3}
                      value={formData.description}
                      onChange={(e) => updateFormField("description", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description_en">Descrição Curta (EN)</Label>
                    <Textarea 
                      id="description_en" 
                      placeholder="Brief description in English..."
                      rows={3}
                      value={formData.description_en}
                      onChange={(e) => updateFormField("description_en", e.target.value)}
                    />
                  </div>
                </div>

                {/* Long Description */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="long_description">Descrição Detalhada (PT)</Label>
                    <Textarea 
                      id="long_description" 
                      placeholder="Descrição completa com todos os detalhes..."
                      rows={5}
                      value={formData.long_description}
                      onChange={(e) => updateFormField("long_description", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="long_description_en">Descrição Detalhada (EN)</Label>
                    <Textarea 
                      id="long_description_en" 
                      placeholder="Full description with all details..."
                      rows={5}
                      value={formData.long_description_en}
                      onChange={(e) => updateFormField("long_description_en", e.target.value)}
                    />
                  </div>
                </div>

                {/* Price, Area, Location */}
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="price">Preço (R$)</Label>
                    <Input 
                      id="price" 
                      type="number"
                      placeholder="0.00" 
                      value={formData.price}
                      onChange={(e) => updateFormField("price", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area">Área (m²)</Label>
                    <Input 
                      id="area" 
                      type="number"
                      placeholder="Ex: 150" 
                      value={formData.area}
                      onChange={(e) => updateFormField("area", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Localização (PT)</Label>
                    <Input 
                      id="location" 
                      placeholder="Ex: São Paulo, SP" 
                      value={formData.location}
                      onChange={(e) => updateFormField("location", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location_en">Localização (EN)</Label>
                  <Input 
                    id="location_en" 
                    placeholder="Ex: São Paulo, Brazil" 
                    value={formData.location_en}
                    onChange={(e) => updateFormField("location_en", e.target.value)}
                  />
                </div>

                {/* Features */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="features">Características (PT)</Label>
                    <Textarea 
                      id="features" 
                      placeholder="Separe por vírgula: Piscina, Garagem, Churrasqueira"
                      rows={2}
                      value={formData.features}
                      onChange={(e) => updateFormField("features", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="features_en">Características (EN)</Label>
                    <Textarea 
                      id="features_en" 
                      placeholder="Comma separated: Pool, Garage, BBQ Area"
                      rows={2}
                      value={formData.features_en}
                      onChange={(e) => updateFormField("features_en", e.target.value)}
                    />
                  </div>
                </div>

                {/* Image Upload Section */}
                <div className="space-y-2">
                  <Label>Imagens</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-4">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <div className="flex flex-col items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        {uploading ? "Enviando..." : "Enviar Imagens"}
                      </Button>
                      <p className="text-sm text-muted-foreground">
                        PNG, JPG até 5MB. A primeira imagem será a capa.
                      </p>
                    </div>

                    {/* Image Preview */}
                    {formData.images.length > 0 && (
                      <div className="grid grid-cols-4 gap-2 mt-4">
                        {formData.images.map((url, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={url}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-20 object-cover rounded-md"
                            />
                            {index === 0 && (
                              <Badge className="absolute bottom-1 left-1 text-xs">Capa</Badge>
                            )}
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 justify-end">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={createListing.isPending || updateListing.isPending}>
                    {createListing.isPending || updateListing.isPending 
                      ? "Salvando..." 
                      : editingListing ? "Salvar Alterações" : "Criar Anúncio"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Meus Anúncios</CardTitle>
            <CardDescription>Lista de todos os seus anúncios cadastrados</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Carregando anúncios...</p>
              </div>
            ) : listings.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Nenhum anúncio cadastrado ainda.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Img</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {listings.map((listing) => (
                    <TableRow key={listing.id}>
                      <TableCell>
                        {listing.images && listing.images.length > 0 ? (
                          <img
                            src={listing.images[0]}
                            alt={listing.title}
                            className="w-10 h-10 object-cover rounded"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
                            <ImageIcon className="w-4 h-4 text-muted-foreground" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium max-w-[200px] truncate">{listing.title}</TableCell>
                      <TableCell>{categoryLabels[listing.category]}</TableCell>
                      <TableCell>
                        {listing.price 
                          ? `R$ ${listing.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` 
                          : "-"}
                      </TableCell>
                      <TableCell>
                        <Badge variant={listing.status === "available" ? "default" : "secondary"}>
                          {statusLabels[listing.status]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" asChild>
                            <Link to={`/oportunidades/${listing.id}`} target="_blank">
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => openEditDialog(listing)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDelete(listing.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
