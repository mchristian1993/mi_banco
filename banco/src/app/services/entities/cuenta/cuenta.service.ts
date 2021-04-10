import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

import { ApiService } from 'src/app/services/api/api.service';
import { ICuenta } from '../../../shared/model/cuenta.model';

type EntityResponseType = HttpResponse<ICuenta>;
type EntityArrayResponseType = HttpResponse<ICuenta[]>;
let auth = JSON.parse(localStorage.getItem('user'))
let token = auth.token
@Injectable({ providedIn: 'root' })
export class CuentaService {
  public resourceUrl = ApiService.API_URL + '/bank_account';

  constructor(protected http: HttpClient) {}

  create(cuenta: ICuenta): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cuenta);
    return this.http
      .post<ICuenta>(`${this.resourceUrl}/create`, copy, {headers: { 'Authorization': `${token}` }, observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(cuenta: ICuenta): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cuenta);
    return this.http
      .put<ICuenta>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICuenta>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }
  findCuentasByUser(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICuenta>(`${this.resourceUrl}/findById/${id}`, {headers: { 'Authorization': `${token}` }, observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }
  findCuentasByCuenta(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICuenta>(`${this.resourceUrl}?numerCuenta.equals=${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }


  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(cuenta: ICuenta): ICuenta {
    const copy: ICuenta = Object.assign({}, cuenta, {
      fechaCuenta: cuenta.fechaCuenta != null && cuenta.fechaCuenta.isValid() ? cuenta.fechaCuenta.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaCuenta = res.body.fechaCuenta != null ? moment(res.body.fechaCuenta) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((cuenta: ICuenta) => {
        cuenta.fechaCuenta = cuenta.fechaCuenta != null ? moment(cuenta.fechaCuenta) : null;
      });
    }
    return res;
  }
}
