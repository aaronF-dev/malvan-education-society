import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChatbotService } from './ChatbotService';
import { useToast } from '@/components/ui/use-toast';

interface NavigationAction {
  type: 'navigate' | 'scroll' | 'action';
  target?: string;
  section?: string;
  message?: string;
}

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  action?: NavigationAction;
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { language, t } = useLanguage();
  const { toast } = useToast();

  const chatbotService = new ChatbotService(language);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Initialize with welcome message when chatbot opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        content: language === 'en' 
          ? "Hello! I'm your Malvan Education Society assistant. I can help you with information about our schools, programs, admissions, and more. How can I help you today?"
          : "नमस्कार! मी तुमचा मालवण शिक्षण संस्थेचा सहायक आहे. मी आमच्या शाळा, कार्यक्रम, प्रवेश आणि बरेच काही याबद्दल माहिती देण्यात मदत करू शकतो. आज मी तुम्हाला कशी मदत करू शकतो?",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, language]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const botResponse = await chatbotService.processMessage(inputValue);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse.message,
        isBot: true,
        timestamp: new Date(),
        action: botResponse.action,
      };

      setMessages(prev => [...prev, botMessage]);
      
      // Handle navigation actions
      if (botResponse.action) {
        handleNavigationAction(botResponse.action);
      }
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: language === 'en' 
          ? "I apologize, but I'm having trouble processing your request right now. Please try again later."
          : "मला माफ करा, परंतु मला सध्या तुमच्या विनंतीवर प्रक्रिया करण्यात अडचण येत आहे. कृपया नंतर पुन्हा प्रयत्न करा.",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: language === 'en' ? "Error" : "त्रुटी",
        description: language === 'en' ? "Failed to get response from chatbot" : "चॅटबॉटकडून प्रतिसाद मिळण्यात अयशस्वी",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigationAction = (action: NavigationAction) => {
    setTimeout(() => {
      if (action.type === 'navigate' && action.target) {
        window.location.href = action.target;
      } else if (action.type === 'scroll' && action.section) {
        const element = document.getElementById(action.section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          // Fallback: try to find by class name or other selector
          const fallbackElement = document.querySelector(`[data-section="${action.section}"]`) ||
                                  document.querySelector(`.${action.section}`);
          if (fallbackElement) {
            fallbackElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    }, 1000); // Small delay to let user read the message
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg transition-all duration-300 hover:scale-105 z-50"
        size="icon"
      >
        <Bot className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 border-2 border-primary/20 bg-background">
      <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          <h3 className="font-semibold">
            {language === 'en' ? 'MES Assistant' : 'MES सहायक'}
          </h3>
        </div>
        <Button
          onClick={() => setIsOpen(false)}
          variant="ghost"
          size="sm"
          className="text-primary-foreground hover:bg-primary-foreground/20"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <CardContent className="p-0 flex flex-col h-[calc(500px-73px)]">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                {message.isBot && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[280px] p-3 rounded-lg text-sm ${
                    message.isBot
                      ? 'bg-muted text-muted-foreground border border-border'
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  {message.action && (
                    <div className="mt-2 text-xs opacity-75">
                      {message.action.type === 'navigate' && (
                        <span>🔗 {language === 'en' ? 'Redirecting...' : 'पुनर्निर्देशित करत आहे...'}</span>
                      )}
                      {message.action.type === 'scroll' && (
                        <span>📍 {language === 'en' ? 'Scrolling to section...' : 'विभागाकडे जात आहे...'}</span>
                      )}
                    </div>
                  )}
                </div>
                {!message.isBot && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 justify-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="h-4 w-4 text-primary animate-pulse" />
                </div>
                <div className="bg-muted text-muted-foreground p-3 rounded-lg text-sm border border-border">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-pulse delay-150"></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-pulse delay-300"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t bg-background">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                language === 'en' 
                  ? 'Type your message...' 
                  : 'तुमचा संदेश टाइप करा...'
              }
              disabled={isLoading}
              className="flex-1 bg-background border-border"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              size="icon"
              className="bg-primary hover:bg-primary/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};