import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    
    try {
      // Simple NLP-based search functionality
      const queryLower = query.toLowerCase();
      let response = "";

      if (queryLower.includes("mission") || queryLower.includes("purpose")) {
        response = "Our mission is to empower students with knowledge, skills, and values that prepare them for success in an ever-changing world.";
      } else if (queryLower.includes("vision") || queryLower.includes("goal")) {
        response = "Our vision is to be a leading educational institution that nurtures creativity, critical thinking, and character development.";
      } else if (queryLower.includes("program") || queryLower.includes("course") || queryLower.includes("education")) {
        response = "We offer various educational programs, courses, and resources for students of all ages.";
      } else if (queryLower.includes("about") || queryLower.includes("what") || queryLower.includes("who")) {
        response = "Malvan Education Society is dedicated to providing quality education and fostering academic excellence in our community.";
      } else {
        response = "I found information about Malvan Education Society. We focus on quality education, academic excellence, and empowering students with knowledge and skills.";
      }

      toast({
        title: "Search Results",
        description: response,
        duration: 5000,
      });
      setQuery("");
      setIsExpanded(false);
    } catch (error) {
      toast({
        title: "Search Error",
        description: "Unable to process your search at the moment.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="hidden lg:flex items-center overflow-hidden">
      {!isExpanded ? (
        <Button
          onClick={() => setIsExpanded(true)}
          variant="ghost"
          size="sm"
          className="text-hero-text hover:text-hero-text/80 hover:bg-white/10 transition-all duration-300"
        >
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      ) : (
        <form onSubmit={handleSearch} className="flex items-center gap-2 animate-in slide-in-from-right-2 duration-300">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hero-text/70 w-4 h-4" />
            <Input
              autoFocus
              type="text"
              placeholder={t('search.placeholder')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-60 sm:w-80 pl-10 pr-4 py-2 bg-white/10 backdrop-blur-md border-white/30 text-hero-text placeholder:text-hero-text/60 rounded-full focus:bg-white/15 focus:border-white/50 transition-all duration-300"
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            size="sm"
            disabled={isLoading || !query.trim()}
            className="bg-white/20 hover:bg-white/30 text-hero-text border-white/30 rounded-full px-4 backdrop-blur-md transition-all duration-300"
            variant="outline"
          >
            {isLoading ? "..." : "Go"}
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() => {
              setIsExpanded(false);
              setQuery("");
            }}
            variant="ghost"
            className="text-hero-text hover:text-hero-text/80 hover:bg-white/10 rounded-full p-2"
          >
            <X className="w-4 h-4" />
          </Button>
        </form>
      )}
    </div>
  );
};

export default SearchBar;