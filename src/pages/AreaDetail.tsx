import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePracticeArea } from "@/hooks/usePracticeAreas";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getTranslatedPracticeArea, getTranslatedTeamMember } from "@/lib/i18nHelpers";
import NotFound from "./NotFound";

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

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-foreground to-foreground/90">
          <div className="container mx-auto px-4 lg:px-8">
            <Link
              to="/#areas-de-atuacao"
              className="inline-flex items-center text-background/70 hover:text-background mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("areaDetail.backToAreas")}
            </Link>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-background mb-4">
              {translatedArea.title}
            </h1>
            <p className="text-xl text-background/80 max-w-3xl">
              {translatedArea.description}
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl">
              <h2 className="text-3xl font-heading font-semibold mb-6">
                {t("practiceAreas.title")}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {translatedArea.long_description}
              </p>

              {/* Keywords */}
              {translatedArea.keywords && translatedArea.keywords.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-xl font-heading font-semibold mb-4">
                    {t("areaDetail.keywords")}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {translatedArea.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Specialists Section */}
        {specialists.length > 0 && (
          <section className="py-16 bg-secondary">
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

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              {t("areaDetail.contactUs")}
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              {t("areaDetail.description")}
            </p>
            <Button
              size="lg"
              variant="secondary"
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
  );
};

export default AreaDetail;
