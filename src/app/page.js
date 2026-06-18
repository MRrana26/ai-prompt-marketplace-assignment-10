import FeaturedPrompts from "@/components/FeaturedPrompts";
import HeroBanner from "@/components/HeroBanner";


export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroBanner />
      <FeaturedPrompts />
    </div>
  );
}
