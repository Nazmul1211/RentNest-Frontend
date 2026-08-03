import HeroSection from "./_components/HeroSection";
import CategorySection from "./_components/CategorySection";
import FeaturedProperties from "./_components/FeaturedProperties";
import PricingSection from "./_components/PricingSection";
import ValuePropsSection from "./_components/ValuePropsSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      {/*Hero & Search Bar Section*/}
      <HeroSection />

      {/*Property Categories Showcase Section*/}
      <CategorySection />

      {/*Featured Listings Section*/}
      <FeaturedProperties />

      {/*Rent-Based Pricing(Zero Subscription) Section*/}
      <PricingSection />

      {/*Why RentNest & Conversion CTA Section*/}
      <ValuePropsSection />
    </main>
  );
}
