import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Hearing, HearingType, HearingStatus } from "@/types/hearing";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface HearingFormProps {
  hearing?: Hearing;
  onSubmit: (data: Partial<Hearing>) => void;
  onCancel: () => void;
}

export function HearingForm({ hearing, onSubmit, onCancel }: HearingFormProps) {
  const [formData, setFormData] = useState({
    clientName: hearing?.clientName || "",
    clientEmail: hearing?.clientEmail || "",
    caseNumber: hearing?.caseNumber || "",
    court: hearing?.court || "",
    type: hearing?.type || "Conciliação" as HearingType,
    dateTime: hearing?.dateTime || new Date(),
    time: hearing?.dateTime ? format(hearing.dateTime, "HH:mm") : "09:00",
    location: hearing?.location || "",
    description: hearing?.description || "",
    notes: hearing?.notes || "",
    status: hearing?.status || "agendada" as HearingStatus,
    isShared: hearing?.isShared || false,
    lawyerPhone: hearing?.lawyerPhone || "",
    lawyerEmail: hearing?.lawyerEmail || "",
    requiredDocuments: hearing?.requiredDocuments || [] as string[],
  });

  const [newDocument, setNewDocument] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const [hours, minutes] = formData.time.split(':');
    const dateTime = new Date(formData.dateTime);
    dateTime.setHours(parseInt(hours), parseInt(minutes));
    
    onSubmit({
      ...formData,
      dateTime,
    });
  };

  const addDocument = () => {
    if (newDocument.trim()) {
      setFormData({
        ...formData,
        requiredDocuments: [...formData.requiredDocuments, newDocument.trim()],
      });
      setNewDocument("");
    }
  };

  const removeDocument = (index: number) => {
    setFormData({
      ...formData,
      requiredDocuments: formData.requiredDocuments.filter((_, i) => i !== index),
    });
  };

  const handleDocumentKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addDocument();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="clientName">Nome do Cliente *</Label>
          <Input
            id="clientName"
            value={formData.clientName}
            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="clientEmail">E-mail do Cliente</Label>
          <Input
            id="clientEmail"
            type="email"
            value={formData.clientEmail}
            onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="caseNumber">Número do Processo *</Label>
          <Input
            id="caseNumber"
            value={formData.caseNumber}
            onChange={(e) => setFormData({ ...formData, caseNumber: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="court">Tribunal/Vara *</Label>
          <Input
            id="court"
            value={formData.court}
            onChange={(e) => setFormData({ ...formData, court: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="type">Tipo de Audiência *</Label>
          <Select
            value={formData.type}
            onValueChange={(value) => setFormData({ ...formData, type: value as HearingType })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Conciliação">Conciliação</SelectItem>
              <SelectItem value="Instrução">Instrução</SelectItem>
              <SelectItem value="Julgamento">Julgamento</SelectItem>
              <SelectItem value="Inicial">Inicial</SelectItem>
              <SelectItem value="Sentença">Sentença</SelectItem>
              <SelectItem value="Outras">Outras</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => setFormData({ ...formData, status: value as HearingStatus })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="agendada">Agendada</SelectItem>
              <SelectItem value="realizada">Realizada</SelectItem>
              <SelectItem value="cancelada">Cancelada</SelectItem>
              <SelectItem value="adiada">Adiada</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Data *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.dateTime && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.dateTime ? format(formData.dateTime, "dd/MM/yyyy") : <span>Selecione</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.dateTime}
                onSelect={(date) => date && setFormData({ ...formData, dateTime: date })}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Horário *</Label>
          <Input
            id="time"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Local/Endereço *</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          placeholder="Ex: R. Prof. Tostes, 783 - Centro, Macapá"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição/Pauta</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          placeholder="Descreva os assuntos que serão tratados..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Observações para o Cliente</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={3}
          placeholder="Informações que o cliente deve saber (visível quando compartilhado)"
        />
      </div>

      {/* Required Documents Section */}
      <div className="space-y-2">
        <Label>Documentos Necessários</Label>
        <p className="text-xs text-muted-foreground mb-2">
          Lista de documentos que o cliente deve levar para a audiência
        </p>
        <div className="flex gap-2">
          <Input
            value={newDocument}
            onChange={(e) => setNewDocument(e.target.value)}
            onKeyDown={handleDocumentKeyDown}
            placeholder="Ex: RG e CPF, Comprovante de residência..."
          />
          <Button type="button" variant="outline" onClick={addDocument}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {formData.requiredDocuments.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.requiredDocuments.map((doc, index) => (
              <Badge key={index} variant="secondary" className="gap-1 py-1">
                {doc}
                <button
                  type="button"
                  onClick={() => removeDocument(index)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Sharing Section */}
      <div className="border rounded-lg p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="isShared">Compartilhar com Cliente</Label>
            <p className="text-sm text-muted-foreground">
              Permite que o cliente veja os detalhes via link
            </p>
          </div>
          <Switch
            id="isShared"
            checked={formData.isShared}
            onCheckedChange={(checked) => setFormData({ ...formData, isShared: checked })}
          />
        </div>

        {formData.isShared && (
          <div className="grid gap-4 md:grid-cols-2 pt-2 border-t">
            <div className="space-y-2">
              <Label htmlFor="lawyerPhone">Seu Telefone/WhatsApp</Label>
              <Input
                id="lawyerPhone"
                value={formData.lawyerPhone}
                onChange={(e) => setFormData({ ...formData, lawyerPhone: e.target.value })}
                placeholder="(96) 99999-9999"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lawyerEmail">Seu E-mail de Contato</Label>
              <Input
                id="lawyerEmail"
                type="email"
                value={formData.lawyerEmail}
                onChange={(e) => setFormData({ ...formData, lawyerEmail: e.target.value })}
                placeholder="seu@email.com"
              />
            </div>
            <p className="text-xs text-muted-foreground md:col-span-2">
              Estas informações serão exibidas na página pública para o cliente entrar em contato
            </p>
          </div>
        )}
      </div>

      <div className="flex gap-2 justify-end pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {hearing ? "Atualizar" : "Criar"} Audiência
        </Button>
      </div>
    </form>
  );
}
