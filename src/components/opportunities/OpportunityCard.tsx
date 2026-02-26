import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, FileText, Briefcase, Mail, ImageOff, ArrowRight, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Listing } from "@/hooks/useListings";

interface OpportunityCardProps {
  listing: Listing;
}

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  imoveis: Building2,
  precatorios: FileText,
  outros: Briefcase,
};

export const OpportunityCard = ({ listing }: OpportunityCardProps) => {
  const { t, i18n } = useTranslation();
  const Icon = categoryIcons[listing.category] || Briefcase;
  const hasImage = listing.images && listing.images.length > 0;
  const isEnglish = i18n.language === "en";

  const title = isEnglish && listing.title_en ? listing.title_en : listing.title;
  const description = isEnglish && listing.description_en ? listing.description_en : listing.description;

  return (
    <Card className="hover:shadow-lg transition-all duration-300 group overflow-hidden">
      {/* Image section for properties */}
      {listing.category === "imoveis" && (
        <Link to={`/oportunidades/${listing.id}`}>
          <div className="relative h-48 bg-muted overflow-hidden">
            {hasImage ? (
              <img
                src={listing.images![0]}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageOff className="w-12 h-12 text-muted-foreground/50" />
              </div>
            )}
          </div>
        </Link>
      )}

      <CardHeader>
        <div className="flex items-start gap-3">
          <Icon className="w-6 h-6 text-primary shrink-0" />
          <div className="flex-1 min-w-0">
            <Link to={`/oportunidades/${listing.id}`}>
              <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                {title}
              </CardTitle>
            </Link>
            <CardDescription className="mt-1 line-clamp-2">
              {description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {listing.price && (
          <span className="text-2xl font-bold text-primary">
            R$ {listing.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </span>
        )}

        <div className="flex gap-2">
          <Button className="flex-1" variant="outline" asChild>
            <Link to={`/oportunidades/${listing.id}`}>
              {t("opportunityDetail.viewDetails")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          {(() => {
            const whatsappNumber = listing.contact_whatsapp || listing.creator_whatsapp;
            if (whatsappNumber) {
              const cleanNumber = whatsappNumber.replace(/\D/g, '');
              return (
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <a href={`https://wa.me/${cleanNumber}`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </Button>
              );
            }
            return null;
          })()}
          {listing.creator_email && (
            <Button asChild>
              <a href={`mailto:${listing.creator_email}`}>
                <Mail className="w-4 h-4" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
