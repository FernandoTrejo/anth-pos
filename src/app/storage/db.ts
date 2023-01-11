import Dexie, { Table } from 'dexie';
import { Transacciones, listaTransacciones } from './schema/transacciones/transacciones';


export class PosClientDB extends Dexie {
  transacciones!: Table<Transacciones, number>;

  constructor() {
    super('PosClientDB');
    this.version(1).stores({
      transacciones: '++id',
    });
    this.on('populate', () => this.populate());
  }

  async populate() {
    await db.transacciones.bulkAdd(listaTransacciones());
  }

  async resetDatabase() {
    await db.transaction('rw', 'transacciones', () => {
      this.transacciones.clear();
      this.populate();
    });
  }
}

export const db = new PosClientDB();