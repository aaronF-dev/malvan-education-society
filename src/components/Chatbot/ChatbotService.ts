import type { Language } from '@/contexts/LanguageContext';

interface NavigationAction {
  type: 'navigate' | 'scroll' | 'action';
  target?: string;
  section?: string;
  message?: string;
}

interface ChatResponse {
  message: string;
  action?: NavigationAction;
}

interface SiteContext {
  schools: Array<{
    name: string;
    founded: string;
    description: string;
    type: string;
  }>;
  general: {
    name: string;
    location: string;
    phone: string;
    email: string;
    motto: string;
  };
}

export class ChatbotService {
  private language: Language;
  private siteContext: SiteContext;
  private conversationContext: string[] = [];

  constructor(language: Language) {
    this.language = language;
    this.siteContext = this.getSiteContext();
  }

  private getSiteContext(): SiteContext {
    if (this.language === 'mr') {
      return {
        schools: [
          {
            name: 'मालवण महाविद्यालय',
            founded: '२०१० मध्ये स्थापना',
            description: 'मालवण महाविद्यालय हा समर्पित विद्यार्थी आणि शिक्षकांचा एक गतिशील, घट्ट पदवीपूर्व समुदाय आहे जो भूतकाळातून शिकण्यासाठी आणि भविष्याचे मार्गदर्शन करण्यासाठी एकत्र येतो.',
            type: 'undergraduate college'
          },
          {
            name: 'मालवण तंत्रज्ञान आणि उपयोजित विज्ञान शाळा',
            founded: '१९४७ मध्ये स्थापना',
            description: 'मालवण तंत्रज्ञान आणि उपयोजित विज्ञान शाळा (MSTAS) हा समर्पित समस्या सोडवणाऱ्यांचा एक घनिष्ठ समुदाय आहे, जो आपल्या काळातील सर्वात गंभीर समस्यांवर उपाय शोधण्यासाठी काम करत आहे.',
            type: 'engineering and technology'
          },
          {
            name: 'मालवण वैद्यकीय शाळा',
            founded: '१९५६ मध्ये स्थापना',
            description: 'मालवण वैद्यकीय शाळा सर्वोत्तम आणि तेजस्वी विद्यार्थी, शिक्षकांसह कर्मचारी आणि आरोग्य सेवा क्षेत्रात इतरांची सेवा करण्याच्या सामायिक ध्येयासह विविधतेने भरलेला समुदाय तयार करण्यासाठी आणि त्याचे पालनपोषण करण्यासाठी वचनबद्ध आहे.',
            type: 'medical school'
          },
          {
            name: 'मालवण व्यवसाय शाळा',
            founded: '१९६२ मध्ये स्थापना',
            description: 'मालवण व्यवसाय शाळा जगात फरक करणारे नेते तयार करते. आम्ही उद्याच्या आव्हानांसाठी नाविन्यपूर्ण व्यावसायिक उपाय विकसित करतो आणि उद्योजकीय विचारसरणी जोपासतो.',
            type: 'business school'
          },
          {
            name: 'मालवण कला आणि विज्ञान शाळा',
            founded: '१९४८ मध्ये स्थापना',
            description: 'मालवण शिक्षण संस्थेतील सर्वात मोठी आणि सर्वात वैविध्यपूर्ण शाळा, मानविकी, सामाजिक विज्ञान, नैसर्गिक विज्ञान आणि ललित कलांमध्ये कार्यक्रम देते जे गंभीर चिंतन आणि सर्जनशील अभिव्यक्ती वाढवते.',
            type: 'liberal arts'
          }
        ],
        general: {
          name: 'मालवण शिक्षण संस्था',
          location: 'मालवण, महाराष्ट्र',
          phone: '+९१ ९८७६५ ४३२१०',
          email: 'info@malvaneducation.org',
          motto: 'कायदा आणि न्याय'
        }
      };
    }
    
    return {
      schools: [
        {
          name: 'Malvan College',
          founded: 'Founded in 2010',
          description: 'Malvan College is a dynamic, close-knit undergraduate community of dedicated students and faculty who come together as a means to learn from the past and navigate the future.',
          type: 'undergraduate college'
        },
        {
          name: 'Malvan School of Technology and Applied Sciences',
          founded: 'Founded in 1947',
          description: 'The Malvan School of Technology and Applied Sciences (MSTAS) is an intimate community of dedicated problem solvers, who are working to address the most pressing issues of our time.',
          type: 'engineering and technology'
        },
        {
          name: 'Malvan School of Medicine',
          founded: 'Founded in 1956',
          description: 'The Malvan School of Medicine is committed to creating and nurturing a diverse community of the best and brightest students, faculty, and staff, with a shared mission to serve others in the field of healthcare.',
          type: 'medical school'
        },
        {
          name: 'Malvan Business School',
          founded: 'Founded in 1962',
          description: 'Malvan Business School prepares leaders who make a difference in the world. We develop innovative business solutions and cultivate entrepreneurial thinking for the challenges of tomorrow.',
          type: 'business school'
        },
        {
          name: 'Malvan School of Arts and Sciences',
          founded: 'Founded in 1948',
          description: 'The largest and most diverse school within Malvan Education Society, offering programs in humanities, social sciences, natural sciences, and fine arts that foster critical thinking and creative expression.',
          type: 'liberal arts'
        }
      ],
      general: {
        name: 'Malvan Education Society',
        location: 'Malvan, Maharashtra',
        phone: '+91 98765 43210',
        email: 'info@malvaneducation.org',
        motto: 'LEX ET IUSTITIA (Law and Justice)'
      }
    };
  }

