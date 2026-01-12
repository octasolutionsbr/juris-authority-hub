import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Pencil, Trash2, Link2, Unlink, Loader2, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  useAllTeamMembers, 
  useCreateTeamMember, 
  useUpdateTeamMember, 
  useDeleteTeamMember,
  useLinkUserToMember,
  useUnlinkUserFromMember,
  useUnlinkedUsers 
} from "@/hooks/useTeamManagement";
import { TeamMemberForm, TeamMemberFormData } from "@/components/admin/TeamMemberForm";
import type { TeamMember } from "@/hooks/useTeamMembers";

export default function AdminTeam() {
  const { toast } = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [linkingMember, setLinkingMember] = useState<TeamMember | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  
  const { data: members = [], isLoading } = useAllTeamMembers();
  const { data: unlinkedUsers = [] } = useUnlinkedUsers();
  
  const createMember = useCreateTeamMember();
  const updateMember = useUpdateTeamMember();
  const deleteMember = useDeleteTeamMember();
  const linkUser = useLinkUserToMember();
  const unlinkUser = useUnlinkUserFromMember();

  const handleCreate = () => {
    setEditingMember(null);
    setFormOpen(true);
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormOpen(true);
  };

  const handleDelete = async (member: TeamMember) => {
    if (!confirm(`Tem certeza que deseja excluir ${member.name}?`)) return;
    
    try {
      await deleteMember.mutateAsync(member.id);
      toast({ title: "Membro excluído com sucesso!" });
    } catch (error) {
      toast({ title: "Erro ao excluir membro", variant: "destructive" });
    }
  };

  const handleSave = async (data: TeamMemberFormData) => {
    try {
      if (editingMember) {
        await updateMember.mutateAsync({ id: editingMember.id, ...data });
        toast({ title: "Membro atualizado com sucesso!" });
      } else {
        await createMember.mutateAsync(data);
        toast({ title: "Membro criado com sucesso!" });
      }
      setFormOpen(false);
      setEditingMember(null);
    } catch (error) {
      toast({ title: "Erro ao salvar membro", variant: "destructive" });
    }
  };

  const handleOpenLinkDialog = (member: TeamMember) => {
    setLinkingMember(member);
    setSelectedUserId("");
    setLinkDialogOpen(true);
  };

  const handleLinkUser = async () => {
    if (!linkingMember || !selectedUserId) return;
    
    try {
      await linkUser.mutateAsync({ memberId: linkingMember.id, userId: selectedUserId });
      toast({ title: "Usuário vinculado com sucesso!" });
      setLinkDialogOpen(false);
      setLinkingMember(null);
    } catch (error) {
      toast({ title: "Erro ao vincular usuário", variant: "destructive" });
    }
  };

  const handleUnlinkUser = async (member: TeamMember) => {
    if (!confirm(`Tem certeza que deseja desvincular o usuário de ${member.name}?`)) return;
    
    try {
      await unlinkUser.mutateAsync(member.id);
      toast({ title: "Usuário desvinculado com sucesso!" });
    } catch (error) {
      toast({ title: "Erro ao desvincular usuário", variant: "destructive" });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold">Gerenciar Equipe</h1>
            <p className="text-sm md:text-base text-muted-foreground mt-1 md:mt-2">
              Crie e gerencie os perfis dos membros da equipe
            </p>
          </div>
          <Button onClick={handleCreate} className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Novo Membro
          </Button>
        </div>

        <Card>
          <CardHeader className="px-4 md:px-6">
            <CardTitle className="text-lg md:text-xl">Membros da Equipe</CardTitle>
            <CardDescription>
              {members.length} membro(s) cadastrado(s)
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0 md:px-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : members.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center px-4">
                Nenhum membro cadastrado ainda
              </p>
            ) : (
              <>
                {/* Mobile Cards */}
                <div className="md:hidden space-y-3 px-4">
                  {members.map((member) => (
                    <div key={member.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-12 w-12 shrink-0">
                          <AvatarImage src={member.photo_url || undefined} alt={member.name} />
                          <AvatarFallback>
                            <User className="h-6 w-6" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{member.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{member.email || member.title}</p>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {member.published ? (
                              <Badge variant="default" className="text-xs">Publicado</Badge>
                            ) : (
                              <Badge variant="secondary" className="text-xs">Oculto</Badge>
                            )}
                            {member.user_id ? (
                              <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
                                <Link2 className="mr-1 h-3 w-3" />
                                Vinculado
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-muted-foreground text-xs">
                                Não vinculado
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2 border-t">
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(member)}>
                          <Pencil className="h-4 w-4 mr-1" />
                          Editar
                        </Button>
                        {member.user_id ? (
                          <Button variant="outline" size="sm" onClick={() => handleUnlinkUser(member)} className="text-amber-600">
                            <Unlink className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" onClick={() => handleOpenLinkDialog(member)} disabled={unlinkedUsers.length === 0}>
                            <Link2 className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="outline" size="sm" onClick={() => handleDelete(member)} className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Membro</TableHead>
                        <TableHead>Área Principal</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Vinculado</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                <TableBody>
                  {members.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={member.photo_url || undefined} alt={member.name} />
                            <AvatarFallback>
                              <User className="h-5 w-5" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            {member.email && (
                              <p className="text-xs text-muted-foreground">{member.email}</p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{member.title || "—"}</span>
                      </TableCell>
                      <TableCell>
                        {member.published ? (
                          <Badge variant="default">Publicado</Badge>
                        ) : (
                          <Badge variant="secondary">Oculto</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {member.user_id ? (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            <Link2 className="mr-1 h-3 w-3" />
                            Sim
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-muted-foreground">
                            Não
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEdit(member)}
                            title="Editar"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          
                          {member.user_id ? (
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleUnlinkUser(member)}
                              title="Desvincular usuário"
                              className="text-amber-600 hover:text-amber-700"
                            >
                              <Unlink className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleOpenLinkDialog(member)}
                              title="Vincular usuário"
                              disabled={unlinkedUsers.length === 0}
                            >
                              <Link2 className="h-4 w-4" />
                            </Button>
                          )}
                          
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDelete(member)}
                            title="Excluir"
                            className="text-destructive hover:text-destructive"
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

        {/* Info about unlinked users */}
        {unlinkedUsers.length > 0 && (
          <Card className="border-blue-200 bg-blue-50/50">
            <CardContent className="pt-6">
              <p className="text-sm text-blue-800">
                <strong>{unlinkedUsers.length}</strong> usuário(s) aprovado(s) sem perfil de equipe vinculado.
                Você pode vinculá-los a perfis existentes usando o botão <Link2 className="inline h-4 w-4" />.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Form Dialog */}
      <TeamMemberForm
        open={formOpen}
        onOpenChange={setFormOpen}
        member={editingMember}
        onSave={handleSave}
        isSaving={createMember.isPending || updateMember.isPending}
      />

      {/* Link User Dialog */}
      <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Vincular Usuário</DialogTitle>
            <DialogDescription>
              Selecione um usuário aprovado para vincular ao perfil de <strong>{linkingMember?.name}</strong>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Usuário</Label>
              <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um usuário" />
                </SelectTrigger>
                <SelectContent>
                  {unlinkedUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      <span className="flex flex-col">
                        <span>{user.name}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
              Após vincular, o usuário poderá editar este perfil através do menu "Meu Perfil".
            </p>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setLinkDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleLinkUser} disabled={!selectedUserId || linkUser.isPending}>
              {linkUser.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Vinculando...
                </>
              ) : (
                "Vincular"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
