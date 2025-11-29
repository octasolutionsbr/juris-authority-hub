import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, FileText, Receipt, Briefcase, MapPin, Calendar, User, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

// Mock data para exemplo
const opportunities = {
  imoveis: [
    {
      id: "1",
      title: "Apartamento Centro - 3 Quartos",
      description: "Apartamento de luxo com 3 quartos, 2 vagas, próximo ao centro comercial",
      price: "R$ 850.000",
      location: "Centro, São Paulo",
      lawyer: "Dr. João Silva",
      lawyerEmail: "joao.silva@juriscompany.com",
      date: "15/11/2025",
    },
    {
      id: "2",
      title: "Casa Condomínio Fechado",
      description: "Casa térrea em condomínio fechado com área de lazer completa",
      price: "R$ 1.200.000",
      location: "Alphaville, SP",
      lawyer: "Dra. Maria Santos",
      lawyerEmail: "maria.santos@juriscompany.com",
      date: "10/11/2025",
    },
  ],
  precatorios: [
    {
      id: "3",
      title: "Precatório Federal - INSS",
      description: "Precatório federal referente a ação previdenciária",
      price: "R$ 450.000",
      entity: "União Federal",
      lawyer: "Dr. Pedro Costa",
      lawyerEmail: "pedro.costa@juriscompany.com",
      date: "08/11/2025",
    },
  ],
  creditos: [
    {
      id: "4",
      title: "Crédito Tributário ICMS",
      description: "Crédito acumulado de ICMS para compensação",
      price: "R$ 320.000",
      type: "ICMS",
      lawyer: "Dra. Ana Paula",
      lawyerEmail: "ana.paula@juriscompany.com",
      date: "12/11/2025",
    },
  ],
  outros: [
    {
      id: "5",
      title: "Participação Societária",
      description: "Cota de participação em empresa do setor de tecnologia",
      price: "R$ 200.000",
      type: "Participação",
      lawyer: "Dr. Carlos Mendes",
      lawyerEmail: "carlos.mendes@juriscompany.com",
      date: "14/11/2025",
    },
  ],
};

const Opportunities = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("categoria");
  const [activeTab, setActiveTab] = useState(categoryParam || "imoveis");

  useEffect(() => {
    if (categoryParam) {
      setActiveTab(categoryParam);
    }
  }, [categoryParam]);

  const OpportunityCard = ({ opportunity, type }: { opportunity: any; type: string }) => (
    <Card className="hover:shadow-lg transition-all duration-300 group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {type === "imoveis" && <Building2 className="w-6 h-6 text-primary" />}
            {type === "precatorios" && <FileText className="w-6 h-6 text-primary" />}
            {type === "creditos" && <Receipt className="w-6 h-6 text-primary" />}
            {type === "outros" && <Briefcase className="w-6 h-6 text-primary" />}
            <div>
              <CardTitle className="text-xl group-hover:text-primary transition-colors">
                {opportunity.title}
              </CardTitle>
              <CardDescription className="mt-1">{opportunity.description}</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">{opportunity.price}</span>
        </div>

        <div className="space-y-2 text-sm">
          {opportunity.location && (
            <div className="flex items-center text-muted-foreground">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{opportunity.location}</span>
            </div>
          )}

          {opportunity.entity && (
            <div className="flex items-center text-muted-foreground">
              <Building2 className="w-4 h-4 mr-2" />
              <span>{opportunity.entity}</span>
            </div>
          )}

          {opportunity.type && (
            <div className="flex items-center text-muted-foreground">
              <Receipt className="w-4 h-4 mr-2" />
              <span>{opportunity.type}</span>
            </div>
          )}

          <div className="flex items-center text-muted-foreground">
            <User className="w-4 h-4 mr-2" />
            <span>{opportunity.lawyer}</span>
          </div>

          <div className="flex items-center text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{opportunity.date}</span>
          </div>
        </div>

        <Button className="w-full group" asChild>
          <a href={`mailto:${opportunity.lawyerEmail}`}>
            <Mail className="w-4 h-4 mr-2" />
            {t("opportunitiesPage.contactInterest")}
          </a>
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-foreground to-foreground/90">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-heading font-bold text-background mb-6">
                {t("opportunitiesPage.title")}
              </h1>
              <p className="text-xl text-background/80 leading-relaxed">
                {t("opportunitiesPage.description")}
              </p>
            </div>
          </div>
        </section>

        {/* Opportunities Content */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-12 h-auto">
                <TabsTrigger value="imoveis" className="text-base py-3">
                  <Building2 className="w-5 h-5 mr-2" />
                  {t("opportunitiesPage.properties")}
                </TabsTrigger>
                <TabsTrigger value="precatorios" className="text-base py-3">
                  <FileText className="w-5 h-5 mr-2" />
                  {t("opportunitiesPage.courtOrders")}
                </TabsTrigger>
                <TabsTrigger value="creditos" className="text-base py-3">
                  <Receipt className="w-5 h-5 mr-2" />
                  {t("opportunitiesPage.taxCredits")}
                </TabsTrigger>
                <TabsTrigger value="outros" className="text-base py-3">
                  <Briefcase className="w-5 h-5 mr-2" />
                  {t("opportunitiesPage.otherAssets")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="imoveis" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {opportunities.imoveis.map((opp) => (
                    <OpportunityCard key={opp.id} opportunity={opp} type="imoveis" />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="precatorios" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {opportunities.precatorios.map((opp) => (
                    <OpportunityCard key={opp.id} opportunity={opp} type="precatorios" />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="creditos" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {opportunities.creditos.map((opp) => (
                    <OpportunityCard key={opp.id} opportunity={opp} type="creditos" />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="outros" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {opportunities.outros.map((opp) => (
                    <OpportunityCard key={opp.id} opportunity={opp} type="outros" />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Opportunities;
