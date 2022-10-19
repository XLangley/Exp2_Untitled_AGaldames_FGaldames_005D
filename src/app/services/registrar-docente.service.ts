import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';


export interface Docente{
  nombreDocente: string;
  correoDocente: string;
  passDocente: string;
  repassDocente: string;
}

const DOCENTES_KEY = 'mis-docentes';

@Injectable({
  providedIn: 'root'
})
export class RegistrarDocenteService {

  private _storage: Storage;
  newDocente: Docente = <Docente>{};

  constructor(private storage : Storage) { 
    this.init();
  }

  async init(){
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async addDocente(dato : Docente ):Promise<any> {
    return this.storage.get(DOCENTES_KEY).then(( datos : Docente[])=>{
      if (datos){
        datos.push(dato);
        return this.storage.set(DOCENTES_KEY, datos);
      }else{
        return this.storage.set(DOCENTES_KEY, [dato]);
      }
    })
  }

  getDatos(): Promise<Docente[]> {
    return this.storage.get(DOCENTES_KEY);
  }
}
