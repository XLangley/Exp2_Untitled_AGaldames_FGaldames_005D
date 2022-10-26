import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MetroPage } from './metro.page';

const routes: Routes = [
  {
    path: '',
    component: MetroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MetroPageRoutingModule {}
