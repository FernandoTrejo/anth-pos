import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';
import { Message, MessageType } from 'src/app/utilities/messages';

@Injectable({
  providedIn: 'root'
})
export class StoreChangesService {

  constructor() { }

  async store(id : number, changes : object) : Promise<Message>{
    try {
      await db.numeradores.update(id, changes);
      return {
        title: 'Se han guardado los cambios',
        type: MessageType.success
      };
    } catch (error) {
      console.log(error);
      return {
        title: 'Ha ocurrido un error al guardar los cambios',
        type: MessageType.error
      };
    }
  }
}
