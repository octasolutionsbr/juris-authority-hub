import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, FileText, Briefcase } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useListings } from "@/hooks/useListings";
import { OpportunityCard } from "@/components/opportunities/OpportunityCard";
import SEOHead from "@/components/SEOHead";

const Opportunities = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("categoria");
  const [activeTab, setActiveTab] = useState(categoryParam || "imoveis");

  const { data: listings = [], isLoading } = useListings();

  useEffect(() => {
    if (categoryParam) {
      setActiveTab(categoryParam);
    }
  }, [categoryParam]);

  // Filter only available listings by category
  const availableListings = listings.filter((l) => l.status === "available");
  const imoveis = availableListings.filter((l) => l.category === "imoveis");
  const precatorios = availableListings.filter((l) => l.category === "precatorios");
  const outros = availableListings.filter((l) => l.category === "outros" || l.category === "creditos");

  const EmptyState = () => (
    <div className="text-center py-12">
      <p className="text-muted-foreground">{t("opportunitiesPage.noListings", "Nenhuma oportunidade disponível no momento.")}</p>
    </div>
  );

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
        "name": "Oportunidades",
        "item": "https://juriscompany.net/oportunidades"
      }
    ]
  };

  return (
    <>
      <SEOHead 
        title="Oportunidades de Investimento - Imóveis e Precatórios"
        description="Explore oportunidades exclusivas de investimento selecionadas pela Juris Company. Imóveis, precatórios e créditos tributários com assessoria jurídica completa em Macapá-AP."
        keywords="investimento imóveis Macapá, precatórios Amapá, créditos tributários, oportunidades investimento jurídico"
        canonicalUrl="/oportunidades"
        structuredData={breadcrumbSchema}
      />
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          {/* Hero Section */}
          <section className="py-10 border-b border-border">
            <div className="container mx-auto px-4 lg:px-8">
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
                <span className="text-primary">{t("opportunitiesPage.title")}</span>
              </h1>
              <p className="text-muted-foreground">
                {t("opportunitiesPage.description")}
              </p>
            </div>
          </section>

          {/* Opportunities Content */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4 lg:px-8">
              {isLoading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Carregando...</p>
                </div>
              ) : (
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 mb-12 h-auto">
                    <TabsTrigger value="imoveis" className="text-base py-3">
                      <Building2 className="w-5 h-5 mr-2" />
                      {t("opportunitiesPage.properties")}
                    </TabsTrigger>
                    <TabsTrigger value="precatorios" className="text-base py-3">
                      <FileText className="w-5 h-5 mr-2" />
                      {t("opportunitiesPage.courtOrders")}
                    </TabsTrigger>
                    <TabsTrigger value="outros" className="text-base py-3">
                      <Briefcase className="w-5 h-5 mr-2" />
                      {t("opportunitiesPage.otherAssets")}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="imoveis" className="mt-0">
                    {imoveis.length === 0 ? (
                      <EmptyState />
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {imoveis.map((listing) => (
                          <OpportunityCard key={listing.id} listing={listing} />
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="precatorios" className="mt-0">
                    {precatorios.length === 0 ? (
                      <EmptyState />
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {precatorios.map((listing) => (
                          <OpportunityCard key={listing.id} listing={listing} />
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="outros" className="mt-0">
                    {outros.length === 0 ? (
                      <EmptyState />
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {outros.map((listing) => (
                          <OpportunityCard key={listing.id} listing={listing} />
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Opportunities;
