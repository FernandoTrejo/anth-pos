export interface ProductoOrden{
    id?: number,
    codigo_producto: string,
    nombre_producto: string,
    precio: number,
    cantidad: number,
    subtotal: number,
    codigo_orden: string,
    codigo_corte_x: string;
}