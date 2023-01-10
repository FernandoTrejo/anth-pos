// import Dexie from "dexie";

// const db = new Dexie("pos_client");

// db.version(1).stores({
//     transacciones: "&id, codigo, fecha, tipo_transaccion"
// });

// await db.transacciones.bulkAdd([
//     { codigo: "sfre4rtre66rtert", fecha: new Date(),  tipo_transaccion: "venta"},
//     { codigo: "sfgdthtrh5585dff", fecha: new Date(),  tipo_transaccion: "otros_ingresos"}
// ]);

import Dexie, { Table } from 'dexie';

export interface Transacciones {
  id?: number;
  codigo: string;
  fecha: string,
  tipo_transaccion: string
}

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
    await db.transacciones.bulkAdd([
      {
        codigo: "sfre4rtre66rtert",
        fecha: "2019-10-21",
        tipo_transaccion: "venta"
      },
      {
        codigo: "sfgdthtrh5585dff",
        fecha: "2020-10-26",
        tipo_transaccion: "otros_ingresos"
      }
    ]);
  }

  async resetDatabase() {
    await db.transaction('rw', 'transacciones', () => {
      this.transacciones.clear();
      this.populate();
    });
  }
}

export const db = new PosClientDB();