import { Component, OnInit } from '@angular/core';
import { AnimationController, Animation, MenuController } from '@ionic/angular';

export const enterAnimation = (baseEl: HTMLElement, opts?: any): Animation => {
  const duration = 300;

  const animationCtrl = new AnimationController();

  if (opts.direction == 'forward') {
    return animationCtrl.create()
    .addElement(opts.enteringEl)
    .duration(duration)
    .easing('ease-out')
    .fromTo('opacity', 0, 1);
  } else {
    const animacionRoot = animationCtrl.create()
    .addElement(opts.enteringEl)
    .duration(0)
    .fromTo('opacity', 0, 1);
    
    const animacionSalida = animationCtrl.create()
    .addElement(opts.leavingEl)
    .duration(duration)
    .easing('ease-out')
    .fromTo('opacity', 1, 0);

    return animationCtrl.create().addAnimation([animacionRoot, animacionSalida]);
  }
}

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
  public static isAlumno = true;
  
  constructor(private menu: MenuController) {}

  componentes: Componente[]=[
    {
      icon:'home',
      name: 'INICIO',
      redirecTo:'/home'
    },
    {
      icon:'calendar',
      name: 'HORARIO',
      redirecTo:'/horario'
    },
    {
      icon:'log-out-outline',
      name: 'CERRAR SESIÓN',
      redirecTo:'/login-alumno'
    },
  ]

  openMenu() {
    this.menu.open('first');
  }

  checkMenuColor(){
    const toolbar = document.getElementById('toolbar');

    if (AppComponent.isAlumno) {
      toolbar?.classList.add('bg-toolbar-alumno');
    } else {
      toolbar?.classList.add('bg-toolbar-docente');
    }
  }

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

  
  
}

