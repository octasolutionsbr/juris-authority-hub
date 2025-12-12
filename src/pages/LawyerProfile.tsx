import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTeamMember } from "@/hooks/useTeamMembers";
import { usePracticeAreas } from "@/hooks/usePracticeAreas";
import { useAutoTranslateSingleProfile } from "@/hooks/useAutoTranslateProfile";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, MessageCircle, ArrowLeft, GraduationCap, BookOpen } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getTranslatedTeamMember, getTranslatedPracticeArea } from "@/lib/i18nHelpers";
import NotFound from "./NotFound";

const LawyerProfile = () => {
  const { t, i18n } = useTranslation();
  const { lawyerId } = useParams();
  const { data: lawyer, isLoading: loadingLawyer } = useTeamMember(lawyerId || '');
  const { data: allAreas = [], isLoading: loadingAreas } = usePracticeAreas();

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

  return (
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Photo */}
              <div className="lg:col-span-1">
                <Card className="overflow-hidden border-2 border-primary/20">
                  <div className="relative aspect-[3/4] bg-gradient-to-br from-muted to-muted-foreground/20">
                    {lawyer.photo_url ? (
                      <img
                        src={lawyer.photo_url}
                        alt={lawyer.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-8xl font-heading font-bold text-muted-foreground/30">
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
              <div className="lg:col-span-2">
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-background mb-3">
                  {lawyer.name}
                </h1>
                <p className="text-2xl text-primary-light font-medium mb-6">
                  {lawyer.main_area 
                    ? getTranslatedPracticeArea(allAreas.find(a => a.id === lawyer.main_area) || { id: '', title: translatedLawyer.title, icon: '', description: '', long_description: null, keywords: null, order_index: 0 }, i18n.language).title 
                    : translatedLawyer.title}
                </p>

                {/* Contact Buttons */}
                <div className="flex flex-wrap gap-3 mb-8">
                  <Button
                    size="lg"
                    className="bg-background text-foreground hover:bg-background/90"
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
                    className="border-2 border-background bg-background/10 text-background hover:bg-background hover:text-foreground"
                    asChild
                  >
                    <a href={`mailto:${lawyer.email}`}>
                      <Mail className="w-5 h-5 mr-2" />
                      {t("lawyerProfile.email")}
                    </a>
                  </Button>
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

        {/* Education & Publications */}
        {(translatedLawyer.education || translatedLawyer.publications) && (
          <section className="py-16 bg-secondary">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Education */}
                {translatedLawyer.education && translatedLawyer.education.length > 0 && (
                  <Card className="p-8 border-2 border-border">
                    <div className="flex items-center mb-6">
                      <GraduationCap className="w-6 h-6 text-primary mr-3" />
                      <h3 className="text-2xl font-heading font-semibold">
                        {t("lawyerProfile.education")}
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {translatedLawyer.education.map((edu, index) => (
                        <li
                          key={index}
                          className="text-muted-foreground leading-relaxed flex items-start"
                        >
                          <span className="text-primary mr-2">•</span>
                          {edu}
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}

                {/* Publications */}
                {translatedLawyer.publications && translatedLawyer.publications.length > 0 && (
                  <Card className="p-8 border-2 border-border">
                    <div className="flex items-center mb-6">
                      <BookOpen className="w-6 h-6 text-primary mr-3" />
                      <h3 className="text-2xl font-heading font-semibold">
                        {t("lawyerProfile.publications")}
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {translatedLawyer.publications.map((pub, index) => (
                        <li
                          key={index}
                          className="text-muted-foreground leading-relaxed flex items-start"
                        >
                          <span className="text-primary mr-2">•</span>
                          {pub}
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}
              </div>
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
  );
};

export default LawyerProfile;
