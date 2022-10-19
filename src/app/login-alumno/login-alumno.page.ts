import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

import { AlertController, NavController,ToastController } from '@ionic/angular';
import { RegistrarAlumnoService, Estudiante } from '../services/registrar-alumno.service';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-login-alumno',
  templateUrl: './login-alumno.page.html',
  styleUrls: ['./login-alumno.page.scss'],
})
export class LoginAlumnoPage implements OnInit {

  formularioLogin : FormGroup;
  formularioRegistro : FormGroup;
  estudiantes :  Estudiante[];
  newEstudiante: Estudiante = <Estudiante>{};

  constructor(
              private toastController: ToastController,
              private alertController: AlertController,
              private NavController: NavController,
              private registroEstudiante: RegistrarAlumnoService,
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
    AppComponent.isAlumno = true;
  }


  // LOGIN ALUMNO
  async ingresar(){
    var f = this.formularioLogin.value;
    var a = 0;

    this.registroEstudiante.getDatos().then(datos=>{
      this.estudiantes = datos;
      if (!datos || datos.length == 0 ){
        return null;
      }

      for (let obj of this.estudiantes){
        if (obj.correoEstudiante == f.correo && obj.passEstudiante == f.password){
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

  // REGISTRO ESTUDIANTE

  async crearEstudiante(){
    var form = this.formularioRegistro.value;
    if (this.formularioRegistro.invalid){
      this.alertMsg();
    }else{
      this.newEstudiante.nombreEstudiante = form.nombre,
      this.newEstudiante.correoEstudiante = form.correo,
      this.newEstudiante.passEstudiante = form.password,
      this.newEstudiante.repassEstudiante = form.repass,
      this.registroEstudiante.addAlumno(this.newEstudiante).then(dato =>{
        this.newEstudiante = <Estudiante>{};
        console.log('Estudiante agregado');
      })
    }
  }


}