import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginDocentePage } from './login-docente.page';

const routes: Routes = [
  {
    path: '',
    component: LoginDocentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginDocentePageRoutingModule {}
