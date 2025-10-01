import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroHeader = () => {
  const { t } = useLanguage();
  
  return (
    <header className="absolute top-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <nav className="flex items-center gap-4 sm:gap-8">
          <a 
            href="#about" 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('about')?.scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}
            className="text-hero-text hover:text-hero-text/80 transition-colors cursor-pointer text-sm sm:text-base"
          >
            {t('nav.about')}
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <SearchBar />
        </div>
      </div>
    </header>
  );
};

export default HeroHeader;