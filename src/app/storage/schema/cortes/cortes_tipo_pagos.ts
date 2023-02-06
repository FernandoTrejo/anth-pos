export enum TipoCorte{
    Parcial = 'parcial',
    Diario = 'diario',
    Mensual = 'mensual'
}

export interface CorteTipoPago{
    id? : number;
    codigo_corte?: string;
    tipo: TipoCorte,
    codigo_tipo_pago: string,
    monto: number
}