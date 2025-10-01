import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'mr' : 'en');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="text-hero-text hover:text-hero-text/80 hover:bg-white/10 transition-colors gap-2"
    >
      <Globe className="w-4 h-4" />
      <span className="font-medium">
        {language === 'en' ? 'मर' : 'EN'}
      </span>
    </Button>
  );
};

export default LanguageToggle;