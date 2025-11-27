import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import AboutUs from "@/components/home/AboutUs";
import PracticeAreas from "@/components/home/PracticeAreas";
import OpportunitiesSection from "@/components/home/OpportunitiesSection";
import FoundingPartners from "@/components/home/FoundingPartners";
import ContactSection from "@/components/home/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <AboutUs />
        <PracticeAreas />
        <OpportunitiesSection />
        <FoundingPartners />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
