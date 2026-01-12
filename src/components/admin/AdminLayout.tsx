import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { Menu } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile Header with menu trigger */}
          <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 md:hidden">
            <SidebarTrigger className="h-9 w-9">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menu</span>
            </SidebarTrigger>
            <span className="font-heading font-bold text-lg">Juris Company</span>
          </header>
          
          {/* Main content */}
          <main className="flex-1 p-4 md:p-6 bg-background overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};