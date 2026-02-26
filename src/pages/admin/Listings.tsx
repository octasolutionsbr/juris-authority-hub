import { useState, useRef } from "react";
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
  contact_whatsapp: string;
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
  contact_whatsapp: "",
};

export default function AdminListings() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingListing, setEditingListing] = useState<Listing | null>(null);
  const [formData, setFormData] = useState<ListingFormData>(initialFormData);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: listings = [], isLoading } = useListings({ myListingsOnly: true });
  const createListing = useCreateListing();
  const updateListing = useUpdateListing();
  const deleteListing = useDeleteListing();

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setFormData(initialFormData);
      setEditingListing(null);
    }
  };

  const openEditDialog = async (listing: Listing) => {
    // Fetch fresh data directly from DB to ensure all fields are present
    const { data: freshListing, error } = await supabase
      .from('listings')
      .select('*')
      .eq('id', listing.id)
      .single();

    const source = freshListing || listing;

    setEditingListing(source as Listing);
    setFormData({
      category: source.category,
      title: source.title,
      title_en: source.title_en || "",
      description: source.description,
      description_en: source.description_en || "",
      long_description: source.long_description || "",
      long_description_en: source.long_description_en || "",
      price: source.price?.toString() || "",
      status: source.status,
      location: source.location || "",
      location_en: source.location_en || "",
      area: source.area?.toString() || "",
      features: (source.features as string[] | null)?.join(", ") || "",
      features_en: (source.features_en as string[] | null)?.join(", ") || "",
      images: (source.images as string[] | null) || [],
      contact_whatsapp: source.contact_whatsapp || "",
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
      contact_whatsapp: formData.contact_whatsapp || null,
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
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold">Anúncios</h1>
            <p className="text-sm md:text-base text-muted-foreground mt-1 md:mt-2">
              Gerencie seus anúncios de oportunidades
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Novo Anúncio
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto">
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

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="location_en">Localização (EN)</Label>
                    <Input 
                      id="location_en" 
                      placeholder="Ex: São Paulo, Brazil" 
                      value={formData.location_en}
                      onChange={(e) => updateFormField("location_en", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact_whatsapp">WhatsApp para Contato</Label>
                    <Input 
                      id="contact_whatsapp" 
                      placeholder="Ex: 5596932231499" 
                      value={formData.contact_whatsapp}
                      onChange={(e) => updateFormField("contact_whatsapp", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">Número com código do país (ex: 5596932231499)</p>
                  </div>
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
          <CardHeader className="px-4 md:px-6">
            <CardTitle className="text-lg md:text-xl">Meus Anúncios</CardTitle>
            <CardDescription>Lista de todos os seus anúncios cadastrados</CardDescription>
          </CardHeader>
          <CardContent className="px-0 md:px-6">
            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Carregando anúncios...</p>
              </div>
            ) : listings.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Nenhum anúncio cadastrado ainda.</p>
              </div>
            ) : (
              <>
                {/* Mobile Cards */}
                <div className="md:hidden space-y-3 px-4">
                  {listings.map((listing) => (
                    <div key={listing.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex gap-3">
                        {listing.images && listing.images.length > 0 ? (
                          <img
                            src={listing.images[0]}
                            alt={listing.title}
                            className="w-16 h-16 object-cover rounded shrink-0"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-muted rounded flex items-center justify-center shrink-0">
                            <ImageIcon className="w-6 h-6 text-muted-foreground" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{listing.title}</p>
                          <p className="text-sm text-muted-foreground">{categoryLabels[listing.category]}</p>
                          <p className="text-sm font-medium mt-1">
                            {listing.price 
                              ? `R$ ${listing.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` 
                              : "Preço sob consulta"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t">
                        <Badge variant={listing.status === "available" ? "default" : "secondary"}>
                          {statusLabels[listing.status]}
                        </Badge>
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/oportunidades/${listing.id}`} target="_blank">
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => openEditDialog(listing)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete(listing.id)} className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
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
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
