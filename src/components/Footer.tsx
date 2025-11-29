import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import octaLogo from "@/assets/octa-logo.png";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-heading font-bold mb-4">
              Juris <span className="text-primary-light">Company</span>
            </h3>
            <p className="text-background/70 text-sm leading-relaxed">
              {t("footer.description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-lg">
              {t("footer.navigation")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/areas"
                  className="text-background/70 hover:text-primary-light transition-colors text-sm"
                >
                  {t("header.areas")}
                </Link>
              </li>
              <li>
                <Link
                  to="/equipe"
                  className="text-background/70 hover:text-primary-light transition-colors text-sm"
                >
                  {t("header.team")}
                </Link>
              </li>
              <li>
                <Link
                  to="/sobre"
                  className="text-background/70 hover:text-primary-light transition-colors text-sm"
                >
                  {t("header.about")}
                </Link>
              </li>
              <li>
                <Link
                  to="/contato"
                  className="text-background/70 hover:text-primary-light transition-colors text-sm"
                >
                  {t("header.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-lg">
              {t("footer.highlightedAreas")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/areas/direito-empresarial"
                  className="text-background/70 hover:text-primary-light transition-colors text-sm"
                >
                  Direito Empresarial
                </Link>
              </li>
              <li>
                <Link
                  to="/areas/direito-tributario"
                  className="text-background/70 hover:text-primary-light transition-colors text-sm"
                >
                  Direito Tributário
                </Link>
              </li>
              <li>
                <Link
                  to="/areas/direito-imobiliario"
                  className="text-background/70 hover:text-primary-light transition-colors text-sm"
                >
                  Direito Imobiliário
                </Link>
              </li>
              <li>
                <Link
                  to="/areas/direito-trabalhista"
                  className="text-background/70 hover:text-primary-light transition-colors text-sm"
                >
                  Direito Trabalhista
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-lg">
              {t("footer.contact")}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail size={18} className="text-primary-light mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:contato@juriscompany.com.br"
                  className="text-background/70 hover:text-primary-light transition-colors text-sm"
                >
                  contato@juriscompany.com.br
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={18} className="text-primary-light mt-0.5 flex-shrink-0" />
                <a
                  href="tel:+5511999999999"
                  className="text-background/70 hover:text-primary-light transition-colors text-sm"
                >
                  +55 (11) 99999-9999
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-primary-light mt-0.5 flex-shrink-0" />
                <span className="text-background/70 text-sm">
                  Av. Paulista, 1000 - São Paulo, SP
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-background/60 text-sm">
              © {currentYear} Juris Company. {t("footer.rights")}
            </p>
            <div className="flex space-x-6">
              <Link
                to="/privacidade"
                className="text-background/60 hover:text-primary-light transition-colors text-sm"
              >
                {t("footer.privacy")}
              </Link>
              <Link
                to="/termos"
                className="text-background/60 hover:text-primary-light transition-colors text-sm"
              >
                {t("footer.terms")}
              </Link>
            </div>
          </div>
          
          {/* Desenvolvido por */}
          <div className="mt-6 pt-6 border-t border-background/20 flex justify-center items-center">
            <span className="text-background/60 text-sm mr-3">{t("footer.developedBy")}</span>
            <a 
              href="https://www.octasolutions.com.br" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block hover:opacity-80 transition-opacity"
            >
              <img src={octaLogo} alt="Octa Solutions" className="h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
