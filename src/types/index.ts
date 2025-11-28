export interface Drug {
  name: string;
  matched_text: string;
  quantity: number | null;
  unit: string | null;
  dosage: string;
}

export interface Product {
  name: string;
  original_name: string;
  quantity: number;
  type: string;

}

export interface PrescriptionInfo {
  dosage: string | null;
  matched_text: string | null;
  name: string;
  quantity: number;
  unit: string | null;
}

export interface TranscriptionResponse {
  success: boolean;
  text: string;
  prescription_info: PrescriptionInfo;
  warnings: string[];
  confidence: number;
  timestamp: string;
  error?: string;
  audio_id?:string | undefined;
  products?: Product[]; // Add products field
}
export interface AudioData {
   audio_id?:string;
}
export interface PrescriptionRecord {
  text: string;
  prescription_info: PrescriptionInfo[];
  warnings: string[];
  timestamp: string;
  saved_at?: string;
  confidence?: number;
  audio_id?:string;
}

export interface Stats {
  total: number;
  today: number;
  avg_confidence: number;
}

export interface HealthResponse {
  status: string;
  message: string;
  whisper_model: string;
}

export interface SavePrescriptionResponse {
  success: boolean;
  message: string;
  error?: string;
}

export interface PrescriptionsResponse {
  success: boolean;
  prescriptions: PrescriptionRecord[];
  total: number;
  error?: string;
}

export type ConnectionStatus = "connecting" | "connected" | "error";
