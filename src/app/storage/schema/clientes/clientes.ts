export interface Cliente {
    id?: number;
    codigo: string;
    nombre_cliente: string;
    nrc: string;
    nit: string;
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
            nit: '55448554'
        },
        {
            codigo: '002',
            nombre_cliente: 'Cliente #2',
            nrc: '54848884',
            nit: '2258845'
        },
        {
            codigo: '003',
            nombre_cliente: 'Cliente #3',
            nrc: '01254555',
            nit: '55448554'
        },
        {
            codigo: '004',
            nombre_cliente: 'Cliente #4',
            nrc: '01254555',
            nit: '55448554'
        },
        {
            codigo: '005',
            nombre_cliente: 'Cliente #5',
            nrc: '01254555',
            nit: '55448554'
        },
        {
            codigo: '006',
            nombre_cliente: 'Cliente #6',
            nrc: '01254555',
            nit: '55448554'
        },
        {
            codigo: '007',
            nombre_cliente: 'Cliente #7',
            nrc: '54848884',
            nit: '2258845'
        },
        {
            codigo: '008',
            nombre_cliente: 'Cliente #8',
            nrc: '01254555',
            nit: '55448554'
        },
        {
            codigo: '009',
            nombre_cliente: 'Cliente #9',
            nrc: '01254555',
            nit: '55448554'
        },
        {
            codigo: '0010',
            nombre_cliente: 'Cliente #10',
            nrc: '01254555',
            nit: '55448554'
        },
        {
            codigo: '0011',
            nombre_cliente: 'Cliente #11',
            nrc: '01254555',
            nit: '55448554'
        }
    ]
}