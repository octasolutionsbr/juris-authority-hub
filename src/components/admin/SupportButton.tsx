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
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-md px-3 py-2 hover:shadow-lg hover:bg-white transition-all duration-200 group"
    >
      <img 
        src={octaSupportIcon} 
        alt="Suporte Octa" 
        className="h-7 w-7 rounded-full"
      />
      <div className="flex flex-col leading-tight">
        <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900">Precisa de ajuda?</span>
        <span className="text-[10px] text-gray-500">fale com o desenvolvedor</span>
      </div>
    </a>
  );
};
