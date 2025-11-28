import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Hearing } from "@/types/hearing";
import { Copy, ExternalLink, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HearingShareDialogProps {
  hearing: Hearing | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HearingShareDialog({ hearing, open, onOpenChange }: HearingShareDialogProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  if (!hearing) return null;

  const shareUrl = `${window.location.origin}/audiencia/${hearing.shareToken || hearing.id}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: "Link copiado!",
        description: "O link foi copiado para a área de transferência.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o link. Tente selecionar e copiar manualmente.",
        variant: "destructive",
      });
    }
  };

  const handleOpenPreview = () => {
    window.open(shareUrl, "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Compartilhar Audiência</DialogTitle>
          <DialogDescription>
            Compartilhe este link com {hearing.clientName} para que ele possa visualizar os detalhes da audiência.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Link de Compartilhamento</Label>
            <div className="flex gap-2">
              <Input
                value={shareUrl}
                readOnly
                className="font-mono text-xs"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopy}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleOpenPreview}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Visualizar
            </Button>
            <Button
              className="flex-1"
              onClick={handleCopy}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copiar Link
            </Button>
          </div>

          <div className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
            <p className="font-medium mb-1">Informações visíveis ao cliente:</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Data, horário e local da audiência</li>
              <li>Número do processo e tribunal</li>
              <li>Tipo de audiência</li>
              <li>Observações que você adicionou</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
