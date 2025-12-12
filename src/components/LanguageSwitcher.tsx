import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  isScrolled?: boolean;
  isHomePage?: boolean;
}

const LanguageSwitcher = ({ isScrolled = true, isHomePage = false }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'pt' ? 'en' : 'pt';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        "flex items-center gap-2 px-2 py-1 transition-colors focus:outline-none",
        (isScrolled || !isHomePage) ? "text-foreground" : "text-background",
        "hover:text-primary"
      )}
    >
      <Languages className="h-5 w-5" />
      <span className="uppercase text-xs font-semibold flex items-center gap-1">
        {i18n.language === 'pt' ? '🇧🇷 PT' : '🇺🇸 EN'}
      </span>
    </button>
  );
};

export default LanguageSwitcher;
