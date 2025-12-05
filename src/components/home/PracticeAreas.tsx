import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { usePracticeAreas } from "@/hooks/usePracticeAreas";
import { useTranslation } from "react-i18next";
import { getTranslatedPracticeArea } from "@/lib/i18nHelpers";
import {
  Building2,
  Calculator,
  Home,
  Users,
  FileText,
  Leaf,
  Lightbulb,
  Globe,
  Scale,
  ArrowRight,
} from "lucide-react";

const iconMap: Record<string, any> = {
  Building2,
  Calculator,
  Home,
  Users,
  FileText,
  Leaf,
  Lightbulb,
  Globe,
  Scale,
};

const PracticeAreas = () => {
  const { t, i18n } = useTranslation();
  const { data: practiceAreas = [], isLoading } = usePracticeAreas();

  return (
    <section id="areas-de-atuacao" className="py-24 bg-secondary scroll-mt-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
            <span className="text-primary text-sm font-medium tracking-wide">
              {t("practiceAreas.badge")}
            </span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t("practiceAreas.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("practiceAreas.description")}
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t("practiceAreas.loading")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {practiceAreas.map((area, index) => {
            const translatedArea = getTranslatedPracticeArea(area, i18n.language);
            const Icon = iconMap[area.icon] || FileText;
            return (
              <Link
                key={area.id}
                to={`/areas/${area.id}`}
                className="group"
                style={{
                  animation: `fade-up 0.6s ease-out forwards`,
                  animationDelay: `${index * 0.1}s`,
                  opacity: 0,
                }}
              >
                <Card className="h-full p-5 border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-elegant hover:-translate-y-2 bg-background">
                  <div className="mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <Icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                  </div>

                  <h3 className="font-heading text-base font-semibold mb-2 text-foreground group-hover:text-primary transition-colors leading-tight">
                    {translatedArea.title}
                  </h3>

                  <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-2">
                    {translatedArea.description}
                  </p>

                  <div className="flex items-center text-primary text-xs font-medium group-hover:gap-1 transition-all">
                    {t("practiceAreas.learnMore")}
                    <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
        )}

      </div>
    </section>
  );
};

export default PracticeAreas;
