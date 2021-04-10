import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenTransaccionPageRoutingModule } from './resumen-transaccion-routing.module';

import { ResumenTransaccionPage } from './resumen-transaccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResumenTransaccionPageRoutingModule
  ],
  declarations: [ResumenTransaccionPage]
})
export class ResumenTransaccionPageModule {}
