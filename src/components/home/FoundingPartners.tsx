import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { teamMembers } from "@/data/team";

const FoundingPartners = () => {
  const partners = teamMembers.filter((member) => member.role === "socio").slice(0, 5);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
            <span className="text-primary text-sm font-medium tracking-wide">
              LIDERANÇA
            </span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
            Sócios Fundadores
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Profissionais de excelência com décadas de experiência em suas áreas de
            especialização.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {partners.map((partner, index) => (
            <Card
              key={partner.id}
              className="overflow-hidden border-2 border-border hover:border-primary hover:shadow-elegant transition-all duration-300 group"
              style={{
                animation: `fade-up 0.6s ease-out forwards`,
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
              }}
            >
              {/* Photo Placeholder */}
              <div className="relative h-80 bg-gradient-to-br from-muted to-muted-foreground/20 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl font-heading font-bold text-muted-foreground/30">
                    {partner.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-heading text-xl font-semibold text-foreground mb-1">
                  {partner.name}
                </h3>
                <p className="text-primary text-sm font-medium mb-3">
                  {partner.title}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                  {partner.bio}
                </p>

                {/* Contact Buttons */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    asChild
                  >
                    <a
                      href={`https://wa.me/${partner.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    asChild
                  >
                    <a href={`mailto:${partner.email}`}>
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </a>
                  </Button>
                </div>

                {/* View Profile Link */}
                <Link
                  to={`/equipe/${partner.id}`}
                  className="block mt-4 text-center text-sm text-primary hover:text-primary-dark font-medium transition-colors"
                >
                  Ver Perfil Completo →
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link to="/equipe">Conheça Toda a Equipe</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FoundingPartners;
