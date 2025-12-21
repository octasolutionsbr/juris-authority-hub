import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { usePracticeAreas } from "@/hooks/usePracticeAreas";
import { useTranslation } from "react-i18next";
import { getTranslatedPracticeArea } from "@/lib/i18nHelpers";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Scale, Building2, Leaf, FileText, Users, Home, Gavel, Heart, Vote, ShoppingCart } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Scale,
  Building2,
  Leaf,
  FileText,
  Users,
  Home,
  Gavel,
  Heart,
  Vote,
  ShoppingCart,
};

const AreasIndex = () => {
  const { t, i18n } = useTranslation();
  const { data: areas = [], isLoading } = usePracticeAreas();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Início",
        "item": "https://juriscompany.net/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Áreas de Atuação",
        "item": "https://juriscompany.net/areas"
      }
    ]
  };

  const serviceListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Áreas de Atuação - Juris Company",
    "description": "Lista completa de serviços jurídicos oferecidos pela Juris Company em Macapá, Amapá",
    "itemListElement": areas.map((area, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": area.title,
        "description": area.description,
        "url": `https://juriscompany.net/areas/${area.id}`,
        "provider": {
          "@type": "LegalService",
          "name": "Juris Company"
        }
      }
    }))
  };

  return (
    <>
      <SEOHead 
        title="Áreas de Atuação | Advogado Empresarial Macapá - Petróleo e Gás Amapá"
        description="Conheça todas as áreas de atuação da Juris Company em Macapá-AP: Direito Empresarial, Tributário, Ambiental, Trabalhista e mais. Especialistas em assessoria jurídica para empresas de petróleo e gás no Amapá."
        keywords="áreas de atuação advogado Macapá, serviços jurídicos Amapá, escritório advocacia petróleo, assessoria jurídica empresas, advogado especialista Macapá"
        canonicalUrl="/areas"
        structuredData={[breadcrumbSchema, serviceListSchema]}
      />
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          {/* Hero Section */}
          <section className="py-16 md:py-24 bg-gradient-to-br from-foreground to-foreground/90">
            <div className="container mx-auto px-4 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-background mb-6">
                {t("practiceAreas.title", "Áreas de Atuação")}
              </h1>
              <p className="text-lg md:text-xl text-background/90 max-w-3xl mx-auto leading-relaxed">
                {t("practiceAreas.subtitle", "Oferecemos assessoria jurídica especializada em diversas áreas do direito, com foco especial em empresas do setor de petróleo e gás no Amapá.")}
              </p>
            </div>
          </section>

          {/* Areas Grid */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4 lg:px-8">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {areas.map((area) => {
                    const translatedArea = getTranslatedPracticeArea(area, i18n.language);
                    const IconComponent = iconMap[area.icon] || Scale;
                    
                    return (
                      <Card 
                        key={area.id} 
                        className="group p-6 border-2 border-border hover:border-primary hover:shadow-elegant transition-all duration-300"
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h2 className="text-xl font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                              {translatedArea.title}
                            </h2>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                          {translatedArea.description}
                        </p>
                        
                        <Button 
                          variant="outline" 
                          className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors"
                          asChild
                        >
                          <Link to={`/areas/${area.id}`}>
                            {t("practiceAreas.learnMore", "Saiba Mais")}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-secondary">
            <div className="container mx-auto px-4 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-foreground">
                {t("areas.cta.title", "Não encontrou sua área?")}
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto text-muted-foreground">
                {t("areas.cta.description", "Entre em contato conosco para discutir seu caso. Nossa equipe está pronta para ajudar com diversas questões jurídicas.")}
              </p>
              <Button
                size="lg"
                className="text-lg px-8"
                asChild
              >
                <Link to="/contato">{t("contact.talkToUs", "Fale Conosco")}</Link>
              </Button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AreasIndex;