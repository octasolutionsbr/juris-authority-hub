import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, FileText, Briefcase, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const OpportunitiesSection = () => {
  const { t } = useTranslation();
  
  const categories = [
    {
      icon: Building2,
      title: t("opportunities.categories.properties.title"),
      description: t("opportunities.categories.properties.description"),
      count: t("opportunities.categories.properties.count", { count: 12 }),
      categoryParam: "imoveis",
    },
    {
      icon: FileText,
      title: t("opportunities.categories.precatorios.title"),
      description: t("opportunities.categories.precatorios.description"),
      count: t("opportunities.categories.precatorios.count", { count: 8 }),
      categoryParam: "precatorios",
    },
    {
      icon: Briefcase,
      title: t("opportunities.categories.others.title"),
      description: t("opportunities.categories.others.description"),
      count: t("opportunities.categories.others.count", { count: 6 }),
      categoryParam: "outros",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 animate-fade-in">
            {t("opportunities.title")} <span className="text-primary">{t("opportunities.titleHighlight")}</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {t("opportunities.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category, index) => (
            <Link
              key={category.title}
              to={`/oportunidades?categoria=${category.categoryParam}`}
              className="block animate-fade-in"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <Card
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-primary/50 h-full"
              >
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-background transition-all duration-300">
                    <category.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {category.title}
                  </CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium text-muted-foreground">
                    {category.count}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <Button size="lg" className="gradient-wine group" asChild>
            <Link to="/oportunidades">
              {t("opportunities.viewAll")}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OpportunitiesSection;
