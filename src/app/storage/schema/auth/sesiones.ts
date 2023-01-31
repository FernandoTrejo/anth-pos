export enum StatusSesion{
    Activa = 'activa',
    Inactiva = 'inactiva'
}

export interface AuthSesion{
    id?: number;
    codigo_usuario: string;
    fecha_hora_ingreso: Date;
    fecha_hora_salida?: Date;
    status: string;
}