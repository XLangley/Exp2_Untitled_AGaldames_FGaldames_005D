import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MetroPageRoutingModule } from './metro-routing.module';

import { MetroPage } from './metro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MetroPageRoutingModule
  ],
  declarations: [MetroPage]
})
export class MetroPageModule {}
