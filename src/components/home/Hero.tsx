import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Juris Company - Advocacia Premium"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/80 to-foreground/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10 py-20 flex items-center min-h-screen">
        <div className="max-w-4xl">
          <div className="inline-block mb-6 px-4 py-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full">
            <span className="text-primary-light text-sm font-medium tracking-wide">
              ADVOCACIA PREMIUM ESPECIALIZADA
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-background mb-8 leading-tight animate-fade-in">
            Excelência Jurídica{" "}
            <span className="text-primary-light">Estratégica</span>
          </h1>

          <p className="text-xl md:text-2xl text-background/80 mb-12 leading-relaxed max-w-2xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Soluções jurídicas complexas com expertise incomparável para empresas
            e executivos que exigem resultados diferenciados.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button
              size="lg"
              className="gradient-wine text-lg px-8 py-6 shadow-elegant hover:scale-105 transition-all group"
              asChild
            >
              <Link to="/contato">
                Agende uma Consulta
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2 border-background bg-transparent text-background hover:border-primary hover:text-primary hover:bg-transparent transition-all"
              asChild
            >
              <Link to="/areas">Conheça Nossas Áreas</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
