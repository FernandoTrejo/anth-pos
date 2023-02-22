export interface Cliente{
    id? : number;
    codigo: string;
    nombre_cliente: string;
    nrc: string;
    nit: string;
}

export interface ClienteOrden{
    id? : number;
    codigo_cliente: string;
    codigo_orden: string;
    nombre_cliente: string;
}