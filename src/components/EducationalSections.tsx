import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import CommitteeSection from "./CommitteeSection";
import topiwalSchoolImg from "@/assets/topiwala-school.png";
import malvanTechImg from "@/assets/topiwala-college.png";
import jaiGaneshSchoolImg from "@/assets/jai-ganesh-school.png";
import malvanBusinessImg from "@/assets/paruyekar.png";
import malvanArtsImg from "@/assets/ghurye.png";

const EducationalSections = () => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-background py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">
            {t('schools.title')}
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
            {t('schools.subtitle')}
          </p>
          <div className="w-32 h-1 bg-primary mx-auto rounded-full"></div>
        </div>
        
        <div className="space-y-12 sm:space-y-24">
          {/* Malvan College Section */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center bg-card rounded-2xl p-4 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="lg:w-1/2">
              <img
                src={topiwalSchoolImg}
                alt="Students in classroom at Topiwala School"
                className="w-full h-60 sm:h-80 object-cover rounded-xl shadow-md"
              />
            </div>
            <div className="lg:w-1/2 lg:pl-8 text-center lg:text-left">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
                <p className="text-sm text-primary font-semibold uppercase tracking-wide">
                  {t('college.founded')}
                </p>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-4 sm:mb-6 text-foreground">
                {t('college.title')}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6 sm:mb-8 text-base sm:text-lg">
                {t('college.description')}
              </p>
              <Button
  variant="outline"
  size="lg"
  className="hover:bg-primary hover:text-primary-foreground transition-colors"
  onClick={() => window.open('https://ths.topiwala-mes.org', '_blank')}
>
  {t('college.explore')}
</Button>
            </div>
          </div>

          {/* Malvan School of Technology Section */}
          <div className="flex flex-col lg:flex-row-reverse gap-6 lg:gap-12 items-center bg-card rounded-2xl p-4 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="lg:w-1/2">
              <img
                src={malvanTechImg}
                alt="Engineering and Applied Sciences at Malvan"
                className="w-full h-60 sm:h-80 object-cover rounded-xl shadow-md"
              />
            </div>
            <div className="lg:w-1/2 lg:pr-8 text-center lg:text-left">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
                <p className="text-sm text-primary font-semibold uppercase tracking-wide">
                  {t('tech.founded')}
                </p>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-4 sm:mb-6 text-foreground">
                {t('tech.title')}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6 sm:mb-8 text-base sm:text-lg">
                {t('tech.description')}
              </p>
             <Button
  variant="outline"
  size="lg"
  className="hover:bg-primary hover:text-primary-foreground transition-colors"
  onClick={() => window.open('https://ths.topiwala-mes.org', '_blank')}
>
  {t('college.explore')}
</Button>
            </div>
          </div>

          {/* Malvan School of Medicine Section */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center bg-card rounded-2xl p-4 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="lg:w-1/2">
              <img
                src={jaiGaneshSchoolImg}
                alt="Students at Jai Ganesh School"
                className="w-full h-60 sm:h-80 object-cover rounded-xl shadow-md"
              />
            </div>
            <div className="lg:w-1/2 lg:pl-8 text-center lg:text-left">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
                <p className="text-sm text-primary font-semibold uppercase tracking-wide">
                  {t('medical.founded')}
                </p>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-4 sm:mb-6 text-foreground">
                {t('medical.title')}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6 sm:mb-8 text-base sm:text-lg">
                {t('medical.description')}
              </p>
             <Button
  variant="outline"
  size="lg"
  className="hover:bg-primary hover:text-primary-foreground transition-colors"
  onClick={() => window.open('https://jayganesh.topiwala-mes.org', '_blank')}
>
  {t('medical.explore')}
</Button>
            </div>
          </div>

          {/* Malvan Business School Section */}
          <div className="flex flex-col lg:flex-row-reverse gap-6 lg:gap-12 items-center bg-card rounded-2xl p-4 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="lg:w-1/2">
              <img
                src={malvanBusinessImg}
                alt="Business students at Malvan Business School"
                className="w-full h-60 sm:h-80 object-cover rounded-xl shadow-md"
              />
            </div>
            <div className="lg:w-1/2 lg:pr-8 text-center lg:text-left">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
                <p className="text-sm text-primary font-semibold uppercase tracking-wide">
                  {t('business.founded')}
                </p>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-4 sm:mb-6 text-foreground">
                {t('business.title')}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6 sm:mb-8 text-base sm:text-lg">
                {t('business.description')}
              </p>
              <Button
  variant="outline"
  size="lg"
  className="hover:bg-primary hover:text-primary-foreground transition-colors"
  onClick={() => window.open('https://mohanraoparulekar.topiwala-mes.org', '_blank')}
>
  {t('business.explore')}
</Button>
            </div>
          </div>

          {/* Malvan School of Arts and Sciences Section */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center bg-card rounded-2xl p-4 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 mb-12 sm:mb-24">
            <div className="lg:w-1/2">
              <img
                src={malvanArtsImg}
                alt="Arts and Sciences students at Malvan"
                className="w-full h-60 sm:h-80 object-cover rounded-xl shadow-md"
              />
            </div>
            <div className="lg:w-1/2 lg:pl-8 text-center lg:text-left">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
                <p className="text-sm text-primary font-semibold uppercase tracking-wide">
                  {t('arts.founded')}
                </p>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-4 sm:mb-6 text-foreground">
                {t('arts.title')}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6 sm:mb-8 text-base sm:text-lg">
                {t('arts.description')}
              </p>
              <Button
  variant="outline"
  size="lg"
  className="hover:bg-primary hover:text-primary-foreground transition-colors"
  onClick={() => window.open('https://smtghurye.topiwala-mes.org', '_blank')}
>
  {t('arts.explore')}
</Button>
            </div>
          </div>
        </div>

      </div>
      
      {/* Committee Members Section */}
      <CommitteeSection />

      {/* Inspirational Quote Section */}
      <div className="bg-harvard-dark pt-12 pb-0 relative mt-20 -mx-4 sm:-mx-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative">
          {/* Decorative Quote Marks - Top Left */}
          <div className="absolute top-4 left-4 sm:left-12 hidden sm:block">
            <svg width="160" height="100" viewBox="0 0 160 100" className="text-harvard-crimson">
              <path d="M25 15 C15 15 5 25 5 35 L5 55 C5 65 15 75 25 75 L30 75 L30 55 L20 55 C20 50 25 45 30 45 L40 45 C45 45 50 40 50 35 L50 25 C50 20 45 15 40 15 Z" 
                    fill="none" stroke="currentColor" strokeWidth="3"/>
              <path d="M90 15 C80 15 70 25 70 35 L70 55 C70 65 80 75 90 75 L95 75 L95 55 L85 55 C85 50 90 45 95 45 L105 45 C110 45 115 40 115 35 L115 25 C115 20 110 15 105 15 Z" 
                    fill="none" stroke="currentColor" strokeWidth="3"/>
            </svg>
          </div>
          
          <div className="max-w-2xl mx-auto pt-12 sm:pt-20 pb-16 sm:pb-24 px-4">
            <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif text-white leading-relaxed mb-4">
              "{t('quote.text')}"
            </blockquote>
            <div className="inline-flex items-center bg-harvard-crimson text-white px-3 py-1 rounded-full">
              <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-xs">{t('quote.author')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationalSections;