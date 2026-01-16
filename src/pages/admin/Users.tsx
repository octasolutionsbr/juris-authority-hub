import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, X, Ban, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { 
  usePendingProfiles, 
  useApprovedProfiles, 
  useApproveUser, 
  useRejectUser,
  useUpdateProfile,
  useUserRoles,
  useAddUserRole,
  useRemoveUserRole,
  useBlockUser,
  useDeleteUser,
  Profile
} from "@/hooks/useUsers";
import { useLinkUserToMember } from "@/hooks/useTeamManagement";
import { LinkUserDialog } from "@/components/admin/LinkUserDialog";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";

export default function AdminUsers() {
  const { toast } = useToast();
  const { isAdmin, isTecnico, hasAdminAccess } = useAuth();
  
  // Técnico pode aprovar/editar/vincular, mas não pode bloquear/excluir
  const canManageUsers = hasAdminAccess; // admin ou tecnico podem gerenciar
  const canDestroyUsers = isAdmin && !isTecnico; // apenas admin pode bloquear/excluir
  const [editingUser, setEditingUser] = useState<Profile | null>(null);
  const [editName, setEditName] = useState("");
  const [editRoles, setEditRoles] = useState<{ admin: boolean; lawyer: boolean; tecnico: boolean }>({
    admin: false,
    lawyer: false,
    tecnico: false,
  });
  
  // Link dialog state
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [pendingApprovalUser, setPendingApprovalUser] = useState<Profile | null>(null);
  
  const { data: pendingUsers = [], isLoading: loadingPending } = usePendingProfiles();
  const { data: approvedUsers = [], isLoading: loadingApproved } = useApprovedProfiles();
  const { data: userRoles = [] } = useUserRoles(editingUser?.id || "");
  const approveUser = useApproveUser();
  const rejectUser = useRejectUser();
  const updateProfile = useUpdateProfile();
  const addUserRole = useAddUserRole();
  const removeUserRole = useRemoveUserRole();
  const blockUser = useBlockUser();
  const deleteUser = useDeleteUser();
  const linkUserToMember = useLinkUserToMember();

  // Open link dialog when approving
  const handleApproveWithLink = (user: Profile) => {
    setPendingApprovalUser(user);
    setLinkDialogOpen(true);
  };

  // Handle approve and link
  const handleConfirmApproval = async (memberId: string | null) => {
    if (!pendingApprovalUser) return;
    
    try {
      // First approve the user
      await approveUser.mutateAsync(pendingApprovalUser.id);
      
      // If a member profile was selected, link it
      if (memberId) {
        await linkUserToMember.mutateAsync({
          memberId,
          userId: pendingApprovalUser.id,
        });
        toast({ title: "Usuário aprovado e vinculado ao perfil!" });
      } else {
        // Create a new team member for this user
        const { error } = await supabase
          .from('team_members')
          .insert({
            id: `lawyer-${pendingApprovalUser.id}`,
            name: pendingApprovalUser.name,
            title: 'Advogado',
            bio: '',
            role: 'advogado',
            user_id: pendingApprovalUser.id,
            published: false,
            order_index: 999,
          });

        if (error) throw error;
        toast({ title: "Usuário aprovado e novo perfil criado!" });
      }
      
      setLinkDialogOpen(false);
      setPendingApprovalUser(null);
    } catch (error) {
      toast({ 
        title: "Erro ao aprovar usuário",
        variant: "destructive" 
      });
    }
  };

  const handleReject = async (userId: string) => {
    if (confirm("Tem certeza que deseja rejeitar este usuário?")) {
      try {
        await rejectUser.mutateAsync(userId);
        toast({ title: "Usuário rejeitado", variant: "destructive" });
      } catch (error) {
        toast({ 
          title: "Erro ao rejeitar usuário",
          variant: "destructive" 
        });
      }
    }
  };

  const handleEdit = (user: Profile) => {
    setEditingUser(user);
    setEditName(user.name);
  };

  const handleBlock = async (userId: string, userName: string) => {
    if (confirm(`Tem certeza que deseja bloquear o acesso de ${userName}?`)) {
      try {
        await blockUser.mutateAsync(userId);
        toast({ title: "Usuário bloqueado com sucesso!" });
      } catch (error) {
        toast({ 
          title: "Erro ao bloquear usuário",
          variant: "destructive" 
        });
      }
    }
  };

  const handleDelete = async (userId: string, userName: string) => {
    if (confirm(`Tem certeza que deseja EXCLUIR permanentemente ${userName}? Esta ação não pode ser desfeita.`)) {
      try {
        await deleteUser.mutateAsync(userId);
        toast({ title: "Usuário excluído permanentemente", variant: "destructive" });
      } catch (error) {
        toast({ 
          title: "Erro ao excluir usuário",
          variant: "destructive" 
        });
      }
    }
  };

  // Atualizar roles quando o dialog abre
  useEffect(() => {
    if (editingUser && userRoles) {
      setEditRoles({
        admin: userRoles.includes('admin'),
        lawyer: userRoles.includes('lawyer'),
        tecnico: userRoles.includes('tecnico'),
      });
    }
  }, [editingUser, userRoles]);

  const handleSaveEdit = async () => {
    if (!editingUser) return;

    try {
      // Atualizar nome
      await updateProfile.mutateAsync({
        userId: editingUser.id,
        name: editName,
      });

      // Atualizar roles
      const currentRoles = userRoles;
      
      // Handle admin role
      if (editRoles.admin && !currentRoles.includes('admin')) {
        await addUserRole.mutateAsync({
          userId: editingUser.id,
          role: 'admin',
        });
      }
      if (!editRoles.admin && currentRoles.includes('admin')) {
        await removeUserRole.mutateAsync({
          userId: editingUser.id,
          role: 'admin',
        });
      }

      // Handle lawyer role
      if (editRoles.lawyer && !currentRoles.includes('lawyer')) {
        await addUserRole.mutateAsync({
          userId: editingUser.id,
          role: 'lawyer',
        });
      }
      if (!editRoles.lawyer && currentRoles.includes('lawyer')) {
        await removeUserRole.mutateAsync({
          userId: editingUser.id,
          role: 'lawyer',
        });
      }

      // Handle tecnico role
      if (editRoles.tecnico && !currentRoles.includes('tecnico')) {
        await addUserRole.mutateAsync({
          userId: editingUser.id,
          role: 'tecnico',
        });
      }
      if (!editRoles.tecnico && currentRoles.includes('tecnico')) {
        await removeUserRole.mutateAsync({
          userId: editingUser.id,
          role: 'tecnico',
        });
      }

      toast({ title: "Usuário atualizado com sucesso!" });
      setEditingUser(null);
    } catch (error) {
      toast({ 
        title: "Erro ao atualizar usuário",
        variant: "destructive" 
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-4 md:space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold">Gerenciar Usuários</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1 md:mt-2">
            Aprove ou rejeite solicitações de acesso ao painel
          </p>
        </div>

        {/* Usuários Pendentes */}
        <Card>
          <CardHeader className="px-4 md:px-6">
            <CardTitle className="text-lg md:text-xl">Solicitações Pendentes</CardTitle>
            <CardDescription>Usuários aguardando aprovação</CardDescription>
          </CardHeader>
          <CardContent className="px-0 md:px-6">
            {loadingPending ? (
              <p className="text-sm text-muted-foreground py-8 text-center">
                Carregando...
              </p>
            ) : pendingUsers.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">
                Nenhuma solicitação pendente
              </p>
            ) : (
              <>
                {/* Mobile Cards */}
                <div className="md:hidden space-y-3 px-4">
                  {pendingUsers.map((user) => (
                    <div key={user.id} className="border rounded-lg p-4 space-y-3">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(new Date(user.created_at), "dd/MM/yyyy", { locale: ptBR })}
                        </p>
                      </div>
                      {canManageUsers && (
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => handleApproveWithLink(user)}>
                            <Check className="mr-1 h-4 w-4" />
                            Aprovar
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => handleReject(user.id)}>
                            <X className="mr-1 h-4 w-4" />
                            Rejeitar
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Data Solicitação</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            {format(new Date(user.created_at), "dd/MM/yyyy", { locale: ptBR })}
                          </TableCell>
                          <TableCell className="text-right">
                            {canManageUsers && (
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" size="sm" onClick={() => handleApproveWithLink(user)}>
                                  <Check className="mr-1 h-4 w-4" />
                                  Aprovar
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => handleReject(user.id)}>
                                  <X className="mr-1 h-4 w-4" />
                                  Rejeitar
                                </Button>
                              </div>
                            )}
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

        {/* Usuários Aprovados */}
        <Card>
          <CardHeader className="px-4 md:px-6">
            <CardTitle className="text-lg md:text-xl">Usuários Ativos</CardTitle>
            <CardDescription>Usuários com acesso ao painel administrativo</CardDescription>
          </CardHeader>
          <CardContent className="px-0 md:px-6">
            {loadingApproved ? (
              <p className="text-sm text-muted-foreground py-8 text-center">
                Carregando...
              </p>
            ) : approvedUsers.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">
                Nenhum usuário aprovado ainda
              </p>
            ) : (
              <>
                {/* Mobile Cards */}
                <div className="md:hidden space-y-3 px-4">
                  {approvedUsers.map((user) => (
                    <div key={user.id} className="border rounded-lg p-4 space-y-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{user.name}</p>
                          <Badge variant="default" className="text-xs">Aprovado</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {canManageUsers && (
                          <Button variant="outline" size="sm" onClick={() => handleEdit(user)}>
                            Editar
                          </Button>
                        )}
                        {canDestroyUsers && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-amber-600"
                              onClick={() => handleBlock(user.id, user.name)}
                            >
                              <Ban className="h-4 w-4 mr-1" />
                              Bloquear
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-destructive"
                              onClick={() => handleDelete(user.id, user.name)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Excluir
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {approvedUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant="default">Aprovado</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              {canManageUsers && (
                                <Button variant="ghost" size="sm" onClick={() => handleEdit(user)}>
                                  Editar
                                </Button>
                              )}
                              {canDestroyUsers && (
                                <>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                                    onClick={() => handleBlock(user.id, user.name)}
                                  >
                                    <Ban className="mr-1 h-4 w-4" />
                                    Bloquear
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                    onClick={() => handleDelete(user.id, user.name)}
                                  >
                                    <Trash2 className="mr-1 h-4 w-4" />
                                    Excluir
                                  </Button>
                                </>
                              )}
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

      {/* Dialog de Edição */}
      <Dialog open={!!editingUser} onOpenChange={(open) => !open && setEditingUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
            <DialogDescription>
              Altere o nome e as permissões do usuário
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nome</Label>
              <Input
                id="edit-name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Permissões</Label>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="role-admin"
                    checked={editRoles.admin}
                    onCheckedChange={(checked) => 
                      setEditRoles({ ...editRoles, admin: checked as boolean })
                    }
                  />
                  <label
                    htmlFor="role-admin"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Administrador
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="role-lawyer"
                    checked={editRoles.lawyer}
                    onCheckedChange={(checked) => 
                      setEditRoles({ ...editRoles, lawyer: checked as boolean })
                    }
                  />
                  <label
                    htmlFor="role-lawyer"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Advogado
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="role-tecnico"
                    checked={editRoles.tecnico}
                    onCheckedChange={(checked) => 
                      setEditRoles({ ...editRoles, tecnico: checked as boolean })
                    }
                  />
                  <label
                    htmlFor="role-tecnico"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Técnico (invisível para outros usuários)
                  </label>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingUser(null)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Link User Dialog */}
      <LinkUserDialog
        open={linkDialogOpen}
        onOpenChange={setLinkDialogOpen}
        user={pendingApprovalUser}
        onLink={handleConfirmApproval}
        isLinking={approveUser.isPending || linkUserToMember.isPending}
      />
    </AdminLayout>
  );
}
