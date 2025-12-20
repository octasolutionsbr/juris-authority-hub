import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  isScrolled?: boolean;
  isHomePage?: boolean;
}

const LanguageSwitcher = ({ isScrolled = true, isHomePage = false }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();

  const changeToPortuguese = () => {
    if (i18n.language !== 'pt') {
      i18n.changeLanguage('pt');
    }
  };

  const changeToEnglish = () => {
    if (i18n.language !== 'en') {
      i18n.changeLanguage('en');
    }
  };

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={changeToPortuguese}
        className={cn(
          "w-7 h-5 rounded overflow-hidden transition-all focus:outline-none",
          i18n.language === 'pt' 
            ? "ring-2 ring-primary ring-offset-1" 
            : "opacity-60 hover:opacity-100"
        )}
        aria-label="Português"
        title="Português"
      >
        <svg viewBox="0 0 36 24" className="w-full h-full">
          <rect fill="#009B3A" width="36" height="24"/>
          <polygon fill="#FEDF00" points="18,2 34,12 18,22 2,12"/>
          <circle fill="#002776" cx="18" cy="12" r="6"/>
          <path d="M11,12 Q18,8 25,12" stroke="#FFFFFF" strokeWidth="0.5" fill="none"/>
        </svg>
      </button>
      <button
        onClick={changeToEnglish}
        className={cn(
          "w-7 h-5 rounded overflow-hidden transition-all focus:outline-none",
          i18n.language === 'en' 
            ? "ring-2 ring-primary ring-offset-1" 
            : "opacity-60 hover:opacity-100"
        )}
        aria-label="English"
        title="English"
      >
        <svg viewBox="0 0 60 30" className="w-full h-full">
          <clipPath id="uk">
            <rect width="60" height="30"/>
          </clipPath>
          <g clipPath="url(#uk)">
            <rect fill="#012169" width="60" height="30"/>
            <path fill="#FFFFFF" d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" strokeWidth="6"/>
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="2"/>
            <path fill="#FFFFFF" d="M30,0 V30 M0,15 H60" stroke="#FFFFFF" strokeWidth="10"/>
            <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6"/>
          </g>
        </svg>
      </button>
    </div>
  );
};

export default LanguageSwitcher;
