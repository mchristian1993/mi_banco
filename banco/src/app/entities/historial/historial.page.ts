import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {  ITransferencia} from 'src/app/shared/model/tranferencia.model';

import { TransferenciasService } from 'src/app/services/entities/transferencias/transferencias.service';
import { NavController, ModalController, LoadingController, Platform } from '@ionic/angular';
@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
idCuenta
historial:any
  constructor(private route: ActivatedRoute,  public navController: NavController, 
    public loadingController: LoadingController,
    private transferenciasService: TransferenciasService) { }

  ngOnInit() {
    this.idCuenta = this.route.snapshot.paramMap.get("id")

    this. transferenciasService.findByIdAcoountHistory(this.idCuenta).subscribe(succesCuentas=>{
      console.log('cuentas',succesCuentas.body)
      this.historial=succesCuentas.body
    },error=>{
      console.log(error);
      
    })
  }

}
