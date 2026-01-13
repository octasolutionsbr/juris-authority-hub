/**
 * Hook to verify if the current domain is allowed to access admin routes.
 * This restricts admin panel access to specific subdomains only.
 */

const ALLOWED_ADMIN_DOMAINS = [
  'admin.juriscompany.net',  // Production subdomain
  'localhost',               // Local development
];

// Regex patterns for allowed domains (Lovable preview/deploy domains)
const ALLOWED_ADMIN_PATTERNS = [
  /.*\.lovableproject\.com$/,  // Lovable preview
  /.*\.lovable\.app$/,         // Lovable deploy
  /^127\.0\.0\.1$/,            // Local IP
];

export const useAdminSubdomain = () => {
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  
  // Check exact domain matches
  if (ALLOWED_ADMIN_DOMAINS.includes(hostname)) {
    return { isAllowed: true, hostname };
  }
  
  // Check regex patterns
  for (const pattern of ALLOWED_ADMIN_PATTERNS) {
    if (pattern.test(hostname)) {
      return { isAllowed: true, hostname };
    }
  }
  
  return { isAllowed: false, hostname };
};

export default useAdminSubdomain;
