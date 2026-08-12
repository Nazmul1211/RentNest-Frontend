import { Suspense } from "react";
import HeroSection from "./_components/HeroSection";
import CategorySection from "./_components/CategorySection";
import FeaturedProperties, { FeaturedPropertiesSkeleton } from "./_components/FeaturedProperties";
import HowItWorksSection from "./_components/HowItWorksSection";
import RentalClaritySection from "./_components/RentalClaritySection";
import RoleWorkspaceSection from "./_components/RoleWorkspaceSection";
import PricingSection from "./_components/PricingSection";
import TestimonialsSection from "./_components/TestimonialsSection";
import ValuePropsSection from "./_components/ValuePropsSection";
import HomeFaqSection from "./_components/HomeFaqSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      {/* 1. Hero & Search Bar Section */}
      <HeroSection />

      {/* 2. Property Categories Showcase Section */}
      <CategorySection />

      {/* 3. Featured Listings Section */}
      <Suspense fallback={<FeaturedPropertiesSkeleton />}>
        <FeaturedProperties />
      </Suspense>

      {/* 4. Interactive 3-Step Rental Process */}
      <HowItWorksSection />

      {/* 5. Rental Transparency Section */}
      <RentalClaritySection />

      {/* 6. Role-Based Workspaces Section */}
      <RoleWorkspaceSection />

      {/* 7. Rent-Based Pricing (Zero Subscription) Section */}
      <PricingSection />

      {/* 8. Verified Community Reviews & Testimonials */}
      <TestimonialsSection />

      {/* 9. Why RentNest & Conversion CTA Section */}
      <ValuePropsSection />

      {/* 10. Frequently Asked Questions */}
      <HomeFaqSection />
    </main>
  );
}
