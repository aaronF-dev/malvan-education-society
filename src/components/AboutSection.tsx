import heroImage from "@/assets/mes-about.png";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutSection = () => {
  const { t } = useLanguage();
  
  return (
    <section id="about" className="relative h-[60vh] sm:h-[80vh] overflow-hidden -mt-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Malvan Education Society campus"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-30 flex items-center h-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            {/* Left side - Main heading */}
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-6 sm:mb-8 leading-tight">
                {t('About MES')}
              </h1>
            </div>

            {/* Right side - Description */}
            <div className="text-center lg:text-left">
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed font-light">
                {t('about.description')}
              </p>
              <div className="mt-6 sm:mt-8 flex justify-center lg:justify-start">
                <div className="w-12 h-0.5 bg-white/60"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;