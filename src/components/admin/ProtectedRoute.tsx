import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireAdminOrTecnico?: boolean;
  requireTecnico?: boolean;
  denyTecnico?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false,
  requireAdminOrTecnico = false,
  requireTecnico = false,
  denyTecnico = false,
}) => {
  const { isAuthenticated, isAdmin, isTecnico, hasAdminAccess, loading } = useAuth();

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Verificando autenticação...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // Deny tecnico access to specific routes
  if (denyTecnico && isTecnico) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Require tecnico role (exclusive)
  if (requireTecnico && !isTecnico) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (requireAdminOrTecnico && !hasAdminAccess) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
};