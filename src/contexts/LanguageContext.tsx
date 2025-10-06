import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'mr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('malvan-language') as Language;
    if (savedLanguage && ['en', 'mr'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('malvan-language', lang);
  };

  // Translation function - will be implemented with translations
  const t = (key: string): string => {
    // Import translations dynamically based on current language
    const translations = getTranslations(language);
    return translations[key] || key;
  };

  const value = {
    language,
    setLanguage: handleSetLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Translations object
const translations = {
  en: {
    // Header
    'nav.about': 'About',
    
    // Hero Section
    'hero.malvan': 'MALVAN',
    'hero.education_society': 'EDUCATION SOCIETY',
    'hero.latin_motto': 'LEX ET IUSTITIA',
    
    // Educational Sections
    'schools.title': 'Schools Under MES',
    'schools.subtitle': 'Discover our prestigious institutions, each dedicated to excellence in education and fostering the next generation of leaders.',
    
    // Topiwala School
    'college.founded': 'Founded in 1911',
    'college.title': 'A.S.D. Topiwala High School',
    'college.description': 'Topiwala School is a dynamic, close-knit community of dedicated students and faculty who come together as a means to learn from the past and navigate the future.',
    'college.explore': 'Explore Topiwala School →' ,
    
    // Topiwala Junior College
    'tech.founded': 'Founded in 1947',
    'tech.title': ' N.A.D. Topiwala Junior College',
    'tech.description': 'Topiwala Junior College is an intimate community of dedicated learners, who are working to address the most pressing issues of our time through education and innovation.',
    'tech.explore': 'Explore Topiwala Junior College →',
    
    // Jai Ganesh School
    'medical.founded': 'Founded in 2003',
    'medical.title': 'Jay Ganesh English Medium School',
    'medical.description': 'Jay Ganesh English Medium School is committed to creating and nurturing a diverse community of the best and brightest students, faculty, and staff, with a shared mission to serve others through quality education.',
    'medical.explore': 'Explore Jay Ganesh English Medium School →',
    
    // Parulekar Primary School
    'business.founded': 'Founded in 1962',
    'business.title': 'Mohanrao Parulekar Primary School',
    'business.description': 'Mohanrao Parulekar Primary School prepares young learners who make a difference in the world. We develop innovative educational approaches and cultivate creative thinking for the challenges of tomorrow.',
    'business.explore': 'Explore Mohanrao Parulekar Primary School →',
    
    // Ghuruye School
    'arts.founded': 'Founded in 1948',
    'arts.title': 'SMT. Sitabai Shripad Ghurye Pre-Primary School',
    'arts.description': 'Ghuruye School is a comprehensive educational institution offering programs in humanities, sciences, and arts that foster critical thinking and creative expression in students.',
    'arts.explore': 'Explore Ghuruye School →',
    
    // Committee Section
    'committee.title': 'Committee Members',
    'committee.subtitle': 'Meet our dedicated committee members who guide our educational mission.',
    'committee.member1.name': 'Mr. Vijay Kamat',
    'committee.member1.position': 'Chairman',
    'committee.member2.name': 'Mr. Digambar Samant',
    'committee.member2.position': 'Vice Chairperson',
    'committee.member3.name': 'Mr. Rajiv Kubal',
    'committee.member3.position': 'Member Of MES',
    'committee.member4.name': 'Mr. Laxman Valanju',
    'committee.member4.position': 'Member Of MES',
    'committee.member5.name': 'Mrs. Shweta Pednekar',
    'committee.member5.position': 'Member Of MES',
    'committee.member6.name': 'Mrs. Veena Gosawi',
    'committee.member6.position': 'Member Of MES',
    'committee.member7.name': 'Mrs. Tejal Vengurlekar',
    'committee.member7.position': 'Member Of MES',

    // Quote Section
    'quote.text': 'Education is the most powerful weapon which you can use to change the world.',
    'quote.author': 'Nelson Mandela',
    
    // About Section
    'about.title': '',
    'about.description': 'Those who join our community to learn, research, teach, work, and grow join nearly four centuries of students and scholars in the pursuit of truth, knowledge, and a better world.',
    
    // Footer
    'footer.title': 'Malvan Education Society',
    'footer.description': 'Dedicated to providing quality education and fostering academic excellence in our community for a better tomorrow.',
    'footer.quick_links': 'Quick Links',
    'footer.home': 'Home',
    'footer.about_us': 'About Us',
    'footer.programs': 'Programs',
    'footer.admissions': 'Admissions',
    'footer.contact': 'Contact',
    'footer.location': 'Malvan, Sindhudurg, Maharashtra',
    'footer.phone': 'Phone: 02365 252058',
    'footer.email': 'Email: smesm@rediffmail.com ',
    'footer.copyright': '© 2025 Malvan Education Society. All rights reserved. Developed by Team Knowvate.',
    
    // Search
    'search.placeholder': 'Search...',
  },
  mr: {
    // Header
    'nav.about': 'आमच्याबद्दल',
    
    // Hero Section
    'hero.malvan': 'मालवण',
    'hero.education_society': 'शिक्षण संस्था',
    'hero.latin_motto': 'कायदा आणि न्याय',
    
    // Educational Sections
    'schools.title': 'MES अंतर्गत शाळा',
    'schools.subtitle': 'आमच्या प्रतिष्ठित संस्थांचा शोध घ्या, प्रत्येक शिक्षणातील उत्कृष्टतेसाठी आणि पुढील पिढीच्या नेत्यांचे पालनपोषण करण्यासाठी समर्पित आहे.',
    
    // Topiwala School
    'college.founded': '१९११ मध्ये स्थापना',
    'college.title': 'तोपीवाला शाळा',
    'college.description': 'तोपीवाला शाळा हा समर्पित विद्यार्थी आणि शिक्षकांचा एक गतिशील, घट्ट समुदाय आहे जो भूतकाळातून शिकण्यासाठी आणि भविष्याचे मार्गदर्शन करण्यासाठी एकत्र येतो.',
    'college.explore': 'तोपीवाला शाळा एक्सप्लोर करा →',
    
    // Topiwala Junior College
    'tech.founded': '१९४७ मध्ये स्थापना',
    'tech.title': 'तोपीवाला ज्युनियर कॉलेज',
    'tech.description': 'तोपीवाला ज्युनियर कॉलेज हा समर्पित शिकणाऱ्यांचा एक घनिष्ठ समुदाय आहे, जो शिक्षण आणि नाविन्यताद्वारे आपल्या काळातील सर्वात गंभीर समस्यांवर उपाय शोधण्यासाठी काम करत आहे.',
    'tech.explore': 'तोपीवाला ज्युनियर कॉलेज एक्सप्लोर करा →',
    
    // Jai Ganesh School
    'medical.founded': '२००३ मध्ये स्थापना',
    'medical.title': 'जय गणेश शाळा',
    'medical.description': 'जय गणेश शाळा सर्वोत्तम आणि तेजस्वी विद्यार्थी, शिक्षकांसह कर्मचारी आणि दर्जेदार शिक्षणाद्वारे इतरांची सेवा करण्याच्या सामायिक ध्येयासह विविधतेने भरलेला समुदाय तयार करण्यासाठी आणि त्याचे पालनपोषण करण्यासाठी वचनबद्ध आहे.',
    'medical.explore': 'जय गणेश शाळा एक्सप्लोर करा →',
    
    // Parulekar Primary School
    'business.founded': '१९६२ मध्ये स्थापना',
    'business.title': 'मोहनराव परुळेकर प्राथमिक शाळा',
    'business.description': 'पारुळेकर प्राथमिक शाळा जगात फरक करणारे तरुण शिकणारे तयार करते. आम्ही उद्याच्या आव्हानांसाठी नाविन्यपूर्ण शैक्षणिक पद्धती विकसित करतो आणि सर्जनशील विचारसरणी जोपासतो.',
    'business.explore': 'पारुळेकर प्राथमिक शाळा एक्सप्लोर करा →',
    
    // Ghuruye School
    'arts.founded': '१९४८ मध्ये स्थापना',
    'arts.title': 'घुरये शाळा',
    'arts.description': 'घुरये शाळा ही एक व्यापक शैक्षणिक संस्था आहे जी मानविकी, विज्ञान आणि कलांमध्ये कार्यक्रम देते जे विद्यार्थ्यांमध्ये गंभीर चिंतन आणि सर्जनशील अभिव्यक्ती वाढवते.',
    'arts.explore': 'घुरये शाळा एक्सप्लोर करा →',
    
    // Committee Section
    'committee.title': 'समिती सदस्य',
    'committee.subtitle': 'आमच्या शैक्षणिक ध्येयाचे मार्गदर्शन करणारे आमचे समर्पित समिती सदस्य भेटा.',
    'committee.member1.name': 'डॉ. राजेश शर्मा',
    'committee.member1.position': 'अध्यक्ष',
    'committee.member2.name': 'प्रा. सुनिता पाटील',
    'committee.member2.position': 'उपाध्यक्ष',
    'committee.member3.name': 'डॉ. अशोक कुमार',
    'committee.member3.position': 'सचिव',
    'committee.member4.name': 'श्रीमती प्रिया देसाई',
    'committee.member4.position': 'खजिनदार',
    'committee.member5.name': 'प्रा. मोहन कुलकर्णी',
    'committee.member5.position': 'शैक्षणिक सल्लागार',

    // Quote Section
    'quote.text': 'शिक्षण हे सर्वात शक्तिशाली शस्त्र आहे जे तुम्ही जग बदलण्यासाठी वापरू शकता.',
    'quote.author': 'नेल्सन मंडेला',
    
    // About Section
    'about.title': 'MES बद्दल',
    'about.description': 'जे आमच्या समुदायात सामील होतात—शिकण्यासाठी, संशोधन करण्यासाठी, शिकवण्यासाठी, काम करण्यासाठी आणि वाढण्यासाठी—ते सत्य, ज्ञान आणि एका चांगल्या जगाच्या शोधात जवळजवळ चार शतकांच्या विद्यार्थी आणि विद्वानांमध्ये सामील होतात.',
    
    // Footer
    'footer.title': 'मालवण शिक्षण संस्था',
    'footer.description': 'उद्याच्या चांगल्या भविष्यासाठी आमच्या समुदायामध्ये दर्जेदार शिक्षण प्रदान करण्यासाठी आणि शैक्षणिक उत्कृष्टता वाढवण्यासाठी समर्पित.',
    'footer.quick_links': 'त्वरित दुवे',
    'footer.home': 'मुख्यपृष्ठ',
    'footer.about_us': 'आमच्याबद्दल',
    'footer.programs': 'कार्यक्रम',
    'footer.admissions': 'प्रवेश',
    'footer.contact': 'संपर्क',
    'footer.location': 'मालवण, महाराष्ट्र',
    'footer.phone': 'फोन: +९१ ९८७६५ ४३२१०',
    'footer.email': 'ईमेल: smesm@rediffmail.com=',
    'footer.copyright': '© २०२४ मालवण शिक्षण संस्था. सर्व हक्क राखीव.',
    
    // Search
    'search.placeholder': 'शोधा...',
  },
};

const getTranslations = (language: Language) => {
  return translations[language] || translations.en;
};