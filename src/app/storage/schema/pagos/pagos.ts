export interface Pago {
    id?: number;
    tipo_pago: string;
    emisor: string;
    recibido: number;
    codigo_orden: string;
    numero_autorizacion: string;
    numero_telefono: string;
    ultimos_digitos_tarjeta: string;
    vuelto?: number;
}