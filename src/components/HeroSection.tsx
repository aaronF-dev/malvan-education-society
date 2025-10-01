import HeroHeader from "./HeroHeader";
import HarvardLogo from "./HarvardLogo";

import heroImage from "@/assets/hero1.png";

const HeroSection = () => {

  return (
    <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Malvan Education Society classical architecture"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-hero-overlay" />
      </div>

      {/* Header */}
      <HeroHeader />

      {/* Main Content */}
      <div className="relative z-30 flex items-center justify-center h-full pt-20 pb-12">
        <HarvardLogo />
      </div>


    </section>
  );
};

export default HeroSection;