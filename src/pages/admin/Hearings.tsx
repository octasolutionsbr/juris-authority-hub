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

export default function AdminHearings() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [selectedHearing, setSelectedHearing] = useState<Hearing | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Mock data - will be replaced with real data from backend
  const [hearings, setHearings] = useState<Hearing[]>([
    {
      id: "1",
      clientName: "João Silva",
      clientEmail: "joao@example.com",
      caseNumber: "0001234-56.2024.8.26.0100",
      court: "1ª Vara Cível - Fórum Central",
      type: "Conciliação",
      dateTime: new Date(2024, 11, 15, 10, 0),
      location: "Av. Brigadeiro Luís Antônio, 500 - 3º andar",
      description: "Audiência de conciliação para resolução amigável do conflito",
      notes: "Por favor, chegar 15 minutos antes. Trazer documentos de identificação.",
      status: "agendada",
      isShared: true,
      shareToken: "abc123",
      lawyerId: user?.id || "1",
      lawyerName: user?.name || "Advogado",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      clientName: "Maria Santos",
      clientEmail: "maria@example.com",
      caseNumber: "0007890-12.2024.8.26.0100",
      court: "5ª Vara Cível - Fórum João Mendes Jr.",
      type: "Instrução",
      dateTime: new Date(2024, 11, 20, 14, 30),
      location: "Rua Figueira de Melo, 15 - 2º andar",
      description: "Audiência de instrução e julgamento - oitiva de testemunhas",
      notes: "Audiência com duração estimada de 2 horas. É importante estar preparado para responder questionamentos.",
      status: "agendada",
      isShared: false,
      lawyerId: user?.id || "1",
      lawyerName: user?.name || "Advogado",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const handleCreate = (data: Partial<Hearing>) => {
    const newHearing: Hearing = {
      id: Date.now().toString(),
      ...data as Hearing,
      shareToken: data.isShared ? Math.random().toString(36).substring(7) : undefined,
      lawyerId: user?.id || "1",
      lawyerName: user?.name || "Advogado",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setHearings([...hearings, newHearing]);
    setIsFormOpen(false);
    toast({
      title: "Audiência criada!",
      description: data.isShared 
        ? "A audiência foi criada e está pronta para ser compartilhada."
        : "A audiência foi criada com sucesso.",
    });
  };

  const handleEdit = (hearing: Hearing) => {
    setSelectedHearing(hearing);
    setIsFormOpen(true);
  };

  const handleUpdate = (data: Partial<Hearing>) => {
    if (!selectedHearing) return;
    
    setHearings(hearings.map(h => 
      h.id === selectedHearing.id 
        ? { 
            ...h, 
            ...data, 
            shareToken: data.isShared && !h.shareToken 
              ? Math.random().toString(36).substring(7) 
              : h.shareToken,
            updatedAt: new Date() 
          }
        : h
    ));
    
    setIsFormOpen(false);
    setSelectedHearing(null);
    toast({
      title: "Audiência atualizada!",
      description: "As alterações foram salvas com sucesso.",
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta audiência?")) {
      setHearings(hearings.filter(h => h.id !== id));
      toast({
        title: "Audiência excluída",
        description: "A audiência foi removida com sucesso.",
      });
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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold">Audiências</h1>
            <p className="text-muted-foreground mt-2">
              Gerencie e compartilhe informações de audiências com seus clientes
            </p>
          </div>
          
          <Button onClick={() => {
            setSelectedHearing(null);
            setIsFormOpen(true);
          }}>
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

        {filteredHearings.length === 0 ? (
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
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
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
