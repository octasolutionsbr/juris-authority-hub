import { Shield, Award, Users, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";

const AboutUs = () => {
  const { t } = useTranslation();
  
  const values = [
    {
      icon: Shield,
      title: t("aboutUs.values.excellence.title"),
      description: t("aboutUs.values.excellence.description"),
    },
    {
      icon: Award,
      title: t("aboutUs.values.results.title"),
      description: t("aboutUs.values.results.description"),
    },
    {
      icon: Users,
      title: t("aboutUs.values.service.title"),
      description: t("aboutUs.values.service.description"),
    },
    {
      icon: TrendingUp,
      title: t("aboutUs.values.strategy.title"),
      description: t("aboutUs.values.strategy.description"),
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 animate-fade-in">
            {t("aboutUs.title")} <span className="text-primary">{t("aboutUs.titleHighlight")}</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {t("aboutUs.description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="text-center group animate-fade-in"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-background transition-all duration-300 group-hover:scale-110">
                <value.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                {value.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 md:p-12 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">
                20+
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">
                {t("aboutUs.stats.experience")}
              </div>
            </div>
            <div className="border-x border-border/50">
              <div className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">
                500+
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">
                {t("aboutUs.stats.cases")}
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">
                98%
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">
                {t("aboutUs.stats.satisfaction")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
