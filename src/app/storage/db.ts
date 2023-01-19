import Dexie, { Table } from 'dexie';
import { Categoria, Producto, listaCategorias } from './schema/productos/productos_categorias';
import { Transacciones, listaTransacciones } from './schema/transacciones/transacciones';
import { ProductoOrden } from './schema/productos/productos_orden';
import { Pago } from './schema/pagos/pagos';


export class PosClientDB extends Dexie {
  transacciones!: Table<Transacciones, number>;
  categorias!: Table<Categoria, number>;
  productos!: Table<Producto, number>;
  productosOrden!: Table<ProductoOrden, number>;
  pagosOrden!: Table<Pago, number>; 

  constructor() {
    super('PosClientDB');
    this.version(1).stores({
      transacciones: '++id',
      categorias: '++id',
      productos: '++id, id_categoria',
      productosOrden: '++id, codigo_orden',
      pagosOrden: '++id, codigo_orden'
    });
    this.on('populate', () => this.populate());
  }

  async populate() {
    await db.transacciones.bulkAdd(listaTransacciones());

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
  }

  async resetDatabase() {
    await db.transaction('rw', 'transacciones', () => {
      this.transacciones.clear();
      this.productos.clear();
      this.categorias.clear();
      this.productosOrden.clear();
      this.pagosOrden.clear();
      this.populate();
    });
  }
}

export const db = new PosClientDB();