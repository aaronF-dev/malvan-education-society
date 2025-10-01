import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-footer-bg border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2 text-center md:text-left">
            <h3 className="text-base sm:text-lg md:text-xl font-serif text-white mb-2 sm:mb-3 md:mb-4">
              {t('footer.title')}
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-white/70 leading-relaxed px-2 sm:px-0">
              {t('footer.description')}
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-sm sm:text-base font-semibold text-white mb-2 sm:mb-3 md:mb-4">{t('footer.quick_links')}</h4>
            <nav className="space-y-1 sm:space-y-2">
              <Link 
                to="/" 
                className="block text-xs sm:text-sm md:text-base text-white/70 hover:text-white transition-colors"
              >
                {t('footer.home')}
              </Link>
              <Link 
                to="/about" 
                className="block text-xs sm:text-sm md:text-base text-white/70 hover:text-white transition-colors"
              >
                {t('footer.about_us')}
              </Link>
              <Link 
                to="#" 
                className="block text-xs sm:text-sm md:text-base text-white/70 hover:text-white transition-colors"
              >
                {t('footer.programs')}
              </Link>
              <Link 
                to="#" 
                className="block text-xs sm:text-sm md:text-base text-white/70 hover:text-white transition-colors"
              >
                {t('footer.admissions')}
              </Link>
            </nav>
          </div>
          
          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h4 className="text-sm sm:text-base font-semibold text-white mb-2 sm:mb-3 md:mb-4">{t('footer.contact')}</h4>
            <div className="space-y-1 text-xs sm:text-sm md:text-base text-white/70">
              <p>{t('footer.location')}</p>
              <p>{t('footer.phone')}</p>
              <p>{t('footer.email')}</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-4 sm:mt-6 md:mt-8 pt-4 sm:pt-6 md:pt-8 text-center text-xs sm:text-sm md:text-base text-white/70">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;