import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

import { ApiService } from 'src/app/services/api/api.service';
import { ITransferencia } from '../../../shared/model/tranferencia.model';

type EntityResponseType = HttpResponse< ITransferencia>;
type EntityArrayResponseType = HttpResponse< ITransferencia[]>;
let auth = JSON.parse(localStorage.getItem('user'))
let token = auth.token

@Injectable({
  providedIn: 'root'
})
export class TransferenciasService {
  public resourceUrl = ApiService.API_URL + '/transaccion';
  constructor(protected http: HttpClient) { }

  create(transferencia: ITransferencia): Observable<EntityResponseType> {
 /*    const copy = this.convertDateFromClient(cuenta); */
    return this.http
      .post<ITransferencia>(`${this.resourceUrl}/create`, transferencia, {headers: { 'Authorization': `${token}` }, observe: 'response' })
    /*   .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res))); */
      
  }
  findByIdAcoountHistory(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITransferencia>(`${this.resourceUrl}/findByIdAcoountHistory/${id}`, { headers: { 'Authorization': `${token}` },observe: 'response' })
     // .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }
  /* protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaCuenta = res.body.fechaCuenta != null ? moment(res.body.fechaCuenta) : null;
    }
    return res;
  } */
}
