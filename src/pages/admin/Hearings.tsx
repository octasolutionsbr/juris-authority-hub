import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HearingCard } from "@/components/admin/HearingCard";
import { HearingForm } from "@/components/admin/HearingForm";
import { HearingShareDialog } from "@/components/admin/HearingShareDialog";
import { Hearing, HearingStatus } from "@/types/hearing";
import { Plus, Search, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useHearings, useCreateHearing, useUpdateHearing, useDeleteHearing } from "@/hooks/useHearings";

export default function AdminHearings() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [selectedHearing, setSelectedHearing] = useState<Hearing | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data: hearingsData = [], isLoading } = useHearings();
  const createHearing = useCreateHearing();
  const updateHearing = useUpdateHearing();
  const deleteHearing = useDeleteHearing();
  
  // Convert database hearings to component format
  const hearings: Hearing[] = hearingsData.map(h => ({
    id: h.id,
    clientName: h.client_name,
    clientEmail: h.client_email,
    caseNumber: h.case_number,
    court: h.court,
    type: h.type,
    dateTime: new Date(h.date_time),
    location: h.location,
    description: h.description,
    notes: h.notes || '',
    status: h.status,
    isShared: h.is_shared,
    shareToken: h.share_token || undefined,
    lawyerId: h.lawyer_id,
    lawyerName: user?.name || 'Advogado',
    lawyerPhone: h.lawyer_phone || undefined,
    lawyerEmail: h.lawyer_email || undefined,
    requiredDocuments: h.required_documents || [],
    createdAt: new Date(h.created_at),
    updatedAt: new Date(h.updated_at),
  }));

  const handleCreate = async (data: Partial<Hearing>) => {
    try {
      await createHearing.mutateAsync({
        client_name: data.clientName!,
        client_email: data.clientEmail!,
        case_number: data.caseNumber!,
        court: data.court!,
        type: data.type!,
        date_time: data.dateTime!.toISOString(),
        location: data.location!,
        description: data.description!,
        notes: data.notes || null,
        status: data.status || 'agendada',
        is_shared: data.isShared || false,
        share_token: null,
        lawyer_phone: data.lawyerPhone || null,
        lawyer_email: data.lawyerEmail || null,
        required_documents: data.requiredDocuments || [],
      });
      
      setIsFormOpen(false);
      toast({
        title: "Audiência criada!",
        description: data.isShared 
          ? "A audiência foi criada e está pronta para ser compartilhada."
          : "A audiência foi criada com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao criar audiência",
        description: "Não foi possível criar a audiência.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (hearing: Hearing) => {
    setSelectedHearing(hearing);
    setIsFormOpen(true);
  };

  const handleUpdate = async (data: Partial<Hearing>) => {
    if (!selectedHearing) return;
    
    try {
      const updates: any = {};
      
      if (data.clientName) updates.client_name = data.clientName;
      if (data.clientEmail) updates.client_email = data.clientEmail;
      if (data.caseNumber) updates.case_number = data.caseNumber;
      if (data.court) updates.court = data.court;
      if (data.type) updates.type = data.type;
      if (data.dateTime) updates.date_time = data.dateTime.toISOString();
      if (data.location) updates.location = data.location;
      if (data.description) updates.description = data.description;
      if (data.notes !== undefined) updates.notes = data.notes;
      if (data.status) updates.status = data.status;
      if (data.isShared !== undefined) updates.is_shared = data.isShared;
      if (data.lawyerPhone !== undefined) updates.lawyer_phone = data.lawyerPhone;
      if (data.lawyerEmail !== undefined) updates.lawyer_email = data.lawyerEmail;
      if (data.requiredDocuments !== undefined) updates.required_documents = data.requiredDocuments;
      
      await updateHearing.mutateAsync({
        id: selectedHearing.id,
        ...updates,
      });
      
      setIsFormOpen(false);
      setSelectedHearing(null);
      toast({
        title: "Audiência atualizada!",
        description: "As alterações foram salvas com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao atualizar audiência",
        description: "Não foi possível atualizar a audiência.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta audiência?")) {
      try {
        await deleteHearing.mutateAsync(id);
        toast({
          title: "Audiência excluída",
          description: "A audiência foi removida com sucesso.",
        });
      } catch (error) {
        toast({
          title: "Erro ao excluir audiência",
          description: "Não foi possível excluir a audiência.",
          variant: "destructive",
        });
      }
    }
  };

  const handleShare = (hearing: Hearing) => {
    setSelectedHearing(hearing);
    setIsShareOpen(true);
  };

  const filteredHearings = hearings.filter(hearing => {
    const matchesSearch = hearing.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hearing.caseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || hearing.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold">Audiências</h1>
            <p className="text-sm md:text-base text-muted-foreground mt-1 md:mt-2">
              Gerencie e compartilhe informações de audiências com seus clientes
            </p>
          </div>
          
          <Button onClick={() => {
            setSelectedHearing(null);
            setIsFormOpen(true);
          }} className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Nova Audiência
          </Button>
        </div>

        <div className="flex gap-4 flex-col sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por cliente ou processo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Status</SelectItem>
              <SelectItem value="agendada">Agendadas</SelectItem>
              <SelectItem value="realizada">Realizadas</SelectItem>
              <SelectItem value="cancelada">Canceladas</SelectItem>
              <SelectItem value="adiada">Adiadas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Carregando audiências...</p>
          </div>
        ) : filteredHearings.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground mb-4">
              {searchTerm || statusFilter !== "all" 
                ? "Nenhuma audiência encontrada com os filtros aplicados."
                : "Nenhuma audiência cadastrada ainda."}
            </p>
            {!searchTerm && statusFilter === "all" && (
              <Button onClick={() => setIsFormOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Criar Primeira Audiência
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredHearings.map((hearing) => (
              <HearingCard
                key={hearing.id}
                hearing={hearing}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onShare={handleShare}
              />
            ))}
          </div>
        )}

        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="max-w-3xl w-[95vw] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedHearing ? "Editar Audiência" : "Nova Audiência"}
              </DialogTitle>
              <DialogDescription>
                Preencha as informações da audiência
              </DialogDescription>
            </DialogHeader>
            <HearingForm
              hearing={selectedHearing || undefined}
              onSubmit={selectedHearing ? handleUpdate : handleCreate}
              onCancel={() => {
                setIsFormOpen(false);
                setSelectedHearing(null);
              }}
            />
          </DialogContent>
        </Dialog>

        <HearingShareDialog
          hearing={selectedHearing}
          open={isShareOpen}
          onOpenChange={setIsShareOpen}
        />
      </div>
    </AdminLayout>
  );
}
