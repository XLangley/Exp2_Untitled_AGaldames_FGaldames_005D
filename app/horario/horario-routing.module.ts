import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HorarioPage } from './horario.page';

const routes: Routes = [
  {
    path: '',
    component: HorarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HorarioPageRoutingModule {}
