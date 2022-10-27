import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';


export interface Usuario{
  nombre: string;
  correo: string;
  pass: string;
  repass: string;
  isAlumno: string;
}

const USUARIOS_KEY = 'mis-usuarios';

@Injectable({
  providedIn: 'root'
})
export class RegistrarService {

  private _storage: Storage;
  newUsuario: Usuario = <Usuario>{};

  constructor(private storage : Storage) { 
    this.init();
  }

  async init(){
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async addUsuario(dato : Usuario ):Promise<any> {
    return this.storage.get(USUARIOS_KEY).then(( datos : Usuario[])=>{
      if (datos){
        datos.push(dato);
        return this.storage.set(USUARIOS_KEY, datos);
      }else{
        return this.storage.set(USUARIOS_KEY, [dato]);
      }
    })
  }

  getDatos(): Promise<Usuario[]> {
    return this.storage.get(USUARIOS_KEY);
  }
}
