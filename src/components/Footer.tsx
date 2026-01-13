import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";
import octaLogo from "@/assets/octa-logo.png";
import logoWhite from "@/assets/logo-white.png";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[hsl(0,0%,12%)] text-white pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <img src={logoWhite} alt="Juris Company" className="h-10 mb-4" />
            <p className="text-white/70 text-sm leading-relaxed">{t("footer.description")}</p>
            {/* Social Media Icons */}
            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://instagram.com/juris.company"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-primary-light transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com/juris.company"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-primary-light transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-lg">{t("footer.navigation")}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/areas" className="text-white/70 hover:text-primary-light transition-colors text-sm">
                  {t("header.areas")}
                </Link>
              </li>
              <li>
                <Link to="/equipe" className="text-white/70 hover:text-primary-light transition-colors text-sm">
                  {t("header.team")}
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-white/70 hover:text-primary-light transition-colors text-sm">
                  {t("header.about")}
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-white/70 hover:text-primary-light transition-colors text-sm">
                  {t("header.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-lg">{t("footer.highlightedAreas")}</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/areas/direito-empresarial"
                  className="text-white/70 hover:text-primary-light transition-colors text-sm"
                >
                  {t("footer.areas.corporate")}
                </Link>
              </li>
              <li>
                <Link
                  to="/areas/direito-tributario"
                  className="text-white/70 hover:text-primary-light transition-colors text-sm"
                >
                  {t("footer.areas.tax")}
                </Link>
              </li>
              <li>
                <Link
                  to="/areas/direito-imobiliario"
                  className="text-white/70 hover:text-primary-light transition-colors text-sm"
                >
                  {t("footer.areas.realEstate")}
                </Link>
              </li>
              <li>
                <Link
                  to="/areas/direito-trabalhista"
                  className="text-white/70 hover:text-primary-light transition-colors text-sm"
                >
                  {t("footer.areas.labor")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold mb-4 text-lg">{t("footer.contact")}</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail size={18} className="text-primary-light mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:contato@juriscompany.net"
                  className="text-white/70 hover:text-primary-light transition-colors text-sm"
                >
                  contato@juriscompany.net
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={18} className="text-primary-light mt-0.5 flex-shrink-0" />
                <a
                  href="tel:+559632231499"
                  className="text-white/70 hover:text-primary-light transition-colors text-sm"
                >
                  +55 (96) 93223-1499
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-primary-light mt-0.5 flex-shrink-0" />
                <span className="text-white/70 text-sm">R. Prof. Tostes, 783 - Centro, Macapá - AP</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm text-center md:text-left">
              © {currentYear} Juris Company. {t("footer.rights")}
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
              <div className="flex items-center gap-4 sm:gap-6">
                <Link to="/privacidade" className="text-white/60 hover:text-primary-light transition-colors text-sm">
                  {t("footer.privacy")}
                </Link>
                <Link to="/termos" className="text-white/60 hover:text-primary-light transition-colors text-sm">
                  {t("footer.terms")}
                </Link>
              </div>
              <div className="flex items-center">
                <span className="text-white/60 text-sm mr-2">{t("footer.developedBy")}</span>
                <a
                  href="https://www.octasolutions.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block hover:opacity-80 transition-opacity"
                >
                  <img src={octaLogo} alt="Octa Solutions" className="h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
