import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const SupportButton = () => {
  const phoneNumber = "5511974666680";
  const message = encodeURIComponent(
    "Olá, preciso de ajuda com o painel administrativo da Juris Company."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          asChild
          size="icon"
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg bg-green-600 hover:bg-green-700 text-white"
        >
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-6 w-6" />
            <span className="sr-only">Suporte Técnico</span>
          </a>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left">
        <p>Suporte Técnico</p>
      </TooltipContent>
    </Tooltip>
  );
};
