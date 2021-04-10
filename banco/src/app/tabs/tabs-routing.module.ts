import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('../home/home-routing.module').then( m => m.HomePageRoutingModule)
          },
        ],
      },
      {
        path: 'cuentas',
        loadChildren: () => import('../entities/cuentas/cuentas.module').then( m => m.CuentasPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../entities/perfil/perfil.module').then( m => m.PerfilPageModule)
      },
      {
        path: 'perfil-creats',
        loadChildren: () => import('./../perfil-creats/perfil-creats.module').then( m => m.PerfilCreatsPageModule)
      },
      
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes),CommonModule],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}