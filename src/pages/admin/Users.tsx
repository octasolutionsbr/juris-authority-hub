import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminUsers() {
  const { toast } = useToast();

  const mockPendingUsers = [
    { id: 1, name: "Dr. Rafael Santos", email: "rafael@email.com", date: "27/11/2025" },
    { id: 2, name: "Dra. Marina Costa", email: "marina@email.com", date: "26/11/2025" },
  ];

  const mockApprovedUsers = [
    { id: 3, name: "Dr. Carlos Mendes", email: "carlos@email.com", role: "Admin", status: "Aprovado" },
    { id: 4, name: "Dra. Ana Silva", email: "ana@email.com", role: "Advogado", status: "Aprovado" },
  ];

  const handleApprove = (userId: number) => {
    toast({ title: "Usuário aprovado com sucesso!" });
  };

  const handleReject = (userId: number) => {
    toast({ title: "Usuário rejeitado", variant: "destructive" });
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
            {mockPendingUsers.length === 0 ? (
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
                  {mockPendingUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.date}</TableCell>
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Perfil</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockApprovedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === "Admin" ? "default" : "secondary"}>
                        {user.role === "Admin" && <Shield className="mr-1 h-3 w-3" />}
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="default">{user.status}</Badge>
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
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
