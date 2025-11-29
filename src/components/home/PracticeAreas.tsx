import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { usePracticeAreas } from "@/hooks/usePracticeAreas";
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

const PracticeAreas = () => {
  const { data: practiceAreas = [], isLoading } = usePracticeAreas();

  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
            <span className="text-primary text-sm font-medium tracking-wide">
              NOSSAS ESPECIALIDADES
            </span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            Áreas de Atuação
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expertise jurídica especializada em múltiplas áreas do direito para
            atender às demandas mais complexas.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Carregando áreas...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {practiceAreas.map((area, index) => {
            const Icon = iconMap[area.icon];
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
                <Card className="h-full p-8 border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-elegant hover:-translate-y-2 bg-background">
                  <div className="mb-6">
                    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                  </div>

                  <h3 className="font-heading text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {area.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {area.description}
                  </p>

                  <div className="flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                    Saiba mais
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/areas"
            className="inline-flex items-center text-primary font-medium hover:text-primary-dark transition-colors group"
          >
            Ver todas as áreas de atuação
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;
