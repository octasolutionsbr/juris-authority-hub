import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AlertTriangle, Trash2, RefreshCw, Eye, X, Clock, User, Globe, Code } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useErrorLogs, ErrorLog } from "@/hooks/useErrorLogs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

export default function ErrorAlerts() {
  const {
    errorLogs,
    isLoading,
    refetch,
    recentErrorCount,
    deleteOldLogs,
    deleteLog,
    isDeletingOld,
  } = useErrorLogs();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLog, setSelectedLog] = useState<ErrorLog | null>(null);

  const filteredLogs = errorLogs.filter((log) => {
    const search = searchTerm.toLowerCase();
    return (
      log.error_message?.toLowerCase().includes(search) ||
      log.user_email?.toLowerCase().includes(search) ||
      log.user_name?.toLowerCase().includes(search) ||
      log.error_source?.toLowerCase().includes(search)
    );
  });

  const handleDeleteOld = (days: number) => {
    deleteOldLogs(days, {
      onSuccess: () => {
        toast.success(`Logs com mais de ${days} dias removidos`);
      },
      onError: () => {
        toast.error("Erro ao remover logs antigos");
      },
    });
  };

  const handleDeleteLog = (logId: string) => {
    deleteLog(logId, {
      onSuccess: () => {
        toast.success("Log removido");
      },
      onError: () => {
        toast.error("Erro ao remover log");
      },
    });
  };

  const formatDateTime = (dateStr: string) => {
    return format(new Date(dateStr), "dd/MM/yyyy HH:mm:ss", { locale: ptBR });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              Alertas de Erros
            </h1>
            <p className="text-muted-foreground">
              Monitore erros enfrentados pelos usuários
            </p>
          </div>
          <div className="flex items-center gap-2">
            {recentErrorCount > 0 && (
              <Badge variant="destructive" className="text-sm">
                {recentErrorCount} nas últimas 24h
              </Badge>
            )}
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Atualizar
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total de Erros</CardDescription>
              <CardTitle className="text-3xl">{errorLogs.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Últimas 24 horas</CardDescription>
              <CardTitle className="text-3xl text-destructive">{recentErrorCount}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Ações</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" disabled={isDeletingOld}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Limpar +7 dias
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Limpar logs antigos?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Isso removerá todos os logs de erro com mais de 7 dias. Esta ação não pode ser desfeita.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDeleteOld(7)}>
                      Limpar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" disabled={isDeletingOld}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Limpar +30 dias
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Limpar logs antigos?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Isso removerá todos os logs de erro com mais de 30 dias. Esta ação não pode ser desfeita.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDeleteOld(30)}>
                      Limpar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="flex items-center gap-4">
          <Input
            placeholder="Buscar por mensagem, usuário ou fonte..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : filteredLogs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <AlertTriangle className="h-12 w-12 mb-4 opacity-50" />
                <p>Nenhum erro registrado</p>
              </div>
            ) : (
              <ScrollArea className="h-[500px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data/Hora</TableHead>
                      <TableHead>Usuário</TableHead>
                      <TableHead>Origem</TableHead>
                      <TableHead>Mensagem</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="whitespace-nowrap text-sm">
                          {formatDateTime(log.created_at)}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium text-sm">
                              {log.user_name || "Anônimo"}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {log.user_email || "-"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {log.error_source || "desconhecido"}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-[300px] truncate text-sm">
                          {log.error_message}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setSelectedLog(log)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteLog(log.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            )}
          </CardContent>
        </Card>

        {/* Detail Dialog */}
        <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Detalhes do Erro
              </DialogTitle>
              <DialogDescription>
                Informações completas sobre o erro registrado
              </DialogDescription>
            </DialogHeader>
            {selectedLog && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 mt-1 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Data/Hora</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDateTime(selectedLog.created_at)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <User className="h-4 w-4 mt-1 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Usuário</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedLog.user_name || "Anônimo"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {selectedLog.user_email || "-"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Globe className="h-4 w-4 mt-1 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Página</p>
                      <p className="text-xs text-muted-foreground break-all">
                        {selectedLog.page_url || "-"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Code className="h-4 w-4 mt-1 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Origem</p>
                      <Badge variant="outline">
                        {selectedLog.error_source || "desconhecido"}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Mensagem de Erro</p>
                  <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3">
                    <p className="text-sm text-destructive font-mono">
                      {selectedLog.error_message}
                    </p>
                  </div>
                </div>

                {selectedLog.error_details && Object.keys(selectedLog.error_details).length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Detalhes Técnicos</p>
                    <ScrollArea className="h-[200px]">
                      <pre className="bg-muted rounded-md p-3 text-xs overflow-x-auto">
                        {JSON.stringify(selectedLog.error_details, null, 2)}
                      </pre>
                    </ScrollArea>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
