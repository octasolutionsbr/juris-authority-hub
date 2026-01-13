import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Briefcase, User, Users, Calendar, FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const { user, isAdmin, isTecnico, hasAdminAccess } = useAuth();

  // Fetch user's team member profile status
  const { data: teamMember, isLoading: loadingProfile } = useQuery({
    queryKey: ['team-member-profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data, error } = await supabase
        .from('team_members')
        .select('id, name, bio, photo_url')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id && !isTecnico,
  });

  // Fetch user's listings count
  const { data: listingsCount = 0, isLoading: loadingListings } = useQuery({
    queryKey: ['listings-count', user?.id],
    queryFn: async () => {
      if (!user?.id) return 0;
      const { count, error } = await supabase
        .from('listings')
        .select('*', { count: 'exact', head: true })
        .eq('created_by', user.id);
      
      if (error) throw error;
      return count || 0;
    },
    enabled: !!user?.id && !isTecnico,
  });

  // Fetch user's hearings count
  const { data: hearingsCount = 0, isLoading: loadingHearings } = useQuery({
    queryKey: ['hearings-count', user?.id],
    queryFn: async () => {
      if (!user?.id) return 0;
      const { count, error } = await supabase
        .from('hearings')
        .select('*', { count: 'exact', head: true })
        .eq('lawyer_id', user.id);
      
      if (error) throw error;
      return count || 0;
    },
    enabled: !!user?.id && !isTecnico,
  });

  // Fetch pending users count (admin/tecnico only)
  const { data: pendingUsersCount = 0, isLoading: loadingPending } = useQuery({
    queryKey: ['pending-users-count'],
    queryFn: async () => {
      // First get tecnico user IDs to exclude them
      const { data: tecnicoRoles } = await supabase
        .from('user_roles')
        .select('user_id')
        .eq('role', 'tecnico');

      const tecnicoIds = tecnicoRoles?.map(r => r.user_id) || [];

      let query = supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('approved', false);

      if (tecnicoIds.length > 0) {
        query = query.not('id', 'in', `(${tecnicoIds.join(',')})`);
      }

      const { count, error } = await query;
      
      if (error) throw error;
      return count || 0;
    },
    enabled: hasAdminAccess,
  });

  // Fetch total team members count (admin/tecnico only)
  const { data: teamMembersCount = 0, isLoading: loadingTeam } = useQuery({
    queryKey: ['team-members-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('team_members')
        .select('*', { count: 'exact', head: true });
      
      if (error) throw error;
      return count || 0;
    },
    enabled: hasAdminAccess,
  });

  // Fetch total active listings count (admin/tecnico only)
  const { data: totalListingsCount = 0, isLoading: loadingTotalListings } = useQuery({
    queryKey: ['total-listings-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('listings')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'available');
      
      if (error) throw error;
      return count || 0;
    },
    enabled: hasAdminAccess,
  });

  // Determine profile status
  const getProfileStatus = () => {
    if (loadingProfile) return "...";
    if (!teamMember) return "Não criado";
    if (!teamMember.bio || !teamMember.photo_url) return "Incompleto";
    return "Completo";
  };

  const isLoading = loadingProfile || loadingListings || loadingHearings || loadingPending || loadingTeam || loadingTotalListings;

  // Stats for regular lawyers
  const lawyerStats = [
    { 
      title: "Meu Perfil", 
      value: getProfileStatus(), 
      icon: User, 
      color: teamMember?.bio && teamMember?.photo_url ? "text-green-600" : "text-amber-600",
      href: "/admin/profile"
    },
    { 
      title: "Meus Anúncios", 
      value: listingsCount.toString(), 
      icon: Briefcase, 
      color: "text-blue-600",
      href: "/admin/listings"
    },
    { 
      title: "Minhas Audiências", 
      value: hearingsCount.toString(), 
      icon: Calendar, 
      color: "text-purple-600",
      href: "/admin/hearings"
    },
  ];

  // Stats for admin/tecnico
  const adminStats = [
    { 
      title: "Membros da Equipe", 
      value: teamMembersCount.toString(), 
      icon: Users, 
      color: "text-blue-600",
      href: "/admin/team"
    },
    { 
      title: "Anúncios Ativos", 
      value: totalListingsCount.toString(), 
      icon: FileText, 
      color: "text-green-600",
      href: hasAdminAccess && !isTecnico ? "/admin/listings" : undefined
    },
    { 
      title: "Usuários Pendentes", 
      value: pendingUsersCount.toString(), 
      icon: User, 
      color: pendingUsersCount > 0 ? "text-orange-600" : "text-muted-foreground",
      href: "/admin/users"
    },
  ];

  // Combine stats based on role
  const stats = isTecnico ? adminStats : (hasAdminAccess ? [...lawyerStats, ...adminStats] : lawyerStats);

  return (
    <AdminLayout>
      <div className="space-y-4 md:space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold">Dashboard</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1 md:mt-2">
            Bem-vindo(a), {user?.name}
          </p>
        </div>

        <div className="grid gap-3 md:gap-4 grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.title} className={stat.href ? "hover:bg-muted/50 transition-colors" : ""}>
              {stat.href ? (
                <Link to={stat.href} className="block">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 md:px-6">
                    <CardTitle className="text-xs md:text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent className="px-4 md:px-6">
                    {isLoading ? (
                      <Skeleton className="h-7 w-12" />
                    ) : (
                      <div className="text-xl md:text-2xl font-bold">{stat.value}</div>
                    )}
                  </CardContent>
                </Link>
              ) : (
                <>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 md:px-6">
                    <CardTitle className="text-xs md:text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent className="px-4 md:px-6">
                    {isLoading ? (
                      <Skeleton className="h-7 w-12" />
                    ) : (
                      <div className="text-xl md:text-2xl font-bold">{stat.value}</div>
                    )}
                  </CardContent>
                </>
              )}
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>Acesse as principais funcionalidades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {!isTecnico && (
                  <>
                    <Link to="/admin/profile" className="block p-3 rounded-md hover:bg-muted transition-colors">
                      <p className="font-medium">Editar Perfil</p>
                      <p className="text-sm text-muted-foreground">Atualize suas informações</p>
                    </Link>
                    <Link to="/admin/listings" className="block p-3 rounded-md hover:bg-muted transition-colors">
                      <p className="font-medium">Gerenciar Anúncios</p>
                      <p className="text-sm text-muted-foreground">Crie ou edite seus anúncios</p>
                    </Link>
                    <Link to="/admin/hearings" className="block p-3 rounded-md hover:bg-muted transition-colors">
                      <p className="font-medium">Gerenciar Audiências</p>
                      <p className="text-sm text-muted-foreground">Agende e compartilhe audiências</p>
                    </Link>
                  </>
                )}
                {hasAdminAccess && (
                  <>
                    <Link to="/admin/team" className="block p-3 rounded-md hover:bg-muted transition-colors">
                      <p className="font-medium">Gerenciar Equipe</p>
                      <p className="text-sm text-muted-foreground">Edite perfis da equipe</p>
                    </Link>
                    <Link to="/admin/users" className="block p-3 rounded-md hover:bg-muted transition-colors">
                      <p className="font-medium">{isTecnico ? "Ver Usuários" : "Aprovar Usuários"}</p>
                      <p className="text-sm text-muted-foreground">
                        {isTecnico ? "Visualize solicitações de acesso" : "Gerencie solicitações de acesso"}
                      </p>
                    </Link>
                    <Link to="/admin/settings" className="block p-3 rounded-md hover:bg-muted transition-colors">
                      <p className="font-medium">Configurações</p>
                      <p className="text-sm text-muted-foreground">Modo manutenção e outras opções</p>
                    </Link>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resumo do Sistema</CardTitle>
              <CardDescription>Informações gerais</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {hasAdminAccess && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total de membros</span>
                      {loadingTeam ? (
                        <Skeleton className="h-5 w-8" />
                      ) : (
                        <span className="font-medium">{teamMembersCount}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Anúncios disponíveis</span>
                      {loadingTotalListings ? (
                        <Skeleton className="h-5 w-8" />
                      ) : (
                        <span className="font-medium">{totalListingsCount}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Aprovações pendentes</span>
                      {loadingPending ? (
                        <Skeleton className="h-5 w-8" />
                      ) : (
                        <span className={`font-medium ${pendingUsersCount > 0 ? 'text-orange-600' : ''}`}>
                          {pendingUsersCount}
                        </span>
                      )}
                    </div>
                  </>
                )}
                {!isTecnico && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Seus anúncios</span>
                      {loadingListings ? (
                        <Skeleton className="h-5 w-8" />
                      ) : (
                        <span className="font-medium">{listingsCount}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Suas audiências</span>
                      {loadingHearings ? (
                        <Skeleton className="h-5 w-8" />
                      ) : (
                        <span className="font-medium">{hearingsCount}</span>
                      )}
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
