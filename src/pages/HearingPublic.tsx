import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, FileText, Scale, User, Phone, Mail } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Hearing } from "@/types/hearing";

export default function HearingPublic() {
  const { token } = useParams();

  // Mock data - will be replaced with real data from backend based on token
  const hearing: Hearing = {
    id: "1",
    clientName: "João Silva",
    clientEmail: "joao@example.com",
    caseNumber: "0001234-56.2024.8.26.0100",
    court: "1ª Vara Cível - Fórum Central",
    type: "Conciliação",
    dateTime: new Date(2024, 11, 15, 10, 0),
    location: "Av. Brigadeiro Luís Antônio, 500 - 3º andar",
    description: "Audiência de conciliação para resolução amigável do conflito",
    notes: "Por favor, chegar 15 minutos antes. Trazer documentos de identificação.",
    status: "agendada",
    isShared: true,
    shareToken: token,
    lawyerId: "1",
    lawyerName: "Dr. Roberto Costa",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const openInMaps = () => {
    const query = encodeURIComponent(hearing.location);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Scale className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-heading font-bold">Detalhes da Audiência</h1>
              <p className="text-sm text-muted-foreground">Informações compartilhadas pelo seu advogado</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl mb-2">{hearing.type}</CardTitle>
                  <Badge>{hearing.status === "agendada" ? "Agendada" : hearing.status}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Data</p>
                      <p className="text-muted-foreground">
                        {format(hearing.dateTime, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Horário</p>
                      <p className="text-muted-foreground">
                        {format(hearing.dateTime, "HH:mm")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Número do Processo</p>
                      <p className="text-muted-foreground font-mono text-sm">
                        {hearing.caseNumber}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Scale className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Tribunal/Vara</p>
                      <p className="text-muted-foreground">
                        {hearing.court}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium mb-1">Local</p>
                    <p className="text-muted-foreground mb-2">{hearing.location}</p>
                    <Button variant="outline" size="sm" onClick={openInMaps}>
                      <MapPin className="mr-2 h-4 w-4" />
                      Abrir no Google Maps
                    </Button>
                  </div>
                </div>
              </div>

              {hearing.description && (
                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-2">Descrição</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {hearing.description}
                  </p>
                </div>
              )}

              {hearing.notes && (
                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-2">Observações Importantes</h3>
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <p className="text-foreground whitespace-pre-wrap">
                      {hearing.notes}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Advogado Responsável</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-primary" />
                  <span className="font-medium">{hearing.lawyerName}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Em caso de dúvidas ou necessidade de reagendar, entre em contato com o escritório.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-sm text-muted-foreground pt-4">
            <p>Esta página é confidencial e foi gerada especialmente para você.</p>
            <p>Mantenha o link em segurança.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
