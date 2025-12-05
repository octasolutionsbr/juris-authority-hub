import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, FileText, Briefcase, Mail, ImageOff } from "lucide-react";
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
  const { t } = useTranslation();
  const Icon = categoryIcons[listing.category] || Briefcase;
  const hasImage = listing.images && listing.images.length > 0;

  return (
    <Card className="hover:shadow-lg transition-all duration-300 group overflow-hidden">
      {/* Image section for properties */}
      {listing.category === "imoveis" && (
        <div className="relative h-48 bg-muted overflow-hidden">
          {hasImage ? (
            <img
              src={listing.images![0]}
              alt={listing.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageOff className="w-12 h-12 text-muted-foreground/50" />
            </div>
          )}
        </div>
      )}

      <CardHeader>
        <div className="flex items-start gap-3">
          <Icon className="w-6 h-6 text-primary shrink-0" />
          <div>
            <CardTitle className="text-xl group-hover:text-primary transition-colors">
              {listing.title}
            </CardTitle>
            <CardDescription className="mt-1 line-clamp-2">
              {listing.description}
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

        <Button className="w-full" asChild>
          <a href="mailto:contato@octadvogados.com.br">
            <Mail className="w-4 h-4 mr-2" />
            {t("opportunitiesPage.contactInterest")}
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};
