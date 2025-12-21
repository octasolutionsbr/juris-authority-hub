import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs = ({ items, className = "" }: BreadcrumbsProps) => {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`flex items-center text-sm ${className}`}
    >
      <ol className="flex items-center space-x-1 md:space-x-2">
        <li className="flex items-center">
          <Link 
            to="/" 
            className="text-background/70 hover:text-background transition-colors flex items-center"
            aria-label="Página inicial"
          >
            <Home className="w-4 h-4" />
          </Link>
        </li>
        
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="w-4 h-4 text-background/50 mx-1" />
            {item.href ? (
              <Link 
                to={item.href}
                className="text-background/70 hover:text-background transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-background font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;