export interface Pago{
    id? : number;
    tipo_pago: string;
    emisor: string;
    recibido: number;
    codigo_orden: string;
}