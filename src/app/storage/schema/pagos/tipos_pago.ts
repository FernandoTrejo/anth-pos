export interface TipoPagoPermitido{
    id? : number;
    codigo: string;
    titulo: string;
}

export function getPagosMock(){
    return [
        {
            codigo: 'efectivo',
            titulo: 'Efectivo'
        },
        {
            codigo: 'tarjeta',
            titulo: 'Tarjeta'
        },
        {
            codigo: 'otro',
            titulo: 'Otro'
        }
    ];
}