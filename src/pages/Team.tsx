import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import { usePracticeAreas } from "@/hooks/usePracticeAreas";
import { useAutoTranslateProfile } from "@/hooks/useAutoTranslateProfile";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getTranslatedTeamMember, getTranslatedPracticeArea } from "@/lib/i18nHelpers";
import carlosMendesPhoto from "@/assets/team/carlos-mendes.jpg";
import anaSilvaPhoto from "@/assets/team/ana-silva.jpg";
import robertoCostaPhoto from "@/assets/team/roberto-costa.jpg";
import patriciaOliveiraPhoto from "@/assets/team/patricia-oliveira.jpg";
import fernandoAlvesPhoto from "@/assets/team/fernando-alves.jpg";

const Team = () => {
  const { t, i18n } = useTranslation();
  const [selectedArea, setSelectedArea] = useState<string>("all");
  const { data: teamMembers = [], isLoading: loadingMembers } = useTeamMembers();
  const { data: practiceAreas = [], isLoading: loadingAreas } = usePracticeAreas();
  
  // Auto-translate profiles when viewing in English
  useAutoTranslateProfile(teamMembers);
  
  const photoMap: Record<string, string> = {
    "carlos-mendes": carlosMendesPhoto,
    "ana-silva": anaSilvaPhoto,
    "roberto-costa": robertoCostaPhoto,
    "patricia-oliveira": patriciaOliveiraPhoto,
    "fernando-alves": fernandoAlvesPhoto,
  };

  const filteredMembers = teamMembers.filter((member) => {
    if (!member.published) return false;
    const areaMatch =
      selectedArea === "all" || member.areas?.includes(selectedArea);
    return areaMatch;
  });

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-foreground to-foreground/90">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-heading font-bold text-background mb-6">
                {t("team.title")}
              </h1>
              <p className="text-xl text-background/80 leading-relaxed">
                {t("team.description")}
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-4 bg-secondary sticky top-20 z-40 border-b border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Area Filter */}
              <div className="flex-1 max-w-md">
                <label className="text-sm font-medium mb-2 block">
                  {t("team.filterByArea")}
                </label>
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">{t("team.allAreas")}</option>
                  {practiceAreas.map((area) => {
                    const translatedArea = getTranslatedPracticeArea(area, i18n.language);
                    return (
                    <option key={area.id} value={area.id}>
                      {translatedArea.title}
                    </option>
                  );
                  })}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Team Members Section */}
        {loadingMembers || loadingAreas ? (
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4 lg:px-8 text-center">
              <p className="text-muted-foreground">{t("common.loading")}</p>
            </div>
          </section>
        ) : filteredMembers.length > 0 ? (
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4 lg:px-8">
              <h2 className="text-3xl font-heading font-semibold mb-8">
                {t("team.lawyers")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredMembers.map((member) => {
                  const translatedMember = getTranslatedTeamMember(member, i18n.language);
                  return (
                  <Card
                    key={member.id}
                    className="overflow-hidden border-2 border-border hover:border-primary hover:shadow-elegant transition-all"
                  >
                    {/* Photo */}
                    <div className="relative h-80 overflow-hidden">
                      {member.photo_url ? (
                        <img
                          src={member.photo_url}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : member.photo && photoMap[member.photo] ? (
                        <img
                          src={photoMap[member.photo]}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center">
                          <div className="text-6xl font-heading font-bold text-muted-foreground/30">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-heading text-xl font-semibold text-foreground mb-1">
                        {member.name}
                      </h3>
                      <p className="text-primary text-sm font-medium mb-3">
                        {member.main_area 
                          ? getTranslatedPracticeArea(practiceAreas.find(a => a.id === member.main_area) || { id: '', title: translatedMember.title, icon: '', description: '', long_description: null, keywords: null, order_index: 0 }, i18n.language).title 
                          : translatedMember.title}
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                        {translatedMember.bio}
                      </p>

                      {/* Contact Buttons */}
                      <div className="flex gap-2 mb-3">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          asChild
                        >
                          <a
                            href={`https://wa.me/${member.whatsapp?.replace(
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
                          <a href={`mailto:${member.email}`}>
                            <Mail className="w-4 h-4 mr-2" />
                            {t("team.email")}
                          </a>
                        </Button>
                      </div>

                      <Link
                        to={`/equipe/${member.id}`}
                        className="block text-center text-sm text-primary hover:text-primary-dark font-medium transition-colors"
                      >
                        {t("team.viewProfile")}
                      </Link>
                    </div>
                  </Card>
                );
                })}
              </div>
            </div>
          </section>
        ) : (
          <section className="py-20 bg-background text-center">
            <div className="container mx-auto px-4 lg:px-8">
              <p className="text-muted-foreground text-lg">
                {t("team.noResults")}
              </p>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Team;
