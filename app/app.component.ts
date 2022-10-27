import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, AlertController, ToastController, LoadingController} from '@ionic/angular';

interface Componente{
  icon: string;
  name: string;
  redirecTo: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements OnInit{
  
  public loadingSpinner: any;
  
  constructor
  (
    private menu: MenuController,
    private navController : NavController,
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingController: LoadingController,
  ) {}

  openMenu() {
    this.menu.open('first');
  }

  //se ejecutan en el HTML
  menuWillOpen(){
    const toolbar = document.getElementById('toolbar');
    const item = document.getElementById('HORARIO');

    if (localStorage.getItem('type') == 'true') {
      toolbar?.classList.add('bg-toolbar-alumno');

      //se agrega item HORARIO que es propio de los estudiantes
      item!.hidden = false;
      
    } else {
      item!.hidden = true;
      toolbar?.classList.add('bg-toolbar-docente');
    }
  }

  //se ejecutan en el HTML
  menuClosed(){
    const toolbar = document.getElementById('toolbar');
    toolbar?.classList.remove('bg-toolbar-alumno');
    toolbar?.classList.remove('bg-toolbar-docente');
    
  }

  
  ngOnInit() {
    const toggle = document.querySelector('#themeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    toggle!.setAttribute('checked', prefersDark.matches.toString());
    document.body.classList.toggle('dark', prefersDark.matches);
  }

  

  toggleTheme(event){
    document.body.classList.toggle('dark', event.detail.checked);
  }

  Logout(){
    localStorage.setItem('ingresado','false');
    localStorage.removeItem('user');
    
    if (localStorage.getItem('type') == 'true') {
      this.navigate('login-alumno');
    }else{
      this.navigate('login-docente');
    }
  }

  async alertMsg(message){
    const alert = await this.alertController.create({
      header: 'Error...',
      message: message,
      cssClass: 'custom-alert',
      buttons: ['Aceptar'],
    });
    await alert.present();
    return;
  }

  async showToast(position: 'top' | 'middle' | 'bottom', message:string, duration:number) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: position,
      cssClass: 'custom-toast',
      buttons: [
        {
          text: '⨉',
          role: 'cancel'
        }
      ],
    });

    await toast.present();
  }

  
  async loading(option: 'show' | 'hide'){
    if (option == 'show') {
      this.loadingSpinner = await this.loadingController.create({
        message: 'Espere un momento...',
        spinner: 'crescent',
        cssClass: 'custom-loading'
      });
  
      await this.loadingSpinner.present();

    }else{
      setTimeout(() => {
        this.loadingSpinner.dismiss();
      }, 1000);
    }

  }

  navigate(route:string){
    this.navController.navigateRoot('/'+route);
  }

  
  
}