  async processMessage(message: string): Promise<ChatResponse> {
    const normalizedMessage = message.toLowerCase().trim();
    
    // Add to conversation context for better understanding
    this.conversationContext.push(normalizedMessage);
    
    // Keep only last 5 messages for context
    if (this.conversationContext.length > 5) {
      this.conversationContext = this.conversationContext.slice(-5);
    }
    
    // Check for follow-up questions based on context
    const contextualResponse = this.processContextualQuery(normalizedMessage);
    if (contextualResponse) {
      return contextualResponse;
    }
    
    // Check for navigation intents first
    const navigationResponse = this.processNavigationQuery(normalizedMessage);
    if (navigationResponse) {
      return navigationResponse;
    }

    // Enhanced conversational processing
    const conversationalResponse = this.processConversationalQuery(normalizedMessage);
    if (conversationalResponse) {
      return conversationalResponse;
    }

    // Enhanced local processing with better pattern matching
    const localResponse = this.processLocalQuery(normalizedMessage);
    if (localResponse) {
      return { message: localResponse };
    }

    // Advanced local processing for more complex queries
    const advancedResponse = this.processAdvancedQuery(normalizedMessage);
    return { message: advancedResponse };
  }

  private processContextualQuery(message: string): ChatResponse | null {
    const recentContext = this.conversationContext.slice(-3).join(' ');
    
    // Handle follow-up questions
    if (recentContext.includes('school') || recentContext.includes('शाळा')) {
      if (message.includes('more') || message.includes('tell me') || message.includes('अधिक') || message.includes('सांगा')) {
        return this.getDetailedSchoolInfo();
      }
    }
    
    if (recentContext.includes('admission') || recentContext.includes('प्रवेश')) {
      if (message.includes('how') || message.includes('process') || message.includes('कसे') || message.includes('प्रक्रिया')) {
        return this.getDetailedAdmissionInfo();
      }
    }
    
    // Handle yes/no responses
    if (message.includes('yes') || message.includes('होय') || message.includes('हो')) {
      if (recentContext.includes('help') || recentContext.includes('more') || recentContext.includes('मदत')) {
        return {
          message: this.language === 'en' 
            ? "Great! What specific information would you like to know about? You can ask about:\n• Our schools and programs\n• Admission procedures\n• Fee structure\n• Faculty information\n• Campus facilities"
            : "उत्तम! तुम्हाला कोणती विशिष्ट माहिती जाणून घ्यायची आहे? तुम्ही याबद्दल विचारू शकता:\n• आमच्या शाळा आणि कार्यक्रम\n• प्रवेश प्रक्रिया\n• फी संरचना\n• शिक्षक माहिती\n• कॅम्पस सुविधा"
        };
      }
    }
    
    return null;
  }

