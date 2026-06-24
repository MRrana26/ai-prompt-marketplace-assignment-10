import FeaturedPrompts from "@/components/FeaturedPrompts";
import HeroBanner from "@/components/HeroBanner";
import WhyChooseUs from "@/components/WhyChooseUs";
import TopCreators from "@/components/TopCreators";
import CustomerReviews from "@/components/CustomerReviews";
import AIToolsShowcase from "@/components/AIToolsShowcase";
import HowItWorks from "@/components/HowItWorks";


export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroBanner />
      <FeaturedPrompts /> 
      <WhyChooseUs />
      <TopCreators />
      <CustomerReviews />
      <AIToolsShowcase/>
      <HowItWorks/>
    </div>
  );
}
