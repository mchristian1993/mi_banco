import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PerfilCreatsPageRoutingModule } from './perfil-creats-routing.module';

import { PerfilCreatsPage } from './perfil-creats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilCreatsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PerfilCreatsPage]
})
export class PerfilCreatsPageModule {}
