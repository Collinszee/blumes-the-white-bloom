import Nav from "@/components/blumes/Nav";
import Hero from "@/components/blumes/Hero";
import Gallery from "@/components/blumes/Gallery";
import Stats from "@/components/blumes/Stats";
import Artists from "@/components/blumes/Artists";
import Footer from "@/components/blumes/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Stats />
      <Gallery />
      <Artists />
      <Footer />
    </main>
  );
};

export default Index;
