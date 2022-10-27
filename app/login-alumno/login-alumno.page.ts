import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

import { RegistrarService } from '../services/registrar.service';

@Component({
  selector: 'app-login-alumno',
  templateUrl: './login-alumno.page.html',
  styleUrls: ['./login-alumno.page.scss'],
})
export class LoginAlumnoPage implements OnInit {

  formularioLogin : FormGroup;
  formularioRegistro : FormGroup;

  constructor(
              private app : AppComponent,
              private registroUsuario: RegistrarService,
              private fb: FormBuilder)
              {
                this.formularioLogin = this.fb.group({
                  'correo' : new FormControl("", Validators.required),
                  'password': new FormControl("", Validators.required),
                });
              }

  ngOnInit() {
  }
  ionViewWillEnter() {
    localStorage.setItem('type', 'true');
  }


  // LOGIN DOCENTES
  async ingresar(){
    var f = this.formularioLogin.value;
    var a = 0;

    this.registroUsuario.getDatos().then(datos=>{
      if (!datos || datos.length == 0 ){
        return null;
      }

      for (let obj of datos){
        if ((obj.correo == f.correo && obj.pass == f.password) && obj.isAlumno == 'true'){
          a = 1;
          console.log('ingresado');
          localStorage.setItem('ingresado','true');
          localStorage.setItem('user', obj.nombre);
          this.app.navigate('home');
          break;
        }
      }
      console.log(a);
      if (a == 0){
        this.app.showToast('bottom', 'Correo o Contraseña INCORRECTOS', 2000);
      }
    });
  }
}