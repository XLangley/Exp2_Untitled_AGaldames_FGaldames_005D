import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log(AppComponent.isAlumno);
    var bgContent = document.getElementById('ion-content');
    var txtVersion = document.getElementById('txt-version');
    var header = document.getElementById('header');
    var enviar = document.getElementById('enviar');
    var volver = document.getElementById('volver');

    if (AppComponent.isAlumno) {
      txtVersion!.innerHTML = 'VERSION ESTUDIANTE';
      bgContent?.classList.add("bg-alumno");
      header?.classList.add("header-alumno");
      enviar?.classList.add("enviar-alumno");
      volver?.classList.add("volver-alumno");
    } else {
      txtVersion!.innerHTML = 'VERSION DOCENTE';
      bgContent?.classList.add("bg-docente");
      header?.classList.add("header-docente");
      enviar?.classList.add("enviar-docente");
      volver?.classList.add("volver-docente");
    }
  }

  solicitud={
    email:'',
  }

  onSubmit(){
    console.log('Submit');
    console.log(this.solicitud);
  }

}