  private processNavigationQuery(message: string): ChatResponse | null {
    const navigationPatterns = this.getNavigationPatterns();
    
    for (const pattern of navigationPatterns) {
      if (pattern.keywords.some(keyword => message.includes(keyword))) {
        return pattern.response();
      }
    }
    
    return null;
  }

  private processConversationalQuery(message: string): ChatResponse | null {
    const conversationalPatterns = this.getConversationalPatterns();
    
    for (const pattern of conversationalPatterns) {
      if (pattern.keywords.some(keyword => message.includes(keyword))) {
        return pattern.response();
      }
    }
    
    return null;
  }

  private processAdvancedQuery(message: string): string {
    // Enhanced NLP-like processing using pattern matching
    const patterns = this.getQueryPatterns();
    
    for (const pattern of patterns) {
      if (pattern.keywords.some(keyword => message.includes(keyword))) {
        return pattern.response();
      }
    }

    return this.getFallbackResponse();
  }

  private getNavigationPatterns(): Array<{keywords: string[], response: () => ChatResponse}> {
    if (this.language === 'mr') {
      return [
        {
          keywords: ['मुख्य पान', 'होम', 'घर', 'मुख्य'],
          response: () => ({
            message: 'मी तुम्हाला मुख्य पानावर नेत आहे.',
            action: { type: 'navigate', target: '/' }
          })
        },
        {
          keywords: ['शाळा दाखवा', 'शाळांकडे जा', 'शैक्षणिक विभाग'],
          response: () => ({
            message: 'मी तुम्हाला आमच्या शैक्षणिक विभागांकडे नेत आहे.',
            action: { type: 'scroll', section: 'educational-sections' }
          })
        },
        {
          keywords: ['संपर्क', 'संपर्क माहिती', 'फोन नंबर'],
          response: () => ({
            message: 'मी तुम्हाला संपर्क विभागाकडे नेत आहे.',
            action: { type: 'scroll', section: 'contact' }
          })
        },
        {
          keywords: ['बद्दल', 'आमच्याबद्दल', 'माहिती'],
          response: () => ({
            message: 'मी तुम्हाला आमच्याबद्दल विभागाकडे नेत आहे.',
            action: { type: 'scroll', section: 'about' }
          })
        }
      ];
    }

    return [
      {
        keywords: ['home', 'main page', 'homepage', 'go home'],
        response: () => ({
          message: 'I\'ll take you to the home page.',
          action: { type: 'navigate', target: '/' }
        })
      },
      {
        keywords: ['show schools', 'go to schools', 'educational sections', 'programs'],
        response: () => ({
          message: 'I\'ll take you to our educational sections.',
          action: { type: 'scroll', section: 'educational-sections' }
        })
      },
      {
        keywords: ['contact', 'contact info', 'phone number', 'email'],
        response: () => ({
          message: 'I\'ll take you to the contact section.',
          action: { type: 'scroll', section: 'contact' }
        })
      },
      {
        keywords: ['about', 'about us', 'information'],
        response: () => ({
          message: 'I\'ll take you to the about section.',
          action: { type: 'scroll', section: 'about' }
        })
      }
    ];
  }

