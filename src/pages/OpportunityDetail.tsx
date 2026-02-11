import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { 
  ArrowLeft, 
  MapPin, 
  Ruler, 
  Mail, 
  Building2, 
  FileText, 
  Briefcase,
  ImageOff,
  Check
} from "lucide-react";
import { useListing } from "@/hooks/useListings";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  imoveis: Building2,
  precatorios: FileText,
  outros: Briefcase,
};

const categoryLabels: Record<string, { pt: string; en: string }> = {
  imoveis: { pt: "Imóveis", en: "Real Estate" },
  precatorios: { pt: "Precatórios", en: "Court Orders" },
  creditos: { pt: "Créditos Tributários", en: "Tax Credits" },
  outros: { pt: "Outros Ativos", en: "Other Assets" },
};

export default function OpportunityDetail() {
  const { id } = useParams<{ id: string }>();
  const { i18n, t } = useTranslation();
  const { data: listing, isLoading } = useListing(id);
  const isEnglish = i18n.language === "en";

  const getLocalizedField = <T,>(ptField: T, enField: T | null): T => {
    if (isEnglish && enField) return enField;
    return ptField;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-muted-foreground">{t("common.loading")}</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center gap-4">
          <p className="text-muted-foreground">{t("opportunityDetail.notFound")}</p>
          <Button asChild variant="outline">
            <Link to="/oportunidades">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("opportunityDetail.backToOpportunities")}
            </Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const Icon = categoryIcons[listing.category] || Briefcase;
  const title = getLocalizedField(listing.title, listing.title_en);
  const description = getLocalizedField(listing.description, listing.description_en);
  const longDescription = getLocalizedField(listing.long_description, listing.long_description_en);
  const location = getLocalizedField(listing.location, listing.location_en);
  const features = getLocalizedField(listing.features, listing.features_en) || [];
  const categoryLabel = isEnglish 
    ? categoryLabels[listing.category]?.en 
    : categoryLabels[listing.category]?.pt;

  const hasImages = listing.images && listing.images.length > 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/oportunidades" className="hover:text-primary transition-colors">
              {t("opportunitiesPage.title")}
            </Link>
            <span>/</span>
            <span>{categoryLabel}</span>
            <span>/</span>
            <span className="text-foreground font-medium truncate max-w-[200px]">{title}</span>
          </nav>
        </div>

        {/* Main Content */}
        <section className="container mx-auto px-4 lg:px-8 pb-16">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column - Gallery */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery */}
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  {hasImages ? (
                    <Carousel className="w-full">
                      <CarouselContent>
                        {listing.images!.map((image, index) => (
                          <CarouselItem key={index}>
                            <div className="aspect-video relative">
                              <img
                                src={image}
                                alt={`${title} - ${index + 1}`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                decoding="async"
                              />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      {listing.images!.length > 1 && (
                        <>
                          <CarouselPrevious className="left-4" />
                          <CarouselNext className="right-4" />
                        </>
                      )}
                    </Carousel>
                  ) : (
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      <ImageOff className="w-16 h-16 text-muted-foreground/50" />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Thumbnail Strip */}
              {hasImages && listing.images!.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {listing.images!.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Thumb ${index + 1}`}
                      className="w-20 h-14 object-cover rounded-md border-2 border-transparent hover:border-primary cursor-pointer transition-colors"
                      loading="lazy"
                      decoding="async"
                    />
                  ))}
                </div>
              )}

              {/* Description */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold">{t("opportunityDetail.description")}</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                  
                  {longDescription && (
                    <>
                      <Separator />
                      <h3 className="text-lg font-semibold">{t("opportunityDetail.details")}</h3>
                      <div className="prose prose-sm max-w-none text-muted-foreground">
                        {longDescription.split('\n').map((paragraph, idx) => (
                          <p key={idx}>{paragraph}</p>
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Features */}
              {features.length > 0 && (
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <h2 className="text-xl font-semibold">{t("opportunityDetail.features")}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-primary shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Info & Contact */}
            <div className="space-y-6">
              {/* Main Info Card */}
              <Card className="sticky top-24">
                <CardContent className="p-6 space-y-6">
                  {/* Category Badge */}
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-primary" />
                    <Badge variant="secondary">{categoryLabel}</Badge>
                  </div>

                  {/* Title */}
                  <h1 className="text-2xl font-bold leading-tight">{title}</h1>

                  {/* Price */}
                  {listing.price && (
                    <div className="text-3xl font-bold text-primary">
                      R$ {listing.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </div>
                  )}

                  <Separator />

                  {/* Quick Info */}
                  <div className="space-y-3">
                    {location && (
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <MapPin className="w-5 h-5 shrink-0" />
                        <span>{location}</span>
                      </div>
                    )}
                    {listing.area && (
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Ruler className="w-5 h-5 shrink-0" />
                        <span>{listing.area.toLocaleString("pt-BR")} m²</span>
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Contact Button */}
                  {listing.creator_email && (
                    <Button className="w-full" size="lg" asChild>
                      <a href={`mailto:${listing.creator_email}`}>
                        <Mail className="w-4 h-4 mr-2" />
                        {t("opportunitiesPage.contactInterest")}
                      </a>
                    </Button>
                  )}

                  {/* Back Link */}
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/oportunidades">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      {t("opportunityDetail.backToOpportunities")}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
