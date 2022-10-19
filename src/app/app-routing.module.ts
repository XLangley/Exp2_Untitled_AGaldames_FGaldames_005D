import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { IngresadoGuard } from './guards/ingresado.guard';
import { NoIngresadoGuard } from './guards/no-ingresado.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login-alumno',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'login-alumno',
    loadChildren: () => import('./login-alumno/login-alumno.module').then( m => m.LoginAlumnoPageModule),
    canActivate: [NoIngresadoGuard]
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./recuperar/recuperar.module').then( m => m.RecuperarPageModule),
    canActivate: [NoIngresadoGuard]
  },
  {
    path: 'login-docente',
    loadChildren: () => import('./login-docente/login-docente.module').then( m => m.LoginDocentePageModule),
    canActivate: [NoIngresadoGuard]
  },
  {
    path: 'generar-qr',
    loadChildren: () => import('./generar-qr/generar-qr.module').then( m => m.GenerarQrPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'horario',
    loadChildren: () => import('./horario/horario.module').then( m => m.HorarioPageModule),
    canActivate: [IngresadoGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
