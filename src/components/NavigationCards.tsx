import { Calendar, BookOpen, FileText, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const navigationItems = [
  {
    icon: Calendar,
    title: "Bookmark this: Academic Calendar",
    description: "Important dates and deadlines",
  },
  {
    icon: BookOpen,
    title: "HLS from A to Z",
    description: "Complete guide to Harvard Law School",
  },
  {
    icon: FileText,
    title: "2025-2026 Course and Schedule Updates",
    description: "Latest curriculum changes and updates",
  },
  {
    icon: Users,
    title: "Thurs., Sept. 4: OPIA's Public Service Kick-Off and Gathering",
    description: "Join the public service community",
  },
];

const NavigationCards = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-4 sm:pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {navigationItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Card
                key={index}
                className="bg-card/95 backdrop-blur-sm hover:bg-card-hover transition-all duration-300 cursor-pointer group border-border/20"
              >
                <CardContent className="p-3 sm:p-4 flex items-start gap-2 sm:gap-3">
                  <div className="bg-harvard-dark/10 p-1.5 sm:p-2 rounded-lg group-hover:bg-harvard-dark/20 transition-colors">
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-harvard-dark" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-xs sm:text-sm text-card-foreground leading-tight mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NavigationCards;