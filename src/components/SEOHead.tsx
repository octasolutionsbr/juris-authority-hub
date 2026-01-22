import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  noindex?: boolean;
  structuredData?: object | object[];
  faqItems?: Array<{ question: string; answer: string }>;
  geoLocation?: {
    city: string;
    region: string;
    country: string;
    latitude?: number;
    longitude?: number;
  };
}

const BASE_URL = 'https://juriscompany.net';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;

const defaultKeywords = 'advocacia empresarial Macapá, advogado petróleo Amapá, assessoria jurídica óleo e gás, direito empresarial Macapá, advogado empresarial Amapá, advocacia offshore Amapá, licenciamento ambiental petróleo, direito tributário petroleiras, exploração petróleo costa Amapá';

const defaultGeoLocation = {
  city: 'Macapá',
  region: 'Amapá',
  country: 'Brazil',
  latitude: 0.0349,
  longitude: -51.0694
};

export const SEOHead = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noindex = false,
  structuredData,
  faqItems,
  geoLocation = defaultGeoLocation,
}: SEOHeadProps) => {
  const fullTitle = title 
    ? `${title} | Juris Company - Advocacia Empresarial Macapá`
    : 'Juris Company | Advocacia Empresarial em Macapá - Especialistas em Petróleo e Gás no Amapá';
  
  const fullDescription = description || 
    'Escritório de advocacia empresarial em Macapá-AP especializado em assessoria jurídica para empresas de petróleo e gás. Expertise em direito empresarial, ambiental, tributário e regulatório para o setor de óleo e gás na costa do Amapá.';
  
  const fullKeywords = keywords 
    ? `${keywords}, ${defaultKeywords}`
    : defaultKeywords;

  const fullCanonicalUrl = canonicalUrl 
    ? `${BASE_URL}${canonicalUrl}`
    : undefined;

  // Generate FAQ Schema
  const faqSchema = faqItems && faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  } : null;

  // LocalBusiness Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "Juris Company",
    "description": fullDescription,
    "url": BASE_URL,
    "telephone": "+55 96 93223-1425",
    "email": "marinilson.adv@icloud.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "R. Prof. Tostes, 783 - Centro",
      "addressLocality": geoLocation.city,
      "addressRegion": geoLocation.region,
      "addressCountry": geoLocation.country,
      "postalCode": "68900-022"
    },
    "geo": geoLocation.latitude && geoLocation.longitude ? {
      "@type": "GeoCoordinates",
      "latitude": geoLocation.latitude,
      "longitude": geoLocation.longitude
    } : undefined,
    "areaServed": [
      {
        "@type": "State",
        "name": "Amapá"
      },
      {
        "@type": "City",
        "name": "Macapá"
      }
    ],
    "priceRange": "$$",
    "openingHours": "Mo-Fr 08:00-18:00",
    "sameAs": [
      "https://www.linkedin.com/company/juriscompany",
      "https://www.instagram.com/juriscompany"
    ]
  };

  // Combine all structured data
  const allStructuredData: object[] = [];
  
  if (structuredData) {
    if (Array.isArray(structuredData)) {
      allStructuredData.push(...structuredData);
    } else {
      allStructuredData.push(structuredData);
    }
  }
  
  if (faqSchema) {
    allStructuredData.push(faqSchema);
  }

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />
      
      {/* Geo-location Meta Tags */}
      <meta name="geo.region" content={`BR-${geoLocation.region.substring(0, 2).toUpperCase()}`} />
      <meta name="geo.placename" content={geoLocation.city} />
      {geoLocation.latitude && geoLocation.longitude && (
        <meta name="geo.position" content={`${geoLocation.latitude};${geoLocation.longitude}`} />
      )}
      {geoLocation.latitude && geoLocation.longitude && (
        <meta name="ICBM" content={`${geoLocation.latitude}, ${geoLocation.longitude}`} />
      )}
      
      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      
      {/* Canonical URL */}
      {fullCanonicalUrl && <link rel="canonical" href={fullCanonicalUrl} />}
      
      {/* Language alternates */}
      {fullCanonicalUrl && (
        <>
          <link rel="alternate" hrefLang="pt-BR" href={fullCanonicalUrl} />
          <link rel="alternate" hrefLang="en" href={`${fullCanonicalUrl}?lang=en`} />
          <link rel="alternate" hrefLang="x-default" href={fullCanonicalUrl} />
        </>
      )}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={ogImage} />
      {fullCanonicalUrl && <meta property="og:url" content={fullCanonicalUrl} />}
      <meta property="og:site_name" content="Juris Company" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:locale:alternate" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional SEO Tags */}
      <meta name="author" content="Juris Company" />
      <meta name="publisher" content="Juris Company" />
      <meta name="language" content="Portuguese" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Local Business Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      
      {/* Additional Structured Data */}
      {allStructuredData.map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;