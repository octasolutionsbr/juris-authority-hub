import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  noindex?: boolean;
  structuredData?: object;
}

const BASE_URL = 'https://juriscompany.net';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;

const defaultKeywords = 'advocacia empresarial Macapá, advogado petróleo Amapá, assessoria jurídica óleo e gás, direito empresarial Macapá, advogado empresarial Amapá, advocacia offshore Amapá, licenciamento ambiental petróleo, direito tributário petroleiras, exploração petróleo costa Amapá';

export const SEOHead = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noindex = false,
  structuredData,
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

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />
      
      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large" />
      )}
      
      {/* Canonical URL */}
      {fullCanonicalUrl && <link rel="canonical" href={fullCanonicalUrl} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={ogImage} />
      {fullCanonicalUrl && <meta property="og:url" content={fullCanonicalUrl} />}
      <meta property="og:site_name" content="Juris Company" />
      <meta property="og:locale" content="pt_BR" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