  private getConversationalPatterns(): Array<{keywords: string[], response: () => ChatResponse}> {
    if (this.language === 'mr') {
      return [
        {
          keywords: ['हाय', 'हॅलो', 'नमस्कार', 'नमस्ते'],
          response: () => ({
            message: 'नमस्कार! मी तुम्हाला कशी मदत करू शकतो? तुम्ही मला आमच्या शाळांबद्दल, प्रवेशाबद्दल किंवा कोणत्याही इतर गोष्टींबद्दल विचारू शकता.'
          })
        },
        {
          keywords: ['धन्यवाद', 'आभार', 'छान'],
          response: () => ({
            message: 'तुमचे स्वागत आहे! मला मदत करून आनंद झाला. आणखी काही प्रश्न असल्यास कृपया विचारा.'
          })
        },
        {
          keywords: ['बाय', 'निरोप', 'जातो', 'जाते'],
          response: () => ({
            message: 'मालवण शिक्षण संस्थेसाठी वेळ दिल्याबद्दल धन्यवाद! शुभेच्छा!'
          })
        },
        {
          keywords: ['कसे आहात', 'कशी आहात', 'कसं चाललंय'],
          response: () => ({
            message: 'मी ठीक आहे, धन्यवाद! मी मालवण शिक्षण संस्थेतील माहिती देण्यासाठी येथे आहे. तुम्हाला काय जाणून घ्यायचे आहे?'
          })
        }
      ];
    }

    return [
      {
        keywords: ['hi', 'hello', 'hey', 'greetings'],
        response: () => ({
          message: 'Hello! How can I help you today? You can ask me about our schools, admissions, or anything else related to Malvan Education Society.'
        })
      },
      {
        keywords: ['thanks', 'thank you', 'great', 'awesome', 'perfect'],
        response: () => ({
          message: 'You\'re welcome! I\'m glad I could help. Feel free to ask if you have any more questions.'
        })
      },
      {
        keywords: ['bye', 'goodbye', 'see you', 'farewell'],
        response: () => ({
          message: 'Thank you for visiting Malvan Education Society! Have a great day!'
        })
      },
      {
        keywords: ['how are you', 'how do you do', 'what\'s up'],
        response: () => ({
          message: 'I\'m doing great, thank you! I\'m here to help with information about Malvan Education Society. What would you like to know?'
        })
      },
      {
        keywords: ['help', 'assist', 'support', 'guide'],
        response: () => ({
          message: 'I\'m here to help! I can provide information about our schools, programs, admissions, contact details, and more. What specific information are you looking for?'
        })
      }
    ];
  }

  private getQueryPatterns(): Array<{keywords: string[], response: () => string}> {
    if (this.language === 'mr') {
      return [
        {
          keywords: ['शुल्क', 'फी', 'खर्च', 'पैसा'],
          response: () => 'शुल्क संरचनेसाठी, कृपया प्रत्येक शाळेशी थेट संपर्क साधा. तुम्ही info@malvaneducation.org वर ईमेल करू शकता किंवा +९१ ९८७६५ ४३२१० वर कॉल करू शकता.'
        },
        {
          keywords: ['प्रवेश', 'अर्ज', 'नोंदणी'],
          response: () => 'प्रवेश प्रक्रियेसाठी:\n• ऑनलाइन अर्ज भरा\n• आवश्यक कागदपत्रे जमा करा\n• प्रवेश चाचणी (जर लागू असेल तो)\n• मुलाखत\nअधिक माहितीसाठी संबंधित शाळेशी संपर्क साधा.'
        },
        {
          keywords: ['शिष्यवृत्ती', 'आर्थिक', 'मदत'],
          response: () => 'आम्ही गुणवान विद्यार्थ्यांसाठी विविध शिष्यवृत्ती कार्यक्रम ऑफर करतो. शिष्यवृत्ती आणि आर्थिक सहाय्यासाठी, प्रवेश कार्यालयाशी संपर्क साधा.'
        },
        {
          keywords: ['वेळापत्रक', 'तास', 'वर्ग'],
          response: () => 'वर्गाचे वेळापत्रक प्रत्येक शाळा आणि कार्यक्रमानुसार बदलते. अचूक वेळापत्रकासाठी तुमच्या संबंधित शाळेशी संपर्क साधा.'
        }
      ];
    }

    return [
      {
        keywords: ['fees', 'cost', 'tuition', 'payment'],
        response: () => 'For fee structure information, please contact the specific school directly. You can email info@malvaneducation.org or call +91 98765 43210 for detailed information.'
      },
      {
        keywords: ['admission', 'apply', 'application', 'enrollment'],
        response: () => 'Admission process typically includes:\n• Online application submission\n• Required document submission\n• Entrance examination (if applicable)\n• Interview\nFor specific requirements, contact the respective school.'
      },
      {
        keywords: ['scholarship', 'financial', 'aid', 'assistance'],
        response: () => 'We offer various scholarship programs for meritorious students. For scholarship and financial aid information, please contact the admissions office.'
      },
      {
        keywords: ['schedule', 'timing', 'hours', 'classes'],
        response: () => 'Class schedules vary by school and program. For specific timing information, please contact your respective school directly.'
      },
      {
        keywords: ['faculty', 'professor', 'teacher', 'staff'],
        response: () => 'Our schools have highly qualified faculty members with extensive experience in their respective fields. Each school maintains detailed faculty profiles on their websites.'
      },
      {
        keywords: ['facilities', 'infrastructure', 'campus', 'library'],
        response: () => 'Our schools offer modern facilities including libraries, laboratories, sports facilities, and state-of-the-art classrooms. Each school has unique amenities tailored to their programs.'
      },
      {
        keywords: ['placement', 'job', 'career', 'employment'],
        response: () => 'Our schools have dedicated placement cells that work with students for career development and job placement. Success rates and placement statistics vary by program and school.'
      }
    ];
  }

