import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import PracticeAreas from "@/components/home/PracticeAreas";
import FoundingPartners from "@/components/home/FoundingPartners";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <PracticeAreas />
        <FoundingPartners />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
