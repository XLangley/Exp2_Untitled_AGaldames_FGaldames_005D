import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';


export interface Estudiante{
  nombreEstudiante: string;
  correoEstudiante: string;
  passEstudiante: string;
  repassEstudiante: string;
}

const ESTUDIANTES_KEY = 'mis-estudiantes';

@Injectable({
  providedIn: 'root'
})
export class RegistrarAlumnoService {

  private _storage: Storage;
  newEstudiante: Estudiante = <Estudiante>{};

  constructor(private storage : Storage) { 
    this.init();
  }

  async init(){
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async addAlumno(dato : Estudiante ):Promise<any> {
    return this.storage.get(ESTUDIANTES_KEY).then(( datos : Estudiante[])=>{
      if (datos){
        datos.push(dato);
        return this.storage.set(ESTUDIANTES_KEY, datos);
      }else{
        return this.storage.set(ESTUDIANTES_KEY, [dato]);
      }
    })
  }

  getDatos(): Promise<Estudiante[]> {
    return this.storage.get(ESTUDIANTES_KEY);
  }
}
