import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Target, Eye, Award, Users, TrendingUp, Scale, Clock, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEOHead from "@/components/SEOHead";

const About = () => {
  const { t } = useTranslation();
  
  const values = [
    {
      icon: Scale,
      title: t("aboutPage.values.excellence.title"),
      description: t("aboutPage.values.excellence.description"),
    },
    {
      icon: Shield,
      title: t("aboutPage.values.ethics.title"),
      description: t("aboutPage.values.ethics.description"),
    },
    {
      icon: Users,
      title: t("aboutPage.values.client.title"),
      description: t("aboutPage.values.client.description"),
    },
    {
      icon: TrendingUp,
      title: t("aboutPage.values.innovation.title"),
      description: t("aboutPage.values.innovation.description"),
    },
  ];

  const stats = [
    { number: "5+", label: t("aboutPage.stats.experience") },
    { number: "26", label: t("aboutPage.stats.clients") },
    { number: "10+", label: t("aboutPage.stats.cases") },
    { number: "500+", label: t("aboutPage.stats.operations") },
  ];

  const differentials = [
    {
      icon: Clock,
      title: t("aboutPage.diffList.agility.title"),
      description: t("aboutPage.diffList.agility.description"),
    },
    {
      icon: Award,
      title: t("aboutPage.diffList.specialization.title"),
      description: t("aboutPage.diffList.specialization.description"),
    },
    {
      icon: Target,
      title: t("aboutPage.diffList.results.title"),
      description: t("aboutPage.diffList.results.description"),
    },
    {
      icon: Eye,
      title: t("aboutPage.diffList.transparency.title"),
      description: t("aboutPage.diffList.transparency.description"),
    },
  ];

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
        "name": "Sobre Nós",
        "item": "https://juriscompany.net/sobre"
      }
    ]
  };

  return (
    <>
      <SEOHead 
        title="Sobre Nós - História e Valores"
        description="Conheça a Juris Company, escritório de advocacia empresarial em Macapá-AP com mais de 25 anos de experiência. Especialistas em direito empresarial, petróleo e gás, com mais de 1.000 casos de sucesso."
        keywords="sobre Juris Company, escritório advocacia Macapá, história advocacia Amapá, valores advocacia empresarial"
        canonicalUrl="/sobre"
        structuredData={breadcrumbSchema}
      />
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          {/* Nossa História */}
          <section className="relative py-16 pt-8 bg-gradient-to-br from-[#722F37] via-[#5C252C] to-[#3D1A1E] overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 right-20 w-64 h-64 bg-[#8B3A42] rounded-full blur-3xl" />
              <div className="absolute bottom-5 left-10 w-80 h-80 bg-[#4A2228] rounded-full blur-3xl" />
            </div>
            
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                  <span className="inline-block px-4 py-2 bg-white/10 text-white/80 rounded-full text-sm font-medium tracking-wide uppercase mb-4">
                    {t("aboutPage.title")}
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
                    {t("aboutPage.ourStory")}
                  </h1>
                  <div className="w-20 h-1 bg-gradient-to-r from-white/80 to-white/30 rounded-full" />
                </div>
                
                <div className="space-y-5 text-base md:text-lg text-white/85 leading-relaxed max-w-4xl">
                  <p className="text-white/95 font-medium">{t("aboutPage.storyContent1")}</p>
                  <p>{t("aboutPage.storyContent2")}</p>
                  <p>{t("aboutPage.storyContent3")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Missão e Visão */}
          <section className="py-20 bg-secondary">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                <Card className="p-8 border-2">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Target className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-foreground">
                      {t("aboutPage.mission")}
                    </h3>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {t("aboutPage.missionText")}
                  </p>
                </Card>

                <Card className="p-8 border-2">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Eye className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-foreground">
                      {t("aboutPage.vision")}
                    </h3>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {t("aboutPage.visionText")}
                  </p>
                </Card>
              </div>
            </div>
          </section>

          {/* Valores */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-12 text-center">
                  {t("aboutPage.ourValues")}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {values.map((value, index) => {
                    const Icon = value.icon;
                    return (
                      <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                          {value.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {value.description}
                        </p>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Números */}
          <section className="py-20 bg-gradient-to-br from-primary to-primary/80">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-12 text-center">
                  {t("aboutPage.ourNumbers")}
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-2">
                        {stat.number}
                      </div>
                      <div className="text-lg text-primary-foreground/80">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Diferenciais */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-12 text-center">
                  {t("aboutPage.differentials")}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {differentials.map((diff, index) => {
                    const Icon = diff.icon;
                    return (
                      <div key={index} className="text-center">
                        <div className="w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 hover:bg-primary hover:scale-105 transition-all duration-300 group">
                          <Icon className="w-10 h-10 text-primary group-hover:text-primary-foreground transition-colors" />
                        </div>
                        <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                          {diff.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {diff.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default About;
