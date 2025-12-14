import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, FileText, Scale, User, Phone, Mail, CalendarPlus, CheckSquare, AlertCircle } from "lucide-react";
import { format, addHours } from "date-fns";
import { ptBR } from "date-fns/locale";
import { usePublicHearing } from "@/hooks/usePublicHearing";
import { downloadICSFile } from "@/lib/calendarUtils";

const statusColors: Record<string, string> = {
  agendada: "bg-blue-500",
  realizada: "bg-green-500",
  cancelada: "bg-red-500",
  adiada: "bg-yellow-500",
};

const statusLabels: Record<string, string> = {
  agendada: "Agendada",
  realizada: "Realizada",
  cancelada: "Cancelada",
  adiada: "Adiada",
};

export default function HearingPublic() {
  const { token } = useParams();
  const { data: hearing, isLoading, error } = usePublicHearing(token);

  const openInMaps = () => {
    if (!hearing) return;
    const query = encodeURIComponent(hearing.location);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank");
  };

  const handleAddToCalendar = () => {
    if (!hearing) return;
    
    downloadICSFile({
      title: `Audiência - ${hearing.type}`,
      description: `Processo: ${hearing.caseNumber}\nTribunal: ${hearing.court}\n\n${hearing.description || ''}\n\nObservações: ${hearing.notes || 'Nenhuma'}`,
      location: hearing.location,
      startDate: hearing.dateTime,
      endDate: addHours(hearing.dateTime, 2), // Assume 2 hours duration
    }, `audiencia-${hearing.caseNumber.replace(/[^a-zA-Z0-9]/g, '-')}.ics`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando informações da audiência...</p>
        </div>
      </div>
    );
  }

  if (error || !hearing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Link Inválido</h2>
            <p className="text-muted-foreground">
              Este link de audiência não é válido ou expirou. 
              Entre em contato com seu advogado para obter um novo link.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isCancelled = hearing.status === 'cancelada';
  const isPostponed = hearing.status === 'adiada';

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
          {/* Status Alert for cancelled/postponed */}
          {(isCancelled || isPostponed) && (
            <Card className={isCancelled ? "border-destructive bg-destructive/5" : "border-yellow-500 bg-yellow-500/5"}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <AlertCircle className={`h-6 w-6 ${isCancelled ? 'text-destructive' : 'text-yellow-600'}`} />
                  <div>
                    <p className="font-semibold">
                      {isCancelled ? 'Audiência Cancelada' : 'Audiência Adiada'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {isCancelled 
                        ? 'Esta audiência foi cancelada. Entre em contato com seu advogado para mais informações.'
                        : 'Esta audiência foi adiada. Aguarde a nova data ou entre em contato com seu advogado.'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Main Info Card */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <CardTitle className="text-2xl mb-2">{hearing.type}</CardTitle>
                  <Badge className={statusColors[hearing.status]}>
                    {statusLabels[hearing.status]}
                  </Badge>
                </div>
                {!isCancelled && (
                  <Button onClick={handleAddToCalendar} variant="outline">
                    <CalendarPlus className="mr-2 h-4 w-4" />
                    Adicionar ao Calendário
                  </Button>
                )}
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
                        {format(hearing.dateTime, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
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

          {/* Required Documents Card */}
          {hearing.requiredDocuments && hearing.requiredDocuments.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckSquare className="h-5 w-5 text-primary" />
                  Documentos Necessários
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Por favor, leve os seguintes documentos para a audiência:
                </p>
                <ul className="space-y-2">
                  {hearing.requiredDocuments.map((doc, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded border border-muted-foreground/30 flex-shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Lawyer Contact Card */}
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
                
                {hearing.lawyerPhone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <a 
                      href={`https://wa.me/${hearing.lawyerPhone.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {hearing.lawyerPhone}
                    </a>
                  </div>
                )}
                
                {hearing.lawyerEmail && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <a 
                      href={`mailto:${hearing.lawyerEmail}`}
                      className="text-primary hover:underline"
                    >
                      {hearing.lawyerEmail}
                    </a>
                  </div>
                )}

                {!hearing.lawyerPhone && !hearing.lawyerEmail && (
                  <p className="text-sm text-muted-foreground">
                    Em caso de dúvidas ou necessidade de reagendar, entre em contato com o escritório.
                  </p>
                )}
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
