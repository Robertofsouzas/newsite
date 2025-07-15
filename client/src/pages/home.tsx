import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import AIBenefitsSection from "@/components/ai-benefits-section";
import PortfolioSection from "@/components/portfolio-section";
import BusinessCarousel from "@/components/business-carousel";
import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <AIBenefitsSection />
      <PortfolioSection />
      <BusinessCarousel />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
