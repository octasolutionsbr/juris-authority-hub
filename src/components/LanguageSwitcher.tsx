import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  isScrolled?: boolean;
  isHomePage?: boolean;
}

const LanguageSwitcher = ({ isScrolled = true, isHomePage = false }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "transition-colors",
            (isScrolled || !isHomePage) ? "text-foreground hover:text-primary" : "text-background hover:text-primary"
          )}
        >
          <Languages className="h-5 w-5" />
          <span className="ml-2 uppercase text-xs font-semibold">
            {i18n.language === 'pt' ? 'PT' : 'EN'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background border-border z-50">
        <DropdownMenuItem
          onClick={() => changeLanguage('pt')}
          className={cn(
            "cursor-pointer",
            i18n.language === 'pt' && "bg-secondary"
          )}
        >
          🇧🇷 Português
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeLanguage('en')}
          className={cn(
            "cursor-pointer",
            i18n.language === 'en' && "bg-secondary"
          )}
        >
          🇺🇸 English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
