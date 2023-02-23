import Dexie, { Table } from 'dexie';
import { Categoria, Producto, listaCategorias } from './schema/productos/productos_categorias';
import { Transacciones } from './schema/transacciones/transacciones';
import { ProductoOrden } from './schema/productos/productos_orden';
import { Pago } from './schema/pagos/pagos';
import { CorteDiario, CorteFinalizado, CorteMensual, CorteParcial } from './schema/cortes/cortes';
import { Empleado, TipoEmpleado } from './schema/empleados/empleados';
import { AuthSesion } from './schema/auth/sesiones';
import { getPagosMock, TipoPagoPermitido } from './schema/pagos/tipos_pago';
import { CorteTipoPago } from './schema/cortes/cortes_tipo_pagos';
import { Cliente, ClienteOrden, getClientesMock } from './schema/clientes/clientes';

export class PosClientDB extends Dexie {
  transacciones!: Table<Transacciones, number>;
  categorias!: Table<Categoria, number>;
  productos!: Table<Producto, number>;
  productosOrden!: Table<ProductoOrden, number>;
  pagosOrden!: Table<Pago, number>;
  cortesMensuales!: Table<CorteMensual, number>;
  cortesDiarios!: Table<CorteDiario, number>;
  cortesParciales!: Table<CorteParcial, number>;
  empleados!: Table<Empleado, number>;
  sesionesAuth!: Table<AuthSesion, number>;
  tiposPagoPermitido!: Table<TipoPagoPermitido, number>;
  cortesTipoPagos!: Table<CorteTipoPago, number>;
  cortesFinalizados!: Table<CorteFinalizado, number>;
  clientes!: Table<Cliente, number>;
  clientesOrden!: Table<ClienteOrden, number>;

  constructor() {
    super('PosClientDB');
    this.version(1).stores({
      transacciones: '++id, codigo, numero_transaccion, status, corte_mensual, corte_diario, corte_parcial',
      categorias: '++id',
      productos: '++id, id_categoria, codigo',
      productosOrden: '++id, codigo_orden, codigo_producto',
      pagosOrden: '++id, codigo_orden',
      cortesMensuales: '++id, codigo, numero_corte, status',
      cortesDiarios: '++id, codigo, numero_corte, codigo_corte_mensual, status',
      cortesParciales: '++id, codigo, numero_corte, codigo_corte_diario, status',
      empleados: '++id, codigo, usuario',
      sesionesAuth: '++id, status',
      tiposPagoPermitido: '++id, codigo',
      cortesTipoPagos: '++id, codigo_corte, codigo_tipo_pago, tipo',
      cortesFinalizados: '++id, codigo_corte, tipo_corte',
      clientes: '++id, nit, nrc, codigo, nombre_cliente',
      clientesOrden: '++id, codigo_orden, codigo_cliente',
    });
    this.on('populate', () => this.populate());
  }

  async populate() {
    //insertar categorias y productos
    let categorias = listaCategorias();
    for (let categoria of categorias) {
      const idCategoria = await db.categorias.add({
        codigo: categoria.codigo,
        nombre: categoria.nombre
      });

      categoria.productos.forEach((producto) => {
        producto.id_categoria = idCategoria;
      })
      await db.productos.bulkAdd(categoria.productos as Array<Producto>);

    }

    await db.empleados.bulkAdd([
      {
        codigo: '0123456789',
        tipo_empleado: TipoEmpleado.Cajero,
        usuario: 'cajero1',
        nombre: 'Sergio',
        clave: 'password',
        url_imagen: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
      },
      {
        codigo: '9876543210',
        tipo_empleado: TipoEmpleado.Cajero,
        usuario: 'cajero2',
        nombre: 'Maria',
        clave: 'holamundo',
        url_imagen: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
      }, {
        codigo: '0219631260',
        tipo_empleado: TipoEmpleado.Encargado,
        usuario: 'usuario',
        nombre: 'Encargado Suc. X',
        clave: '123456',
        url_imagen: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
      },
    ]);

    await this.tiposPagoPermitido.bulkAdd(getPagosMock());
    await this.clientes.bulkAdd(getClientesMock());
  }

  async resetDatabase() {
    await db.transaction('rw',
      [
        'transacciones',
        'productos',
        'categorias',
        'productosOrden',
        'pagosOrden',
        'cortesDiarios',
        'cortesMensuales',
        'cortesParciales',
        'empleados',
        'sesionesAuth',
        'tiposPagoPermitido',
        'cortesTipoPagos',
        'cortesFinalizados',
        'clientes',
        'clientesOrden'
      ],
      () => {
        this.transacciones.clear();
        this.productos.clear();
        this.categorias.clear();
        this.productosOrden.clear();
        this.pagosOrden.clear();
        this.cortesDiarios.clear();
        this.cortesMensuales.clear();
        this.cortesParciales.clear();
        this.empleados.clear();
        this.sesionesAuth.clear();
        this.tiposPagoPermitido.clear();
        this.cortesTipoPagos.clear();
        this.cortesFinalizados.clear();
        this.clientes.clear();
        this.clientesOrden.clear();
        this.populate();
      });
  }
}

export const db = new PosClientDB();