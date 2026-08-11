import { Suspense } from "react";
import HeroSection from "./_components/HeroSection";
import CategorySection from "./_components/CategorySection";
import FeaturedProperties, { FeaturedPropertiesSkeleton } from "./_components/FeaturedProperties";
import HomeFaqSection from "./_components/HomeFaqSection";
import PricingSection from "./_components/PricingSection";
import RentalClaritySection from "./_components/RentalClaritySection";
import RoleWorkspaceSection from "./_components/RoleWorkspaceSection";
import ValuePropsSection from "./_components/ValuePropsSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      {/*Hero & Search Bar Section*/}
      <HeroSection />

      {/*Property Categories Showcase Section*/}
      <CategorySection />

      {/*Featured Listings Section*/}
      <Suspense fallback={<FeaturedPropertiesSkeleton />}>
        <FeaturedProperties />
      </Suspense>

      {/*Rental Transparency Section*/}
      <RentalClaritySection />

      {/*Role-Based Workspaces Section*/}
      <RoleWorkspaceSection />

      {/*Rent-Based Pricing(Zero Subscription) Section*/}
      <PricingSection />

      {/*Why RentNest & Conversion CTA Section*/}
      <ValuePropsSection />

      {/*Frequently Asked Questions*/}
      <HomeFaqSection />
    </main>
  );
}
