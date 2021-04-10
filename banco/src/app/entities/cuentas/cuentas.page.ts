import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { BancoService } from 'src/app/services/entities/banco/banco.service';
import { CuentaService } from 'src/app/services/entities/cuenta/cuenta.service';
import { TipoService } from 'src/app/services/entities/tipo/tipo.service';
import { Cuenta, ICuenta } from 'src/app/shared/model/cuenta.model';
import { Observable } from 'rxjs';
import { ITipo, Tipo } from 'src/app/shared/model/tipo.model';
import { Banco, IBanco } from 'src/app/shared/model/banco.model';
import { NavController, ModalController, LoadingController, Platform } from '@ionic/angular';
@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.page.html',
  styleUrls: ['./cuentas.page.scss'],
})
export class CuentasPage implements OnInit {
  bancos: any;
  tipos: any;
  cuenta: ICuenta;
  cuentas:any
  account
  isSaving: boolean;
  segmentTab: string = "cuentas";

  constructor(
    private fb: FormBuilder,
    private bancoService: BancoService,
    private tipoService: TipoService,
    private cuentaService: CuentaService,
    public navController: NavController) { }

  ngOnInit() {
    this.account = JSON.parse(localStorage.getItem('user'))
    this.cuentaService.findCuentasByUser(this.account.id).subscribe(succesCuentas=>{
      console.log('cuentas',succesCuentas.body)
      this.cuentas=succesCuentas.body
    },error=>{
      console.log(error);
      
    })

    this.bancoService.find().subscribe(succesBanco => {
      this.bancos = succesBanco.body
    }, error => {
      console.log("erros", error);
    })
    this.tipoService.find().subscribe(succesTipo => {
      this.tipos = succesTipo.body
    }, error => {
      console.log("ettor", error);

    })

  }



  editForm = this.fb.group({
    id: [],
    numerCuenta: [],
    aliasCuenta: [],
    saldoCuenta: [],
    monedaCuenta: [],
    descripcion: [],
    user: [],
    tipocuenta: [],
    tipoNombreBanco: []
  });

  updateForm(cuenta: ICuenta) {
    this.editForm.patchValue({
      id: cuenta.id,
      numerCuenta: cuenta.numerCuenta,
      aliasCuenta: cuenta.aliasCuenta,
      saldoCuenta: cuenta.saldoCuenta,
      monedaCuenta: cuenta.monedaCuenta,
      descripcion: cuenta.descripcion,
      user: cuenta.user,
      tipocuenta: cuenta.tipocuenta,
      tipoNombreBanco: cuenta.tipoNombreBanco
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const cuenta = this.createFromForm();
    if (cuenta.id !== undefined) {
      this.subscribeToSaveResponse(this.cuentaService.update(cuenta));
    } else {
      this.subscribeToSaveResponse(this.cuentaService.create(cuenta));
    }
  }

  private createFromForm(): ICuenta {
    const entity = {
      ...new Cuenta(),
      numerCuenta: this.editForm.get(['numerCuenta']).value,
      aliasCuenta: this.editForm.get(['aliasCuenta']).value,
      saldoCuenta: this.editForm.get(['saldoCuenta']).value,
      monedaCuenta: this.editForm.get(['monedaCuenta']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      user: this.account,
      tipocuenta: this.editForm.get(['tipocuenta']).value,
      tipoNombreBanco: this.editForm.get(['tipoNombreBanco']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICuenta>>) {
    result.subscribe((res: HttpResponse<ICuenta>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }

  trackTipoById(index: number, item: ITipo) {
    return item.id;
  }

  trackBancoById(index: number, item: IBanco) {

    return item.id;
  }

  compareTipo(first: Tipo, second: Tipo): boolean {
    return first && first.id && second && second.id ? first.id === second.id : first === second;
  }
  compareBanco(first: Banco, second: Banco): boolean {
    return first && first.id && second && second.id ? first.id === second.id : first === second;
  }

  segmentChanged(event: any) {
    this.segmentTab = event.detail.value;
  }
  cuentasAsociadas(idCuenta){

    this.navController.navigateBack(`/historial/${idCuenta}`)
  }
}
