import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  const scrollToAreas = () => {
    const element = document.getElementById("areas-de-atuacao");
    element?.scrollIntoView({ behavior: "smooth" });
  };
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Juris Company - Advocacia Premium"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/45" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10 py-20 flex items-center min-h-screen">
        <div className="max-w-4xl">
          <div className="inline-block mb-6 px-4 py-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full">
            <span className="text-primary-light text-sm font-medium tracking-wide">
              {t("hero.badge")}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-background mb-8 leading-tight animate-fade-in">
            {t("hero.title")}{" "}
            <span className="text-primary-light whitespace-nowrap">{t("hero.subtitle")}</span>
          </h1>

          <p className="text-xl md:text-2xl text-background/80 mb-12 leading-relaxed max-w-2xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {t("hero.description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button
              size="lg"
              className="gradient-wine text-lg px-8 py-6 shadow-elegant hover:scale-105 transition-all group"
              asChild
            >
              <Link to="/contato">
                {t("hero.cta")}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2 border-background bg-transparent text-background hover:border-primary hover:text-primary hover:bg-transparent transition-all"
              onClick={scrollToAreas}
            >
              {t("hero.knowAreas")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
