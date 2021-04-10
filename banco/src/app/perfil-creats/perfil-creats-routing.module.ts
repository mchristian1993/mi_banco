import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { PerfilCreatsPage } from './perfil-creats.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilCreatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),ReactiveFormsModule],
  exports: [RouterModule],
})
export class PerfilCreatsPageRoutingModule {}
