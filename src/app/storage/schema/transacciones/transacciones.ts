export interface Transacciones {
    id?: number;
    codigo: string;
    numero_transaccion: string;
    fecha: Date;
    referencia: string;
    nombre_cliente: string;
    total: number;
    tipo_transaccion: string;
    status: string;
    corte_mensual : string;
    corte_diario : string;
    corte_parcial : string;
}
