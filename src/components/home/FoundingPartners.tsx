import { Card } from "@/components/ui/card";
import { Mail, MessageSquare } from "lucide-react";
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

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {partners.map((partner, index) => (
            <Link
              key={partner.id}
              to={`/equipe/${partner.id}`}
              className="block"
              style={{
                animation: `fade-up 0.6s ease-out forwards`,
                animationDelay: `${index * 0.1}s`,
                opacity: 0,
              }}
            >
              <Card className="overflow-hidden border-2 border-border hover:border-primary hover:shadow-elegant transition-all duration-300 group cursor-pointer h-full">
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
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                    {partner.bio}
                  </p>

                  {/* Contact Icons */}
                  <div className="flex gap-3 justify-center pt-2">
                    <a
                      href={`https://wa.me/${partner.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-full border border-border hover:border-primary hover:bg-primary/10 transition-colors"
                    >
                      <MessageSquare className="w-5 h-5 text-foreground" />
                    </a>
                    <a
                      href={`mailto:${partner.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-full border border-border hover:border-primary hover:bg-primary/10 transition-colors"
                    >
                      <Mail className="w-5 h-5 text-foreground" />
                    </a>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/equipe"
            className="inline-flex items-center justify-center h-11 px-8 rounded-md border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground font-medium transition-colors"
          >
            Conheça Toda a Equipe
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FoundingPartners;
