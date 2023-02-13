import { Empleado } from "../empleados/empleados";

export enum StatusSesion{
    Activa = 'activa',
    Inactiva = 'inactiva'
}

export interface AuthSesion{
    id?: number;
    id_usuario?: number;
    fecha_hora_ingreso: Date;
    fecha_hora_salida?: Date;
    status: string;

    datosUser?: Empleado;
}