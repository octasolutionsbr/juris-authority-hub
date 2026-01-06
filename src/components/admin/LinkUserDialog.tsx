import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2, Link2, UserPlus } from "lucide-react";
import { useUnlinkedTeamMembers } from "@/hooks/useTeamManagement";
import type { Profile } from "@/hooks/useUsers";

interface LinkUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: Profile | null;
  onLink: (memberId: string | null) => Promise<void>;
  isLinking?: boolean;
}

export function LinkUserDialog({ open, onOpenChange, user, onLink, isLinking }: LinkUserDialogProps) {
  const { data: unlinkedMembers = [], isLoading } = useUnlinkedTeamMembers();
  const [selectedMemberId, setSelectedMemberId] = useState<string>("new");

  const handleConfirm = async () => {
    await onLink(selectedMemberId === "new" ? null : selectedMemberId);
    setSelectedMemberId("new");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Link2 className="h-5 w-5" />
            Aprovar e Vincular Usuário
          </DialogTitle>
          <DialogDescription>
            Vincule <strong>{user?.name}</strong> a um perfil de equipe existente ou crie um novo.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Vincular ao perfil de equipe:</Label>
            {isLoading ? (
              <div className="flex items-center gap-2 p-3 border rounded-lg">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm text-muted-foreground">Carregando perfis...</span>
              </div>
            ) : (
              <Select value={selectedMemberId} onValueChange={setSelectedMemberId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um perfil" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">
                    <span className="flex items-center gap-2">
                      <UserPlus className="h-4 w-4" />
                      Criar novo perfil de equipe
                    </span>
                  </SelectItem>
                  {unlinkedMembers.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      <span className="flex flex-col">
                        <span>{member.name}</span>
                        {member.main_area && (
                          <span className="text-xs text-muted-foreground">
                            {member.title}
                          </span>
                        )}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {selectedMemberId !== "new" && (
            <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
              O usuário poderá editar este perfil através do menu "Meu Perfil".
            </p>
          )}

          {selectedMemberId === "new" && (
            <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
              Um novo perfil de equipe será criado para este usuário. Ele poderá completar seus dados em "Meu Perfil".
            </p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm} disabled={isLinking}>
            {isLinking ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Aprovando...
              </>
            ) : (
              "Aprovar e Vincular"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
