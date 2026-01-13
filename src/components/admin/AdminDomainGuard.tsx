import { Navigate, useLocation } from 'react-router-dom';
import { useAdminSubdomain } from '@/hooks/useAdminSubdomain';

interface AdminDomainGuardProps {
  children: React.ReactNode;
}

/**
 * Guards admin routes by checking if the current domain is allowed.
 * If not on an allowed admin domain, redirects to home page.
 */
export const AdminDomainGuard: React.FC<AdminDomainGuardProps> = ({ children }) => {
  const { isAllowed } = useAdminSubdomain();
  const location = useLocation();

  // If not on an allowed admin domain, redirect to home
  if (!isAllowed) {
    // Log for debugging (can be removed in production)
    console.warn(`Admin access blocked: Domain not authorized for admin routes.`);
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default AdminDomainGuard;
