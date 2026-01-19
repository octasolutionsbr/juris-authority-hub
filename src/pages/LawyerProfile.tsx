import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTeamMember } from "@/hooks/useTeamMembers";
import { usePracticeAreas } from "@/hooks/usePracticeAreas";
import { useAutoTranslateSingleProfile } from "@/hooks/useAutoTranslateProfile";
import { loadTeamPhotos } from "@/hooks/useTeamPhotos";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, MessageCircle, ArrowLeft, GraduationCap, BookOpen, Linkedin, Instagram, Facebook, Youtube, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getTranslatedTeamMember, getTranslatedPracticeArea } from "@/lib/i18nHelpers";
import NotFound from "./NotFound";
import SEOHead from "@/components/SEOHead";

const LawyerProfile = () => {
  const { t, i18n } = useTranslation();
  const { lawyerId } = useParams();
  const [photoMap, setPhotoMap] = useState<Record<string, string>>({});
  const { data: lawyer, isLoading: loadingLawyer } = useTeamMember(lawyerId || '');
  const { data: allAreas = [], isLoading: loadingAreas } = usePracticeAreas();

  // Lazy load photos
  useEffect(() => {
    loadTeamPhotos().then(setPhotoMap);
  }, []);

  // Auto-translate profile when viewing in English - MUST be called before any early returns
  useAutoTranslateSingleProfile(lawyer);

  if (loadingLawyer || loadingAreas) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">{t("lawyerProfile.loading")}</p>
      </div>
    );
  }

  if (!lawyer) {
    return <NotFound />;
  }

  const translatedLawyer = getTranslatedTeamMember(lawyer, i18n.language);
  const lawyerAreas = allAreas.filter((area) =>
    lawyer.areas?.includes(area.id)
  );
  
  const photoSrc = lawyer.photo_url || (lawyer.photo && photoMap[lawyer.photo]) || null;

  const mainAreaTitle = lawyer.main_area 
    ? getTranslatedPracticeArea(allAreas.find(a => a.id === lawyer.main_area) || { id: '', title: translatedLawyer.title, icon: '', description: '', long_description: null, keywords: null, order_index: 0 }, i18n.language).title 
    : translatedLawyer.title;

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
        "name": "Equipe",
        "item": "https://juriscompany.net/equipe"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": lawyer.name,
        "item": `https://juriscompany.net/equipe/${lawyerId}`
      }
    ]
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": ["Person", "Attorney"],
    "name": lawyer.name,
    "jobTitle": mainAreaTitle,
    "description": translatedLawyer.bio,
    "email": lawyer.email,
    "telephone": lawyer.whatsapp,
    "worksFor": {
      "@type": "LegalService",
      "name": "Juris Company",
      "url": "https://juriscompany.net",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "R. Prof. Tostes, 783 - Centro",
        "addressLocality": "Macapá",
        "addressRegion": "Amapá",
        "addressCountry": "BR",
        "postalCode": "68900-022"
      }
    },
    "workLocation": {
      "@type": "Place",
      "name": "Juris Company - Macapá",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Macapá",
        "addressRegion": "Amapá",
        "addressCountry": "BR"
      }
    },
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "OAB",
      "recognizedBy": {
        "@type": "Organization",
        "name": "Ordem dos Advogados do Brasil"
      }
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
    "availableChannel": [
      {
        "@type": "ServiceChannel",
        "serviceType": "WhatsApp",
        "serviceUrl": `https://wa.me/${lawyer.whatsapp?.replace(/\D/g, "")}`
      },
      {
        "@type": "ServiceChannel",
        "serviceType": "Email",
        "serviceEmail": lawyer.email
      }
    ],
    "knowsAbout": lawyerAreas.map(area => getTranslatedPracticeArea(area, i18n.language).title)
  };

  return (
    <>
      <SEOHead 
        title={`${lawyer.name} - ${mainAreaTitle}`}
        description={`${lawyer.name}, advogado especialista em ${mainAreaTitle.toLowerCase()} na Juris Company em Macapá-AP. ${translatedLawyer.bio.substring(0, 120)}...`}
        keywords={`${lawyer.name}, advogado ${mainAreaTitle}, advogado Macapá, ${lawyerAreas.map(a => getTranslatedPracticeArea(a, i18n.language).title).join(", ")}`}
        canonicalUrl={`/equipe/${lawyerId}`}
        ogType="profile"
        structuredData={breadcrumbSchema}
      />
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          {/* Hero Section */}
          <section className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-foreground to-foreground/90 flex items-center">
            <div className="container mx-auto px-4 lg:px-8 py-8">
              <Link
                to="/equipe"
                className="inline-flex items-center text-background/70 hover:text-background mb-8 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t("lawyerProfile.backToTeam")}
              </Link>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8 items-start">
                {/* Photo */}
                <div className="md:col-span-1 flex justify-center md:justify-start">
                  <Card className="overflow-hidden border-2 border-primary/20 w-48 sm:w-56 md:w-full max-w-xs">
                    <div className="relative aspect-[4/5] bg-gradient-to-br from-muted to-muted-foreground/20">
                      {photoSrc ? (
                        <img
                          src={photoSrc}
                          alt={`${lawyer.name} - Advogado especialista em ${mainAreaTitle} em Macapá`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-6xl md:text-8xl font-heading font-bold text-muted-foreground/30">
                            {lawyer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>

                {/* Info */}
                <div className="md:col-span-2 text-center md:text-left">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-background mb-2 md:mb-3">
                    {lawyer.name}
                  </h1>
                  <p className="text-xl sm:text-2xl text-primary-light font-medium mb-4 md:mb-6">
                    {mainAreaTitle}
                  </p>

                  {/* Contact & Social Section */}
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3 mb-6 md:mb-8">
                    {/* Primary Contact Buttons */}
                    <a
                      href={`https://wa.me/${lawyer.whatsapp?.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-5 py-2.5 bg-background text-foreground font-medium rounded-full hover:bg-background/90 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {t("lawyerProfile.whatsapp")}
                    </a>
                    <a 
                      href={`mailto:${lawyer.email}`}
                      className="inline-flex items-center justify-center px-5 py-2.5 bg-transparent border-2 border-background/60 text-background font-medium rounded-full hover:bg-background hover:text-foreground transition-all duration-200"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      {t("lawyerProfile.email")}
                    </a>

                    {/* Separator */}
                    {(lawyer.linkedin || lawyer.instagram || lawyer.facebook || lawyer.twitter || lawyer.youtube || lawyer.website) && (
                      <div className="h-6 w-px bg-background/30 mx-1 hidden sm:block" />
                    )}

                    {/* Social Media Icons */}
                    {lawyer.linkedin && (
                      <a 
                        href={lawyer.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-background/10 border border-background/30 flex items-center justify-center text-background hover:bg-background hover:text-foreground transition-all duration-200"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {lawyer.instagram && (
                      <a 
                        href={lawyer.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-background/10 border border-background/30 flex items-center justify-center text-background hover:bg-background hover:text-foreground transition-all duration-200"
                        aria-label="Instagram"
                      >
                        <Instagram className="w-4 h-4" />
                      </a>
                    )}
                    {lawyer.facebook && (
                      <a 
                        href={lawyer.facebook} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-background/10 border border-background/30 flex items-center justify-center text-background hover:bg-background hover:text-foreground transition-all duration-200"
                        aria-label="Facebook"
                      >
                        <Facebook className="w-4 h-4" />
                      </a>
                    )}
                    {lawyer.twitter && (
                      <a 
                        href={lawyer.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-background/10 border border-background/30 flex items-center justify-center text-background hover:bg-background hover:text-foreground transition-all duration-200"
                        aria-label="X (Twitter)"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </a>
                    )}
                    {lawyer.youtube && (
                      <a 
                        href={lawyer.youtube} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-background/10 border border-background/30 flex items-center justify-center text-background hover:bg-background hover:text-foreground transition-all duration-200"
                        aria-label="YouTube"
                      >
                        <Youtube className="w-4 h-4" />
                      </a>
                    )}
                    {lawyer.website && (
                      <a 
                        href={lawyer.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm text-background border border-background/30 rounded-full hover:bg-background hover:text-foreground transition-all duration-200"
                      >
                        <Globe className="w-4 h-4" />
                        <span>Website</span>
                      </a>
                    )}
                  </div>

                  <p className="text-lg text-background/90 leading-relaxed">
                    {translatedLawyer.bio}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Areas of Practice */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4 lg:px-8">
              <h2 className="text-3xl font-heading font-semibold mb-8">
                {t("lawyerProfile.specialties")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {lawyerAreas.map((area) => {
                  const translatedArea = getTranslatedPracticeArea(area, i18n.language);
                  return (
                  <Card
                    key={area.id}
                    className="p-6 border-2 border-border hover:border-primary hover:shadow-lg transition-all"
                  >
                    <h3 className="font-heading text-xl font-semibold mb-3 text-foreground">
                      {translatedArea.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {translatedArea.description}
                    </p>
                    <Link
                      to={`/areas/${area.id}`}
                      className="text-primary hover:text-primary-dark text-sm font-medium transition-colors"
                    >
                      {t("practiceAreas.learnMore")} →
                    </Link>
                  </Card>
                );
                })}
              </div>
            </div>
          </section>

          {/* Education Section */}
          {translatedLawyer.education && translatedLawyer.education.length > 0 && (
            <section className="py-16 bg-muted/30">
              <div className="container mx-auto px-4 lg:px-8">
                <h2 className="text-3xl font-heading font-semibold mb-8">
                  {t("lawyerProfile.education")}
                </h2>
                <ul className="space-y-4">
                  {translatedLawyer.education.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <GraduationCap className="w-5 h-5 text-primary mt-1 shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Publications Section */}
          {translatedLawyer.publications && translatedLawyer.publications.length > 0 && (
            <section className="py-16 bg-background">
              <div className="container mx-auto px-4 lg:px-8">
                <h2 className="text-3xl font-heading font-semibold mb-8">
                  {t("lawyerProfile.publications")}
                </h2>
                <ul className="space-y-4">
                  {translatedLawyer.publications.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <BookOpen className="w-5 h-5 text-primary mt-1 shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="py-16 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                {t("header.scheduleConsultation")}
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                {t("lawyerProfile.contact")} {lawyer.name.split(" ")[0]}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8"
                  asChild
                >
                  <a
                    href={`https://wa.me/${lawyer.whatsapp?.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {t("lawyerProfile.whatsapp")}
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 border-2 border-background bg-background/10 text-background hover:bg-background hover:text-foreground"
                  asChild
                >
                  <a href={`mailto:${lawyer.email}`}>
                    <Mail className="w-5 h-5 mr-2" />
                    {t("lawyerProfile.email")}
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default LawyerProfile;
