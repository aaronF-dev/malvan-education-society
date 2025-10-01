import { useLanguage } from "@/contexts/LanguageContext";
import mesLogo from "@/assets/mes-logo-new.png";

const HarvardLogo = () => {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col items-center justify-center text-center">
      {/* MES Shield Logo */}
      <div className="mb-6 sm:mb-8">
        <img
          src={mesLogo}
          alt="Malvan Education Society Shield Logo"
          className="w-24 h-28 sm:w-[120px] sm:h-[140px] lg:w-[140px] lg:h-[168px] xl:w-[160px] xl:h-[192px] object-contain"
        />
      </div>

      {/* Malvan Education Society Text */}
      <h1 className="text-hero-text font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-wide leading-tight text-center">
        {t('hero.malvan')}
        <br />
        <span className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-widest">
          {t('hero.education_society')}
        </span>
      </h1>
    </div>
  );
};

export default HarvardLogo;