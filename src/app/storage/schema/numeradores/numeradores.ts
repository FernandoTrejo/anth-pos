import { TipoDocumentos } from "src/app/utilities/tipo_documentos";

export interface Numerador {
    id?: number;
    tipo_documento: string;
    nombre: string;
    prefijo: string;
    numeracion: string;
    inicio: number;
    fin: number;
    actual: number;
}

export function getInitialNumeradores() {
    return [
        {
            tipo_documento: TipoDocumentos.FacturaConsumidorFinal,
            nombre: 'Factura Consumidor Final',
            prefijo: '',
            numeracion: '0000',
            inicio: 1,
            fin: 100,
            actual: 0
        },
        {
            tipo_documento: TipoDocumentos.CreditoFiscal,
            nombre: 'Credito Fiscal',
            prefijo: '',
            numeracion: '0000',
            inicio: 1,
            fin: 100,
            actual: 0
        },
        {
            tipo_documento: TipoDocumentos.TicketVenta,
            nombre: 'Ticket de Venta',
            prefijo: '',
            numeracion: '0000',
            inicio: 1,
            fin: 100,
            actual: 0
        },
        {
            tipo_documento: TipoDocumentos.TicketDevolucion,
            nombre: 'Ticket Devolucion',
            prefijo: '',
            numeracion: '0000',
            inicio: 1,
            fin: 100,
            actual: 0
        },
        {
            tipo_documento: TipoDocumentos.TicketOtrosEgresos,
            nombre: 'Ticket Otros Egresos',
            prefijo: '',
            numeracion: '0000',
            inicio: 1,
            fin: 100,
            actual: 0
        },
        {
            tipo_documento: TipoDocumentos.TicketOtrosIngresos,
            nombre: 'Ticket Otros Ingresos',
            prefijo: '',
            numeracion: '0000',
            inicio: 1,
            fin: 100,
            actual: 0
        }
    ];
}