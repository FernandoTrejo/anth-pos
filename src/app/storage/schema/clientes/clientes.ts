export enum TipoCliente{
    Persona = 'persona',
    Empresa = 'empresa'
}

export interface Cliente {
    id?: number;
    codigo: string;
    nombre_cliente: string;
    nrc: string;
    nit: string;
    dui: string;
    direccion: string;
    actividad_economica: string;
    tipo_cliente: string;
}

export interface ClienteOrden {
    id?: number;
    codigo_cliente: string;
    codigo_orden: string;
    nombre_cliente: string;
}

export function getClientesMock() {
    return [
        {
            codigo: '001',
            nombre_cliente: 'Cliente #1',
            nrc: '01254555',
            nit: '55448554',
            dui: '',
            direccion: '',
            actividad_economica: '',
            tipo_cliente: TipoCliente.Empresa
        },
        {
            codigo: '002',
            nombre_cliente: 'Cliente #2',
            nrc: '54848884',
            nit: '2258845',
            dui: '',
            direccion: '',
            actividad_economica: '',
            tipo_cliente: TipoCliente.Empresa
        },
        {
            codigo: '003',
            nombre_cliente: 'Cliente #3',
            nrc: '01254555',
            nit: '55448554',
            dui: '',
            direccion: '',
            actividad_economica: '',
            tipo_cliente: TipoCliente.Empresa
        },
        {
            codigo: '004',
            nombre_cliente: 'Cliente #4',
            nrc: '01254555',
            nit: '55448554',
            dui: '',
            direccion: '',
            actividad_economica: '',
            tipo_cliente: TipoCliente.Empresa
        },
        {
            codigo: '005',
            nombre_cliente: 'Cliente #5',
            nrc: '01254555',
            nit: '55448554',
            dui: '',
            direccion: '',
            actividad_economica: '',
            tipo_cliente: TipoCliente.Empresa
        },
        {
            codigo: '006',
            nombre_cliente: 'Cliente #6',
            nrc: '01254555',
            nit: '55448554',
            dui: '',
            direccion: '',
            actividad_economica: '',
            tipo_cliente: TipoCliente.Empresa
        },
        {
            codigo: '007',
            nombre_cliente: 'Cliente #7',
            nrc: '54848884',
            nit: '2258845',
            dui: '',
            direccion: '',
            actividad_economica: '',
            tipo_cliente: TipoCliente.Empresa
        },
        {
            codigo: '008',
            nombre_cliente: 'Cliente #8',
            nrc: '01254555',
            nit: '55448554',
            dui: '',
            direccion: '',
            actividad_economica: '',
            tipo_cliente: TipoCliente.Empresa
        },
        {
            codigo: '009',
            nombre_cliente: 'Cliente #9',
            nrc: '01254555',
            nit: '55448554',
            dui: '',
            direccion: '',
            actividad_economica: '',
            tipo_cliente: TipoCliente.Empresa
        },
        {
            codigo: '0010',
            nombre_cliente: 'Cliente #10',
            nrc: '01254555',
            nit: '55448554',
            dui: '',
            direccion: '',
            actividad_economica: '',
            tipo_cliente: TipoCliente.Empresa
        },
        {
            codigo: '0011',
            nombre_cliente: 'Cliente #11',
            nrc: '01254555',
            nit: '55448554',
            dui: '',
            direccion: '',
            actividad_economica: '',
            tipo_cliente: TipoCliente.Empresa
        },
        {
            codigo: '9932682828',
            nombre_cliente: 'Ale Torre Herrera',
            nrc: '',
            nit: '',
            dui: '9932682828',
            direccion: '',
            actividad_economica: '',
            tipo_cliente: TipoCliente.Persona
        },
        {
            codigo: '2947956798',
            nombre_cliente: 'Rosalinda Fernández',
            nrc: '',
            nit: '',
            dui: '2947956798',
            direccion: '',
            actividad_economica: '',
            tipo_cliente: TipoCliente.Persona
        },
        {
            codigo: '4877442595',
            nombre_cliente: 'Fortunata Almudena Acuña',
            nrc: '',
            nit: '',
            dui: '4877442595',
            direccion: '',
            actividad_economica: '',
            tipo_cliente: TipoCliente.Persona
        },
        {
            codigo: '9556655433',
            nombre_cliente: 'Amado Piñeiro Fernandez',
            nrc: '',
            nit: '',
            dui: '9556655433',
            direccion: '',
            actividad_economica: '',
            tipo_cliente: TipoCliente.Persona
        },
        {
            codigo: '8793332692',
            nombre_cliente: 'Ema Torrents',
            nrc: '',
            nit: '',
            dui: '8793332692',
            direccion: '',
            actividad_economica: '',
            tipo_cliente: TipoCliente.Persona
        },
        {
            codigo: '6987444372',
            nombre_cliente: 'Nicodemo Portero Font',
            nrc: '',
            nit: '',
            dui: '6987444372',
            direccion: '',
            actividad_economica: '',
            tipo_cliente: TipoCliente.Persona
        },
        {
            codigo: '4636427687',
            nombre_cliente: 'Ramiro Donaire Robledo',
            nrc: '',
            nit: '',
            dui: '4636427687',
            direccion: '',
            actividad_economica: '',
            tipo_cliente: TipoCliente.Persona
        },
        {
            codigo: '7446739295',
            nombre_cliente: 'Aarón Villaverde',
            nrc: '',
            nit: '',
            dui: '7446739295',
            direccion: '',
            actividad_economica: '',
            tipo_cliente: TipoCliente.Persona
        },
        {
            codigo: '9976645333',
            nombre_cliente: 'Carmelo Quesada-Crespi',
            nrc: '',
            nit: '',
            dui: '9976645333',
            direccion: '',
            actividad_economica: '',
            tipo_cliente: TipoCliente.Persona
        },
        {
            codigo: '7648835848',
            nombre_cliente: 'Cruz Hidalgo Recio',
            nrc: '',
            nit: '',
            dui: '7648835848',
            direccion: '',
            actividad_economica: '',
            tipo_cliente: TipoCliente.Persona
        }

    ]
}