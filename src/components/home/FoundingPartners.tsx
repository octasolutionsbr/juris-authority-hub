import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import { usePracticeAreas } from "@/hooks/usePracticeAreas";
import { useTranslation } from "react-i18next";
import { getTranslatedTeamMember, getTranslatedPracticeArea } from "@/lib/i18nHelpers";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import carlosMendesPhoto from "@/assets/team/carlos-mendes.jpg";
import anaSilvaPhoto from "@/assets/team/ana-silva.jpg";
import robertoCostaPhoto from "@/assets/team/roberto-costa.jpg";
import patriciaOliveiraPhoto from "@/assets/team/patricia-oliveira.jpg";
import fernandoAlvesPhoto from "@/assets/team/fernando-alves.jpg";

const FoundingPartners = () => {
  const { t, i18n } = useTranslation();
  const [api, setApi] = useState<CarouselApi>();
  const { data: allMembers = [], isLoading } = useTeamMembers();
  const { data: practiceAreas = [] } = usePracticeAreas();
  const members = allMembers.filter(m => m.published).slice(0, 20);
  
  const photoMap: Record<string, string> = {
    "carlos-mendes": carlosMendesPhoto,
    "ana-silva": anaSilvaPhoto,
    "roberto-costa": robertoCostaPhoto,
    "patricia-oliveira": patriciaOliveiraPhoto,
    "fernando-alves": fernandoAlvesPhoto,
  };

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
            <span className="text-primary text-sm font-medium tracking-wide">
              {t("team.badge")}
            </span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t("team.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("team.description")}
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t("team.loading")}</p>
          </div>
        ) : (
          <div className="relative px-0 md:px-20">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            setApi={setApi}
            className="w-full max-w-7xl mx-auto"
          >
          <CarouselContent className="-ml-2 md:-ml-4">
            {members.map((member) => {
              const translatedMember = getTranslatedTeamMember(member, i18n.language);
              return (
              <CarouselItem key={member.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <Link to={`/equipe/${member.id}`} className="block">
                  <Card className="overflow-hidden border-2 border-border hover:border-primary hover:shadow-elegant transition-all duration-300 group cursor-pointer h-full">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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

                      {/* Contact Icons */}
                      <div className="flex gap-3 justify-center pt-2">
                        <a
                          href={`https://wa.me/${member.whatsapp?.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-full border border-border hover:border-primary hover:bg-primary/10 transition-colors"
                        >
                          <MessageSquare className="w-5 h-5 text-foreground" />
                        </a>
                        <a
                          href={`mailto:${member.email}`}
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-full border border-border hover:border-primary hover:bg-primary/10 transition-colors"
                        >
                          <Mail className="w-5 h-5 text-foreground" />
                        </a>
                      </div>
                    </div>
                  </Card>
                </Link>
              </CarouselItem>
            );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12" />
          <CarouselNext className="hidden md:flex -right-12" />
        </Carousel>
        
        {/* Mobile navigation - below the carousel */}
        <div className="flex md:hidden justify-center gap-4 mt-6">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full"
            onClick={() => api?.scrollPrev()}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full"
            onClick={() => api?.scrollNext()}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/equipe"
            className="inline-flex items-center justify-center h-11 px-8 rounded-md border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground font-medium transition-colors"
          >
            {t("team.viewAll")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FoundingPartners;