  private processLocalQuery(message: string): string | null {
    const schoolKeywords = this.language === 'en' 
      ? ['school', 'college', 'program', 'admission', 'course'] 
      : ['शाळा', 'महाविद्यालय', 'कार्यक्रम', 'प्रवेश', 'अभ्यासक्रम'];
    
    const contactKeywords = this.language === 'en'
      ? ['contact', 'phone', 'email', 'address', 'location']
      : ['संपर्क', 'फोन', 'ईमेल', 'पत्ता', 'स्थान'];

    // Check for school-related queries
    if (schoolKeywords.some(keyword => message.includes(keyword))) {
      return this.getSchoolsOverview();
    }

    // Check for contact-related queries  
    if (contactKeywords.some(keyword => message.includes(keyword))) {
      return this.getContactInfo();
    }

    // Check for specific school mentions
    for (const school of this.siteContext.schools) {
      if (message.includes(school.name.toLowerCase()) || 
          (this.language === 'en' && message.includes('malvan')) ||
          (this.language === 'mr' && message.includes('मालवण'))) {
        return `${school.name} - ${school.founded}. ${school.description}`;
      }
    }

    return null;
  }

  private getSchoolsOverview(): string {
    const schoolsList = this.siteContext.schools.map(school => 
      `• ${school.name} (${school.founded})`
    ).join('\n');

    return this.language === 'en'
      ? `Malvan Education Society has 5 prestigious schools:\n\n${schoolsList}\n\nEach school is dedicated to excellence in education. Which school would you like to know more about?`
      : `मालवण शिक्षण संस्थेमध्ये ५ प्रतिष्ठित शाळा आहेत:\n\n${schoolsList}\n\nप्रत्येक शाळा शिक्षणातील उत्कृष्टतेसाठी समर्पित आहे. तुम्हाला कोणत्या शाळेबद्दल अधिक जाणून घ्यायचे आहे?`;
  }

  private getContactInfo(): string {
    const { general } = this.siteContext;
    
    return this.language === 'en'
      ? `Contact Information:\n📍 Location: ${general.location}\n📞 Phone: ${general.phone}\n📧 Email: ${general.email}\n\nFeel free to reach out for any inquiries about our programs or admissions!`
      : `संपर्क माहिती:\n📍 स्थान: ${general.location}\n📞 फोन: ${general.phone}\n📧 ईमेल: ${general.email}\n\nआमच्या कार्यक्रम किंवा प्रवेशाबद्दल कोणत्याही चौकशीसाठी संपर्क साधा!`;
  }

  private getSystemPrompt(): string {
    const contextInfo = JSON.stringify(this.siteContext);
    
    if (this.language === 'mr') {
      return `तुम्ही मालवण शिक्षण संस्थेच्या AI सहायक आहात. मराठीत उत्तर द्या. हे संदर्भ माहिती वापरा: ${contextInfo}. 
      विद्यार्थी आणि पालकांना शाळा, कार्यक्रम, प्रवेश आणि सामान्य चौकशीबद्दल मदत करा. 
      नेहमी मैत्रीपूर्ण, माहितीपूर्ण आणि मदतगार रहा. तुम्हाला माहिती नसल्यास, संपर्क माहिती द्या.`;
    }
    
    return `You are an AI assistant for Malvan Education Society. Use this context information: ${contextInfo}. 
    Help students and parents with information about schools, programs, admissions, and general inquiries. 
    Always be friendly, informative, and helpful. If you don't know something, provide contact information for further assistance.`;
  }

