import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePracticeAreas } from "@/hooks/usePracticeAreas";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import {
  Building2,
  Calculator,
  Home,
  Users,
  FileText,
  Leaf,
  Lightbulb,
  Globe,
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
};

const Areas = () => {
  const { t } = useTranslation();
  const { data: practiceAreas = [], isLoading } = usePracticeAreas();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-foreground to-foreground/90">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-heading font-bold text-background mb-6">
                {t("areasPage.title")}
              </h1>
              <p className="text-xl text-background/80 leading-relaxed">
                {t("areasPage.subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Practice Areas Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">{t("areasPage.loading")}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {practiceAreas.map((area) => {
                  const Icon = iconMap[area.icon] || FileText;
                  return (
                    <Link
                      key={area.id}
                      to={`/areas/${area.id}`}
                      className="group"
                    >
                      <Card className="h-full p-8 border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-elegant hover:-translate-y-2">
                        <div className="mb-6">
                          <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                            <Icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                          </div>
                        </div>

                        <h3 className="font-heading text-2xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors">
                          {area.title}
                        </h3>

                        <p className="text-muted-foreground leading-relaxed mb-6">
                          {area.description}
                        </p>

                        <div className="flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                          {t("areasPage.learnMore")}
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Areas;
