export interface Transacciones {
    id?: number;
    codigo: string;
    fecha: Date;
    referencia: string;
    nombre_cliente: string;
    total: number;
    tipo_transaccion: string;
    status: string;
}


export const listaTransacciones = () => {
    return [
        {
            codigo: "010105",
            fecha: new Date(),
            tipo_transaccion: "venta",
            referencia: "",
            nombre_cliente: "Carlos Alberto",
            total: 58.6,
            status: "pendiente"
        },
        {
            codigo: "010106",
            fecha: new Date(),
            tipo_transaccion: "venta",
            referencia: "",
            nombre_cliente: "Julian Alvarez",
            total: 22.05,
            status: "cerrada"
        },
        {
            codigo: "010107",
            fecha: new Date(),
            tipo_transaccion: "venta",
            referencia: "",
            nombre_cliente: "Julian Alvarez",
            total: 22.05,
            status: "anulada"
        }
    ];
}