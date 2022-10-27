import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

import { RegistrarService, Usuario } from '../services/registrar.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioLogin : FormGroup;
  formularioRegistro : FormGroup;
  usuarios : Usuario[];
  newUsuarios : Usuario = <Usuario>{};

  constructor
  (
    private app : AppComponent,
    private registroUsuario: RegistrarService,
    private fb: FormBuilder
  ) 
  {
    this.formularioRegistro = this.fb.group({
      'nombre' : new FormControl("", Validators.required),
      'correo': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      'repass': new FormControl("", Validators.required),
      'isAlumno': Boolean
    });
  }

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

  // REGISTRO USUARIO
  async crearUsuario(){
    var userExist = false;
    var form = this.formularioRegistro.value;
    if (this.formularioRegistro.invalid){
      this.app.alertMsg('Los datos son incorrectos');
    }else{
      if (form.password != form.repass) {
        this.app.alertMsg('La contraseña no es la misma');
      }else{
        this.newUsuarios.nombre   = form.nombre,
        this.newUsuarios.correo   = form.correo,
        this.newUsuarios.pass     = form.password,
        this.newUsuarios.repass   = form.repass,
        this.newUsuarios.isAlumno = AppComponent.isAlumno,

        this.registroUsuario.getDatos().then(datos=>{
          if (datos != null){
            for (let obj of datos){
              if (obj.correo == form.correo){
                this.app.showToast("bottom", 'ERROR: Usuario ya existe', 2000);
                userExist = true;
                break;
              }
            }
          }

          if (userExist == false) {
            console.log(userExist);
            this.registroUsuario.addUsuario(this.newUsuarios).then(dato => {
              this.newUsuarios = <Usuario>{};
              // console.log(AppComponent.isAlumno ? 'Estudiante Agregado' : 'Docente Agregado');
            });
    
            if (AppComponent.isAlumno) {
              this.app.showToast("bottom", '¡ALUMNO CREADO EXITOSAMENTE!', 2000);
              this.app.navigate('login-alumno');
            } else {
              this.app.showToast("bottom", '¡DOCENTE CREADO EXITOSAMENTE!', 2000);
              this.app.navigate('login-docente');
            }
          }
        });
      }
    }
  }


  async checkValid(option){
    var form = this.formularioRegistro.value;
    const repassInput = document.getElementById('repass');

    switch (option) {
      case 0:
        if (form.password != form.repass || form.repass == '') {
          repassInput?.setAttribute("aria-invalid", "true");
        } else {
          repassInput?.setAttribute("aria-invalid", "false");
        }
        break;
      case 1:
        repassInput?.removeAttribute("aria-invalid");
        break;
    }
  }
  
}
