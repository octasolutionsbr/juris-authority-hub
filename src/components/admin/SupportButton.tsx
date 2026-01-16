import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SupportButton = () => {
  const phoneNumber = "5511974666680";
  const message = encodeURIComponent(
    "Olá, preciso de ajuda com o painel administrativo da Juris Company."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <Button
      asChild
      className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg bg-green-600 hover:bg-green-700 text-white px-4 py-3 h-auto"
    >
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
        <HelpCircle className="h-5 w-5" />
        <span>Precisa de ajuda?</span>
      </a>
    </Button>
  );
};
