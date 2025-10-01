import HeroSection from "../components/HeroSection";
import EducationalSections from "../components/EducationalSections";
import AboutSection from "../components/AboutSection";
import Footer from "../components/Footer";
import { Chatbot } from "../components/Chatbot";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <div id="educational-sections">
        <EducationalSections />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <div id="contact">
        <Footer />
      </div>
      <Chatbot />
    </div>
  );
};

export default Index;
