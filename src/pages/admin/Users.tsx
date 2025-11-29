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
import { Check, X, Shield } from "lucide-react";
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
  Profile
} from "@/hooks/useUsers";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function AdminUsers() {
  const { toast } = useToast();
  const [editingUser, setEditingUser] = useState<Profile | null>(null);
  const [editName, setEditName] = useState("");
  const [editRoles, setEditRoles] = useState<{ admin: boolean; lawyer: boolean }>({
    admin: false,
    lawyer: false,
  });
  
  const { data: pendingUsers = [], isLoading: loadingPending } = usePendingProfiles();
  const { data: approvedUsers = [], isLoading: loadingApproved } = useApprovedProfiles();
  const { data: userRoles = [] } = useUserRoles(editingUser?.id || "");
  const approveUser = useApproveUser();
  const rejectUser = useRejectUser();
  const updateProfile = useUpdateProfile();
  const addUserRole = useAddUserRole();
  const removeUserRole = useRemoveUserRole();

  const handleApprove = async (userId: string) => {
    try {
      await approveUser.mutateAsync(userId);
      toast({ title: "Usuário aprovado com sucesso!" });
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

  // Atualizar roles quando o dialog abre
  useEffect(() => {
    if (editingUser && userRoles) {
      setEditRoles({
        admin: userRoles.includes('admin'),
        lawyer: userRoles.includes('lawyer'),
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
      
      // Adicionar role admin se marcado e não existe
      if (editRoles.admin && !currentRoles.includes('admin')) {
        await addUserRole.mutateAsync({
          userId: editingUser.id,
          role: 'admin',
        });
      }
      
      // Remover role admin se desmarcado e existe
      if (!editRoles.admin && currentRoles.includes('admin')) {
        await removeUserRole.mutateAsync({
          userId: editingUser.id,
          role: 'admin',
        });
      }

      // Adicionar role lawyer se marcado e não existe
      if (editRoles.lawyer && !currentRoles.includes('lawyer')) {
        await addUserRole.mutateAsync({
          userId: editingUser.id,
          role: 'lawyer',
        });
      }
      
      // Remover role lawyer se desmarcado e existe
      if (!editRoles.lawyer && currentRoles.includes('lawyer')) {
        await removeUserRole.mutateAsync({
          userId: editingUser.id,
          role: 'lawyer',
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
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-heading font-bold">Gerenciar Usuários</h1>
          <p className="text-muted-foreground mt-2">
            Aprove ou rejeite solicitações de acesso ao painel
          </p>
        </div>

        {/* Usuários Pendentes */}
        <Card>
          <CardHeader>
            <CardTitle>Solicitações Pendentes</CardTitle>
            <CardDescription>Usuários aguardando aprovação</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingPending ? (
              <p className="text-sm text-muted-foreground py-8 text-center">
                Carregando...
              </p>
            ) : pendingUsers.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">
                Nenhuma solicitação pendente
              </p>
            ) : (
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
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleApprove(user.id)}
                          >
                            <Check className="mr-1 h-4 w-4" />
                            Aprovar
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleReject(user.id)}
                          >
                            <X className="mr-1 h-4 w-4" />
                            Rejeitar
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

        {/* Usuários Aprovados */}
        <Card>
          <CardHeader>
            <CardTitle>Usuários Ativos</CardTitle>
            <CardDescription>Usuários com acesso ao painel administrativo</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingApproved ? (
              <p className="text-sm text-muted-foreground py-8 text-center">
                Carregando...
              </p>
            ) : approvedUsers.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">
                Nenhum usuário aprovado ainda
              </p>
            ) : (
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
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEdit(user)}
                        >
                          Editar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
    </AdminLayout>
  );
}
