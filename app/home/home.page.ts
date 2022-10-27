import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(private app: AppComponent, private router: Router) {}

  ngOnInit(): void {
    const btnQR = document.getElementById('qr');
    btnQR?.setAttribute('routerLink','/generar-qr');

  }

  ionViewWillEnter(){
    const header = document.getElementById('header');
    const btnQR = document.getElementById('qr');
    const txtqr = document.getElementById('txt-qr');
    const version = document.getElementById('version');
    const txtfuncion = document.getElementById('funcion');


    if (localStorage.getItem('type') == 'true') {
      header?.classList.add('header-alumno');
      btnQR?.classList.add('btn-qr-alumno');
      txtqr?.classList.add('txt-qr-alumno');
      txtfuncion!.innerHTML = 'ESCANEAR';
    } else {
      header?.classList.add('header-docente');
      btnQR?.classList.add('btn-qr-docente');
      txtqr?.classList.add('txt-qr-docente');
      txtfuncion!.innerHTML = 'GENERAR';
    }

    version!.innerHTML = localStorage.getItem('user') == null ? '' : localStorage.getItem('user')?.toUpperCase();
  }

  qrButton(){
    if (localStorage.getItem('type') == 'true') {
      this.router.navigate(['']);
    } else {
      this.router.navigate(['/generar-qr']);
    }
  }


}
