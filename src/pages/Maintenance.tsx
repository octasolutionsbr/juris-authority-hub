import { Wrench, Clock } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";
import octaLogo from "@/assets/octa-logo-new.png";

interface MaintenanceProps {
  message?: string;
}

const Maintenance = ({ message }: MaintenanceProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-primary-dark flex flex-col items-center justify-center p-6 relative">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <img src={logoWhite} alt="Juris Company" className="h-16 md:h-20 object-contain" />
        </div>

        {/* Icon Animation */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-white/10 rounded-full animate-pulse" />
          </div>
          <div className="relative flex items-center justify-center">
            <Wrench className="w-16 h-16 text-white animate-bounce" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Em Manutenção</h1>
          <p className="text-white/80 text-lg">
            {message || "Estamos trabalhando para melhorar nossos serviços. Voltaremos em breve!"}
          </p>
        </div>

        {/* Status */}
        <div className="flex items-center justify-center gap-2 text-white/60">
          <Clock className="w-5 h-5" />
          <span>Voltaremos o mais rápido possível</span>
        </div>

        {/* Contact Info */}
        <div className="pt-8 border-t border-white/20">
          <p className="text-white/60 text-sm">Em caso de urgência, entre em contato:</p>
          <a href="tel:+5596932231499" className="text-white font-medium hover:underline">
            +55 96 93223-1499
          </a>
        </div>
      </div>

      {/* Desenvolvido por - Sutil no rodapé */}
      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2">
        <span className="text-white/40 text-xs">Desenvolvido por</span>
        <a
          href="https://www.octasolutions.com.br"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block hover:opacity-80 transition-opacity"
        >
          <img src={octaLogo} alt="Octa Solutions" className="h-4 opacity-60 hover:opacity-100 transition-opacity" />
        </a>
      </div>
    </div>
  );
};

export default Maintenance;
