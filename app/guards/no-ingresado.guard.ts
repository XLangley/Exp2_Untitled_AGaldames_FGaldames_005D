import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class NoIngresadoGuard implements CanActivate {

  constructor(private nav : NavController){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (localStorage.getItem('ingresado')=='true'){
        this.nav.navigateRoot('home');
        return false;
      }
      else{
        return true;
      }
  }
  
}
