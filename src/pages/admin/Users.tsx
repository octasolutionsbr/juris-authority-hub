import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { usePendingProfiles, useApprovedProfiles, useApproveUser, useRejectUser } from "@/hooks/useUsers";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function AdminUsers() {
  const { toast } = useToast();
  
  const { data: pendingUsers = [], isLoading: loadingPending } = usePendingProfiles();
  const { data: approvedUsers = [], isLoading: loadingApproved } = useApprovedProfiles();
  const approveUser = useApproveUser();
  const rejectUser = useRejectUser();

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
                        <Button variant="ghost" size="sm">
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
    </AdminLayout>
  );
}
