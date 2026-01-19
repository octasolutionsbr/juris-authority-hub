import octaSupportIcon from "@/assets/octa-support-icon.png";

export const SupportButton = () => {
  const phoneNumber = "5511974666680";
  const message = encodeURIComponent(
    "Olá, preciso de ajuda com o painel administrativo da Juris Company."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a 
      href={whatsappUrl} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-slate-800 rounded-full shadow-lg px-3 py-2 hover:bg-slate-700 hover:shadow-xl transition-all duration-200 group"
    >
      <img 
        src={octaSupportIcon} 
        alt="Suporte Octa" 
        className="h-8 w-8 object-contain flex-shrink-0"
      />
      <div className="flex flex-col leading-tight pr-1">
        <span className="text-xs font-medium text-white">Precisa de ajuda?</span>
        <span className="text-[10px] text-slate-300">fale com o desenvolvedor</span>
      </div>
    </a>
  );
};
