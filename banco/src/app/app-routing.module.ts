import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Platform } from '@ionic/angular';
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./singup/singup.module').then( m => m.SingupPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'cuentas',
    loadChildren: () => import('./entities/cuentas/cuentas.module').then( m => m.CuentasPageModule)
  },
  {
    path: 'transferencias',
    loadChildren: () => import('./entities/transferencias/transferencias.module').then( m => m.TransferenciasPageModule)
  },
  {
    path: 'transaccion/:id',
    loadChildren: () => import('./entities/transaccion/transaccion.module').then( m => m.TransaccionPageModule)
  },
  {
    path: 'resumen-transaccion/:v/:da/:rc',
    loadChildren: () => import('./entities/resumen-transaccion/resumen-transaccion.module').then( m => m.ResumenTransaccionPageModule)
  },
 
  {
    path: 'historial/:id',
    loadChildren: () => import('./entities/historial/historial.module').then( m => m.HistorialPageModule)
  },
  {
    path: 'qr',
    loadChildren: () => import('./qr/qr.module').then( m => m.QrPageModule)
  },
 
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),CommonModule],
  providers:[Platform],
  exports: [RouterModule],
})
export class AppRoutingModule { }
