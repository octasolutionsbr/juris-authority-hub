import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { usePracticeArea } from "@/hooks/usePracticeAreas";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getTranslatedPracticeArea, getTranslatedTeamMember } from "@/lib/i18nHelpers";
import NotFound from "./NotFound";
import SEOHead from "@/components/SEOHead";
import { getAreaFAQs, FAQItem } from "@/data/faqData";
import { useState } from "react";

const FAQSection = ({ faqs }: { faqs: FAQItem[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useTranslation();

  if (faqs.length === 0) return null;

  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-3xl font-heading font-semibold mb-8 text-center">
          {t("faq.title", "Perguntas Frequentes")}
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-background rounded-lg border border-border overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-muted/50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
              >
                <span className="font-medium text-foreground pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AreaDetail = () => {
  const { t, i18n } = useTranslation();
  const { areaId } = useParams();
  const { data: area, isLoading: loadingArea } = usePracticeArea(areaId || '');
  const { data: allMembers = [], isLoading: loadingMembers } = useTeamMembers();

  if (loadingArea || loadingMembers) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">{t("areaDetail.loading")}</p>
      </div>
    );
  }

  if (!area) {
    return <NotFound />;
  }

  const translatedArea = getTranslatedPracticeArea(area, i18n.language);
  const specialists = allMembers.filter((member) =>
    member.areas?.includes(area.id)
  );
  const faqs = getAreaFAQs(areaId || '');

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
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": translatedArea.title,
        "item": `https://juriscompany.net/areas/${areaId}`
      }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": translatedArea.title,
    "name": `${translatedArea.title} em Macapá - Juris Company`,
    "description": translatedArea.long_description || translatedArea.description,
    "provider": {
      "@type": "LegalService",
      "name": "Juris Company",
      "url": "https://juriscompany.net",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Macapá",
        "addressRegion": "Amapá",
        "addressCountry": "BR"
      },
      "telephone": "+55 96 93223-1425"
    },
    "areaServed": [
      {
        "@type": "State",
        "name": "Amapá"
      },
      {
        "@type": "City", 
        "name": "Macapá"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `Serviços de ${translatedArea.title}`,
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": `Consultoria em ${translatedArea.title}`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": `Assessoria Jurídica em ${translatedArea.title}`
          }
        }
      ]
    }
  };

  const seoTitle = `${translatedArea.title} em Macapá-AP | Advogado Especialista ${translatedArea.title} Amapá`;
  const seoDescription = `${translatedArea.description} Escritório de advocacia especializado em ${translatedArea.title.toLowerCase()} em Macapá-AP. Assessoria jurídica para empresas de petróleo e gás no Amapá. Consulta inicial gratuita.`;

  return (
    <>
      <SEOHead 
        title={seoTitle}
        description={seoDescription}
        keywords={translatedArea.keywords?.join(", ") || `${translatedArea.title}, advogado Macapá, assessoria jurídica Amapá`}
        canonicalUrl={`/areas/${areaId}`}
        structuredData={[breadcrumbSchema, serviceSchema]}
        faqItems={faqs}
      />
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          {/* Hero Section */}
          <section className="py-12 md:py-16 bg-gradient-to-br from-foreground to-foreground/90">
            <div className="container mx-auto px-4 lg:px-8">
              <Breadcrumbs 
                items={[
                  { label: t("nav.areas", "Áreas de Atuação"), href: "/areas" },
                  { label: translatedArea.title }
                ]}
                className="mb-6"
              />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-background mb-6">
                {translatedArea.title}
              </h1>
              <p className="text-lg md:text-xl text-background/90 max-w-4xl leading-relaxed">
                {translatedArea.long_description || translatedArea.description}
              </p>
            </div>
          </section>

          {/* Specialists Section */}
          {specialists.length > 0 && (
            <section className="py-16 bg-muted">
              <div className="container mx-auto px-4 lg:px-8">
                <h2 className="text-3xl font-heading font-semibold mb-8">
                  {t("lawyerProfile.specialties")} - {translatedArea.title}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {specialists.map((specialist) => {
                    const translatedSpecialist = getTranslatedTeamMember(specialist, i18n.language);
                    return (
                    <Card
                      key={specialist.id}
                      className="p-6 border-2 border-border hover:border-primary hover:shadow-elegant transition-all"
                    >
                      {/* Photo Placeholder */}
                      <div className="relative h-64 bg-gradient-to-br from-muted to-muted-foreground/20 rounded-lg overflow-hidden mb-4">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-5xl font-heading font-bold text-muted-foreground/30">
                            {specialist.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                        </div>
                      </div>

                      <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                        {specialist.name}
                      </h3>
                      <p className="text-primary text-sm font-medium mb-3">
                        {translatedSpecialist.title}
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                        {translatedSpecialist.bio}
                      </p>

                      {/* Contact Buttons */}
                      {specialist.whatsapp && specialist.email && (
                        <div className="flex gap-2 mb-3">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            asChild
                          >
                            <a
                              href={`https://wa.me/${specialist.whatsapp.replace(
                                /\D/g,
                                ""
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <MessageCircle className="w-4 h-4 mr-2" />
                              {t("team.whatsapp")}
                            </a>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            asChild
                          >
                            <a href={`mailto:${specialist.email}`}>
                              <Mail className="w-4 h-4 mr-2" />
                              {t("team.email")}
                            </a>
                          </Button>
                        </div>
                      )}

                      <Link
                        to={`/equipe/${specialist.id}`}
                        className="block text-center text-sm text-primary hover:text-primary-dark font-medium transition-colors"
                      >
                        {t("team.viewProfile")}
                      </Link>
                    </Card>
                  );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* FAQ Section */}
          <FAQSection faqs={faqs} />

          {/* CTA Section */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-foreground">
                {t("areaDetail.contactUs")}
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto text-muted-foreground">
                {t("areaDetail.description")}
              </p>
              <Button
                size="lg"
                className="text-lg px-8"
                asChild
              >
                <Link to="/contato">{t("contact.talkToUs")}</Link>
              </Button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AreaDetail;