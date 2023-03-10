export enum TipoEmpleado{
    Cajero = 'cajero',
    Encargado = 'encargado',
    Informatica = 'informatica'
}

export interface Empleado{
    id?: number;
    codigo: string;
    tipo_empleado: string; //cajero, encargado
    usuario: string;
    clave: string;
    nombre: string;
    url_imagen: string;
}