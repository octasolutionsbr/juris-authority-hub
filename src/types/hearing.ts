export type HearingType = 
  | "Conciliação"
  | "Instrução"
  | "Julgamento"
  | "Inicial"
  | "Sentença"
  | "Outras";

export type HearingStatus = 
  | "agendada"
  | "realizada"
  | "cancelada"
  | "adiada";

export interface Hearing {
  id: string;
  clientName: string;
  clientEmail: string;
  caseNumber: string;
  court: string;
  type: HearingType;
  dateTime: Date;
  location: string;
  description: string;
  notes: string;
  status: HearingStatus;
  isShared: boolean;
  shareToken?: string;
  lawyerId: string;
  lawyerName: string;
  lawyerPhone?: string;
  lawyerEmail?: string;
  requiredDocuments?: string[];
  createdAt: Date;
  updatedAt: Date;
}
