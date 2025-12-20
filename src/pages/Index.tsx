import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import AboutUs from "@/components/home/AboutUs";
import PracticeAreas from "@/components/home/PracticeAreas";
import OpportunitiesSection from "@/components/home/OpportunitiesSection";
import FoundingPartners from "@/components/home/FoundingPartners";
import ContactSection from "@/components/home/ContactSection";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Início",
        "item": "https://juriscompany.net/"
      }
    ]
  };
  return (
    <>
      <SEOHead 
        canonicalUrl="/"
        structuredData={breadcrumbSchema}
      />
      <div className="min-h-screen">
        <Header />
        <main>
        <Hero />
        <AboutUs />
        <PracticeAreas />
        <FoundingPartners />
        <OpportunitiesSection />
        <ContactSection />
      </main>
      <Footer />
      </div>
    </>
  );
};

export default Index;
