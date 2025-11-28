import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Hearing } from "@/types/hearing";
import { Calendar, Clock, MapPin, FileText, Share2, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface HearingCardProps {
  hearing: Hearing;
  onEdit: (hearing: Hearing) => void;
  onDelete: (id: string) => void;
  onShare: (hearing: Hearing) => void;
}

const statusColors = {
  agendada: "bg-blue-500",
  realizada: "bg-green-500",
  cancelada: "bg-red-500",
  adiada: "bg-yellow-500",
};

const statusLabels = {
  agendada: "Agendada",
  realizada: "Realizada",
  cancelada: "Cancelada",
  adiada: "Adiada",
};

export function HearingCard({ hearing, onEdit, onDelete, onShare }: HearingCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">{hearing.clientName}</CardTitle>
              {hearing.isShared && (
                <Badge variant="outline" className="bg-primary/10">
                  <Share2 className="h-3 w-3 mr-1" />
                  Compartilhado
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="secondary" className={statusColors[hearing.status]}>
                {statusLabels[hearing.status]}
              </Badge>
              <span>•</span>
              <span>{hearing.type}</span>
            </div>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" onClick={() => onEdit(hearing)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onDelete(hearing.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{format(hearing.dateTime, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{format(hearing.dateTime, "HH:mm")}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="line-clamp-1">{hearing.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="line-clamp-1">{hearing.caseNumber}</span>
          </div>
        </div>

        {hearing.isShared && (
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => onShare(hearing)}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Ver Link de Compartilhamento
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
