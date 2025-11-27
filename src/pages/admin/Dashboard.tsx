import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Briefcase, User, Users, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const { user, isAdmin } = useAuth();

  const stats = [
    { title: "Perfil", value: "Completo", icon: User, color: "text-blue-600" },
    { title: "Anúncios Ativos", value: "3", icon: Briefcase, color: "text-green-600" },
    { title: "Visualizações", value: "127", icon: TrendingUp, color: "text-purple-600" },
  ];

  if (isAdmin) {
    stats.push({ title: "Usuários Pendentes", value: "2", icon: Users, color: "text-orange-600" });
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-heading font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Bem-vindo(a), {user?.name}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
              <CardDescription>Suas últimas ações no painel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <p className="text-sm">Perfil atualizado - Há 2 horas</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <p className="text-sm">Novo anúncio criado - Há 1 dia</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                  <p className="text-sm">Foto de perfil alterada - Há 3 dias</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>Acesse as principais funcionalidades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <a href="/admin/profile" className="block p-3 rounded-md hover:bg-muted transition-colors">
                  <p className="font-medium">Editar Perfil</p>
                  <p className="text-sm text-muted-foreground">Atualize suas informações</p>
                </a>
                <a href="/admin/listings" className="block p-3 rounded-md hover:bg-muted transition-colors">
                  <p className="font-medium">Gerenciar Anúncios</p>
                  <p className="text-sm text-muted-foreground">Crie ou edite seus anúncios</p>
                </a>
                {isAdmin && (
                  <a href="/admin/users" className="block p-3 rounded-md hover:bg-muted transition-colors">
                    <p className="font-medium">Aprovar Usuários</p>
                    <p className="text-sm text-muted-foreground">Gerencie solicitações de acesso</p>
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
