import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { CuentaService } from 'src/app/services/entities/cuenta/cuenta.service';
import { NavController, ModalController, LoadingController, Platform } from '@ionic/angular';
@Component({
  selector: 'app-transferencias',
  templateUrl: './transferencias.page.html',
  styleUrls: ['./transferencias.page.scss'],
})
export class TransferenciasPage implements OnInit {
  cuentas:any
  account
  segmentTab: string = "transferencias";
  constructor(    private cuentaService: CuentaService,public navController: NavController) { }

  ngOnInit() {
    this.account = JSON.parse(localStorage.getItem('user'))
    this.cuentaService.findCuentasByUser(this.account.id).subscribe(succesCuentas=>{
      console.log('cuentas',succesCuentas.body)
      this.cuentas=succesCuentas.body
    },error=>{
      console.log(error);
      
    })
  }
  transferencias(id_account){
    this.navController.navigateForward(`/transaccion/${id_account}`)
  }

}
