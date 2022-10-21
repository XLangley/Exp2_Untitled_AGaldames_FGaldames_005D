import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  username : string;

  constructor(private app: AppComponent, private router: Router) {}

  ngOnInit(): void {
    const btnQR = document.getElementById('qr');
    btnQR?.setAttribute('routerLink','/generar-qr');

  }

  ionViewWillEnter(){
    console.log(AppComponent.isAlumno);
    const header = document.getElementById('header');
    const btnQR = document.getElementById('qr');
    const txtqr = document.getElementById('txt-qr');
    const version = document.getElementById('version');
    const txtfuncion = document.getElementById('funcion');


    if (AppComponent.isAlumno) {
      header?.classList.add('header-alumno');
      btnQR?.classList.add('btn-qr-alumno');
      txtqr?.classList.add('txt-qr-alumno');
      version!.innerHTML = 'ALUMNO';
      txtfuncion!.innerHTML = 'ESCANEAR';
    } else {
      header?.classList.add('header-docente');
      btnQR?.classList.add('btn-qr-docente');
      txtqr?.classList.add('txt-qr-docente');
      version!.innerHTML = 'DOCENTE';
      txtfuncion!.innerHTML = 'GENERAR';
    }

    this.username = this.app.user.nombre.toUpperCase();
    console.log(this.app.user.nombre);

  }

  qrButton(){
    if (AppComponent.isAlumno) {
      this.router.navigate(['']);
    } else {
      this.router.navigate(['/generar-qr']);
    }
  }


}
