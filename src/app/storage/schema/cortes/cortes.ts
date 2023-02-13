import { Empleado } from "../empleados/empleados";
import { TipoCorte } from "./cortes_tipo_pagos";

export interface CorteMensual{
    id? : number;
    codigo : string;
    numero_corte : string;
    fecha_inicio: Date;
    fecha_fin?: Date;
    status: string;
    usuario_id: number;
}

export interface CorteDiario{
    id? : number;
    codigo : string;
    numero_corte : string;
    codigo_corte_mensual : string;
    fecha_inicio: Date;
    fecha_fin?: Date;
    status: string;
    usuario_id: number;
}

export interface CorteParcial{
    id? : number;
    codigo : string;
    numero_corte : string;
    codigo_corte_diario : string;
    fecha_inicio: Date;
    fecha_fin?: Date;
    status: string;
    usuario_id: number;
}

export interface CorteFinalizado{
    id? : number;
    codigo : string;
    numero_corte : string;
    fecha_inicio: Date;
    fecha_fin: Date;
    usuario_id: number;
    tipo_corte: TipoCorte;


    datosUser? : Empleado;
}