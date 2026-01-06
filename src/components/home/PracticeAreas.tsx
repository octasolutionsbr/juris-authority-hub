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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
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
                    animationDelay: `${index * 0.05}s`,
                    opacity: 0,
                  }}
                >
                  <Card className="h-full p-3 border border-border hover:border-primary transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 bg-background">
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                        <Icon className="w-4 h-4 text-primary group-hover:text-primary-foreground transition-colors" />
                      </div>
                      <h3 className="font-heading text-xs font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
                        {translatedArea.title}
                      </h3>
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
