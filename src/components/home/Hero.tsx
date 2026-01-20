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
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
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
      <div className="container mx-auto px-4 lg:px-8 relative z-10 py-8 md:py-20 flex items-center h-full">
        <div className="max-w-4xl">
          <div className="inline-block mb-3 md:mb-6 px-3 md:px-4 py-1.5 md:py-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full">
            <span className="text-primary-light text-xs md:text-sm font-medium tracking-wide">
              {t("hero.badge")}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-background mb-4 md:mb-8 leading-tight animate-fade-in">
            {t("hero.title")}{" "}
            <span className="text-primary-light">{t("hero.subtitle")}</span>
          </h1>

          <p className="text-base sm:text-lg md:text-2xl text-background/80 mb-6 md:mb-12 leading-relaxed max-w-2xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {t("hero.description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button
              size="lg"
              className="gradient-wine text-base md:text-lg px-6 md:px-8 py-4 md:py-6 shadow-elegant hover:scale-105 transition-all group"
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
              className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 border-2 border-background bg-transparent text-background hover:border-primary hover:text-primary hover:bg-transparent transition-all"
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
