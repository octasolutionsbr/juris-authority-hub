import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-lg mx-auto">
          {/* 404 Number with gradient */}
          <div className="relative mb-8">
            <h1 className="text-[150px] md:text-[200px] font-bold leading-none text-transparent bg-clip-text bg-gradient-to-b from-primary/40 to-primary/10 select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <Search className="w-16 h-16 md:w-24 md:h-24 text-primary/60" />
            </div>
          </div>

          {/* Title and description */}
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            {t('notFound.title', 'Página não encontrada')}
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            {t('notFound.description', 'A página que você está procurando não existe ou foi movida.')}
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link to="/">
                <Home className="w-4 h-4" />
                {t('notFound.backHome', 'Voltar ao Início')}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/contato">
                <ArrowLeft className="w-4 h-4" />
                {t('notFound.contact', 'Fale Conosco')}
              </Link>
            </Button>
          </div>

          {/* Attempted path */}
          <p className="mt-8 text-sm text-muted-foreground/60">
            {t('notFound.attemptedPath', 'Caminho tentado')}: <code className="bg-muted px-2 py-1 rounded text-xs">{location.pathname}</code>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
