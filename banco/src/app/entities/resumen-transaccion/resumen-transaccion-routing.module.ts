import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumenTransaccionPage } from './resumen-transaccion.page';

const routes: Routes = [
  {
    path: '',
    component: ResumenTransaccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumenTransaccionPageRoutingModule {}
