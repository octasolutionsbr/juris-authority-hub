import { LayoutDashboard, User, Briefcase, Users, LogOut } from "lucide-react";
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
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export function AdminSidebar() {
  const { state } = useSidebar();
  const { isAdmin, logout, user } = useAuth();
  const isCollapsed = state === "collapsed";

  const menuItems = [
    { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
    { title: "Meu Perfil", url: "/admin/profile", icon: User },
    { title: "Anúncios", url: "/admin/listings", icon: Briefcase },
  ];

  if (isAdmin) {
    menuItems.push({ title: "Usuários", url: "/admin/users", icon: Users });
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarTrigger className="m-2 self-end" />

      <SidebarContent>
        <div className="px-4 py-2 mb-4">
          <h2 className={isCollapsed ? "text-xs" : "text-lg font-heading font-bold"}>
            {isCollapsed ? "JC" : "Juris Company"}
          </h2>
          {!isCollapsed && user && (
            <p className="text-xs text-muted-foreground mt-1">{user.name}</p>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className="hover:bg-muted/50" 
                      activeClassName="bg-muted text-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4">
          <Button 
            onClick={logout} 
            variant="outline" 
            className="w-full"
            size={isCollapsed ? "icon" : "default"}
          >
            <LogOut className={isCollapsed ? "" : "mr-2 h-4 w-4"} />
            {!isCollapsed && "Sair"}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
