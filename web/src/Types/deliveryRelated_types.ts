export type Services = "Sedex" | "Pac";

export interface DeliveryResponse {
  Codigo: string;
  PrazoEntrega: string;
  Valor: string;
  Erro: number;
  MsgErro?: string;
  Metodo: string | undefined;
  message?: string; 
}