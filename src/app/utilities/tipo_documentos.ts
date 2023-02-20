export enum TipoDocumentos {
    TicketVenta = 'ticket_venta',
    FacturaConsumidorFinal = 'factura_consumidor_final',
    CreditoFiscal = 'credito_fiscal',
    TicketDevolucion = 'ticket_devolucion'
}

export function TraducirTipoDocumento(codigo: string) {
    let texto: string = '';
    switch (codigo) {
        case TipoDocumentos.CreditoFiscal:
            texto = 'Credito Fiscal';
            break;
        case TipoDocumentos.FacturaConsumidorFinal:
            texto = 'Factura';
            break;
        case TipoDocumentos.TicketVenta:
            texto = 'Ticket';
            break;
        case TipoDocumentos.TicketDevolucion:
            texto = 'Ticket Devolucion';
            break;
        default:
            texto = '';
    }
    return texto;
}