export interface CorteMensual{
    id? : number;
    codigo : string;
    numero_corte : string;
    fecha_inicio: Date;
    fecha_fin?: Date;
    status: string;
}

export interface CorteDiario{
    id? : number;
    codigo : string;
    numero_corte : string;
    codigo_corte_mensual : string;
    fecha_inicio: Date;
    fecha_fin?: Date;
    status: string;
}

export interface CorteParcial{
    id? : number;
    codigo : string;
    numero_corte : string;
    codigo_corte_diario : string;
    fecha_inicio: Date;
    fecha_fin?: Date;
    status: string;
}