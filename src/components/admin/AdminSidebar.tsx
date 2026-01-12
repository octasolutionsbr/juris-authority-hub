import { LayoutDashboard, User, Briefcase, Users, Users2, Calendar, LogOut, Settings } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export function AdminSidebar() {
  const { state, setOpenMobile } = useSidebar();
  const { isAdmin, logout, user } = useAuth();
  const isCollapsed = state === "collapsed";

  const menuItems = [
    { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
    { title: "Meu Perfil", url: "/admin/profile", icon: User },
    { title: "Anúncios", url: "/admin/listings", icon: Briefcase },
    { title: "Audiências", url: "/admin/hearings", icon: Calendar },
    { title: "Configurações", url: "/admin/settings", icon: Settings },
  ];

  if (isAdmin) {
    menuItems.push({ title: "Equipe", url: "/admin/team", icon: Users2 });
    menuItems.push({ title: "Usuários", url: "/admin/users", icon: Users });
  }

  const handleNavClick = () => {
    // Close mobile sidebar when navigating
    setOpenMobile(false);
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="px-2 py-3">
          <h2 className={isCollapsed ? "text-xs text-center" : "text-lg font-heading font-bold"}>
            {isCollapsed ? "JC" : "Juris Company"}
          </h2>
          {!isCollapsed && user && (
            <p className="text-xs text-muted-foreground mt-1 truncate">{user.name}</p>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink 
                      to={item.url} 
                      end 
                      className="hover:bg-muted/50" 
                      activeClassName="bg-muted text-primary font-medium"
                      onClick={handleNavClick}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!isCollapsed && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <Button 
          onClick={() => {
            logout();
            setOpenMobile(false);
          }} 
          variant="outline" 
          className="w-full"
          size={isCollapsed ? "icon" : "default"}
        >
          <LogOut className={isCollapsed ? "h-4 w-4" : "mr-2 h-4 w-4"} />
          {!isCollapsed && "Sair"}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}