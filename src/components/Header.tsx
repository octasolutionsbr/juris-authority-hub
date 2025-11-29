import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t("header.areas"), href: "/areas" },
    { label: t("header.team"), href: "/equipe" },
    { label: t("header.opportunities"), href: "/oportunidades" },
    { label: t("header.about"), href: "/sobre" },
    { label: t("header.contact"), href: "/contato" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        (isScrolled || !isHomePage)
          ? "bg-background/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className={cn(
              "text-2xl font-heading font-bold transition-colors",
              (isScrolled || !isHomePage) ? "text-foreground" : "text-background"
            )}>
              Juris <span className="text-primary">Company</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative py-2",
                  isActive(link.href)
                    ? "text-primary"
                    : (isScrolled || !isHomePage) ? "text-foreground/80" : "text-background"
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </Link>
            ))}
          </nav>

          {/* Language Switcher & CTA Button */}
          <div className="hidden lg:flex items-center space-x-2">
            <LanguageSwitcher isScrolled={isScrolled} isHomePage={isHomePage} />
            <Button size="sm" className="gradient-wine" asChild>
              <Link to="/contato">Agende uma Consulta</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary px-4 py-2",
                    isActive(link.href)
                      ? "text-primary bg-secondary"
                      : "text-foreground/80"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col px-4 pt-4 space-y-2">
                <div className="flex justify-center">
                  <LanguageSwitcher isScrolled={true} isHomePage={false} />
                </div>
                <Button size="sm" className="gradient-wine" asChild>
                  <Link to="/contato" onClick={() => setIsMobileMenuOpen(false)}>
                    Agende uma Consulta
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
