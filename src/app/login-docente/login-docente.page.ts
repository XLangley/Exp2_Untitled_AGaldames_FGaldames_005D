import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

import { AlertController, NavController,ToastController } from '@ionic/angular';
import { RegistrarDocenteService, Docente } from '../services/registrar-docente.service';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-login-docente',
  templateUrl: './login-docente.page.html',
  styleUrls: ['./login-docente.page.scss'],
})
export class LoginDocentePage implements OnInit {

  formularioLogin : FormGroup;
  formularioRegistro : FormGroup;
  docentes :  Docente[];
  newDocente: Docente = <Docente>{};

  constructor(
              private toastController: ToastController,
              private alertController: AlertController,
              private NavController: NavController,
              private registroDocente: RegistrarDocenteService,
              private fb: FormBuilder)
              {
                this.formularioLogin = this.fb.group({
                  'correo' : new FormControl("", Validators.required),
                  'password': new FormControl("", Validators.required),
                });
                this.formularioRegistro = this.fb.group({
                  'nombre' : new FormControl("", Validators.required),
                  'correo': new FormControl("", Validators.required),
                  'password': new FormControl("", Validators.required),
                  'repass': new FormControl("", Validators.required),
                });
              }
  ngOnInit() {
  }

  ionViewWillEnter() {
    AppComponent.isAlumno = false;
  }

  // LOGIN DOCENTES
  async ingresar(){
    var f = this.formularioLogin.value;
    var a = 0;

    this.registroDocente.getDatos().then(datos=>{
      this.docentes = datos;
      if (!datos || datos.length == 0 ){
        return null;
      }

      for (let obj of this.docentes){
        if (obj.correoDocente == f.correo && obj.passDocente == f.password){
          a = 1;
          console.log('ingresado');
          localStorage.setItem('ingresado','true');
          this.NavController.navigateRoot('home');
        }
      }
      console.log(a);
      if (a == 0){
        this.alertMsg();
      }
    });
  }
  async alertMsg(){
    const alert = await this.alertController.create({
      header: 'Error...',
      message: 'Los datos no son correctos',
      buttons: ['Aceptar']
    });
      await alert.present();
      return;
  }


  //REGISTRO DOCENTES
  async crearDocente(){
    var form = this.formularioRegistro.value;
    if (this.formularioRegistro.invalid){
      this.alertMsg();
    }else{
      this.newDocente.nombreDocente = form.nombre,
      this.newDocente.correoDocente = form.correo,
      this.newDocente.passDocente = form.password,
      this.newDocente.repassDocente = form.repass,
      this.registroDocente.addDocente(this.newDocente).then(dato =>{
        this.newDocente = <Docente>{};
        console.log('Estudiante agregado');
      })
    }
  }


}