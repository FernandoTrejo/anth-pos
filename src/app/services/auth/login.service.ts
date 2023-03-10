import { Injectable } from '@angular/core';
import { db } from 'src/app/storage/db';
import { StatusSesion } from 'src/app/storage/schema/auth/sesiones';
import { FindActiveCorteDiarioService } from '../cortes/corte-diario/find-active-corte-diario.service';
import { InitService } from '../init/init.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService{

  constructor(
    private initService : InitService,
    private zFinder : FindActiveCorteDiarioService
    ) { }

  async login(username: string, pass: string){
    const userList = await db.empleados.where({
      usuario: username
    }).toArray();
    if(userList.length == 0){
      return null;
    }

    const user = userList[0];
    if(user.clave != pass){
      return null;
    }

    //inactivar todas las sesiones que pudieran estar activas por error
    await db.sesionesAuth.toCollection().modify({status: StatusSesion.Inactiva});

    //activar nueva sesion
    await db.sesionesAuth.add({
      id_usuario: user.id,
      fecha_hora_ingreso: new Date(),
      status: StatusSesion.Activa
    });

    const zCorte = await this.zFinder.find();
    if(!zCorte){
      return user;
    }
    
    await this.initService.init();

    return user;
  }

}
