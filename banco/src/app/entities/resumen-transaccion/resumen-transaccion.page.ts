import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {  ITransferencia} from 'src/app/shared/model/tranferencia.model';
import { TransferenciasService } from 'src/app/services/entities/transferencias/transferencias.service';
import { NavController, ModalController, LoadingController, Platform } from '@ionic/angular';
@Component({
  selector: 'app-resumen-transaccion',
  templateUrl: './resumen-transaccion.page.html',
  styleUrls: ['./resumen-transaccion.page.scss'],
})
export class ResumenTransaccionPage implements OnInit {
  valor
  destination_account
  isSaving: boolean;
  root_account
  dataTransfer: {}
  constructor(private route: ActivatedRoute, 
    public navController: NavController, 
    public loadingController: LoadingController,
    private transferenciasService: TransferenciasService ) { }

  ngOnInit() {


    this.valor = this.route.snapshot.paramMap.get("v")
    this.destination_account = this.route.snapshot.paramMap.get("da")
    this.root_account = this.route.snapshot.paramMap.get("rc")

    this.dataTransfer = {
      valor: this.valor,
      destination_account: this.destination_account,
      root_account: this.root_account
    }

 

  }

  async createTransfer(){
    const loading = await this.loadingController.create({
      message: 'Cargando, por favor espere',
      duration: 12000,
    });
    loading.present();
    console.log(this.dataTransfer)
    this.subscribeToSaveResponse(this.transferenciasService.create(this.dataTransfer));
    loading.dismiss();
    
  }


  protected subscribeToSaveResponse(result: Observable<HttpResponse< ITransferencia>>) {
    result.subscribe((res: HttpResponse< ITransferencia>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }
  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }
  protected onSaveError() {
    this.isSaving = false;
  }

  previousState() {
    window.history.back();
  }


}