  private getDetailedSchoolInfo(): ChatResponse {
    return {
      message: this.language === 'en'
        ? "I'd be happy to provide more details about our schools! Here's what makes each special:\n\n🎓 **Malvan College**: Focus on liberal arts education with small class sizes\n🔬 **School of Technology**: Cutting-edge engineering programs with industry partnerships\n🏥 **Medical School**: World-class medical education with clinical training\n💼 **Business School**: Entrepreneurship-focused curriculum with real-world projects\n🎨 **Arts & Sciences**: Diverse programs fostering creativity and critical thinking\n\nWould you like specific information about any particular school?"
        : "मला आमच्या शाळांबद्दल अधिक तपशील देण्यात आनंद होईल! प्रत्येक शाळेची खासियत:\n\n🎓 **मालवण कॉलेज**: छोट्या वर्गासह उदारमतवादी कला शिक्षण\n🔬 **तंत्रज्ञान शाळा**: उद्योग भागीदारीसह अत्याधुनिक अभियांत्रिकी कार्यक्रम\n🏥 **वैद्यकीय शाळा**: क्लिनिकल प्रशिक्षणासह जागतिक दर्जाचे वैद्यकीय शिक्षण\n💼 **व्यवसाय शाळा**: वास्तविक जगातील प्रकल्पांसह उद्योजकता-केंद्रित अभ्यासक्रम\n🎨 **कला आणि विज्ञान**: सर्जनशीलता आणि गंभीर चिंतन वाढवणारे विविध कार्यक्रम\n\nतुम्हाला कोणत्याही विशिष्ट शाळेबद्दल विशिष्ट माहिती हवी आहे का?"
    };
  }

  private getDetailedAdmissionInfo(): ChatResponse {
    return {
      message: this.language === 'en'
        ? "Here's the detailed admission process:\n\n📝 **Step 1**: Online Application\n• Fill out the application form on our website\n• Upload required documents (transcripts, ID proof, etc.)\n\n📚 **Step 2**: Entrance Examination\n• School-specific entrance tests\n• Merit-based evaluation\n\n🗣️ **Step 3**: Interview Process\n• Personal interview with faculty\n• Assessment of goals and fit\n\n💰 **Step 4**: Fee Payment\n• Acceptance of offer\n• Fee payment and registration\n\n📅 **Important Dates**: Applications typically open in March, exams in May, and classes start in July.\n\nWould you like information about specific school requirements?"
        : "इथे तपशीलवार प्रवेश प्रक्रिया आहे:\n\n📝 **पायरी १**: ऑनलाइन अर्ज\n• आमच्या वेबसाइटवर अर्ज फॉर्म भरा\n• आवश्यक कागदपत्रे अपलोड करा (गुणपत्रिका, ओळखपत्र इ.)\n\n📚 **पायरी २**: प्रवेश परीक्षा\n• शाळा-विशिष्ट प्रवेश चाचण्या\n• गुणवत्ता-आधारित मूल्यमापन\n\n🗣️ **पायरी ३**: मुलाखत प्रक्रिया\n• शिक्षकांसोबत वैयक्तिक मुलाखत\n• उद्दिष्टे आणि योग्यतेचे मूल्यमापन\n\n💰 **पायरी ४**: फी भरणा\n• ऑफरची स्वीकृती\n• फी भरणा आणि नोंदणी\n\n📅 **महत्त्वाच्या तारखा**: अर्ज सामान्यतः मार्चमध्ये उघडतात, मे मध्ये परीक्षा, आणि जुलैमध्ये वर्ग सुरू होतात.\n\nतुम्हाला विशिष्ट शाळेच्या आवश्यकतांबद्दल माहिती हवी आहे का?"
    };
  }

  private getFallbackResponse(): string {
    return this.language === 'en'
      ? "I'm here to help with information about Malvan Education Society and our schools. You can ask me about our programs, admissions, or contact information. For detailed inquiries, please contact us at info@malvaneducation.org or call +91 98765 43210."
      : "मी मालवण शिक्षण संस्था आणि आमच्या शाळांबद्दल माहिती देण्यासाठी येथे आहे. तुम्ही मला आमच्या कार्यक्रम, प्रवेश किंवा संपर्क माहितीबद्दल विचारू शकता. तपशीलवार चौकशीसाठी, कृपया info@malvaneducation.org वर संपर्क करा किंवा +९१ ९८७६५ ४३२१० वर कॉल करा.";
  }
}