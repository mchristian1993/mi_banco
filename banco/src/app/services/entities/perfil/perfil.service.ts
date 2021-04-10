import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

import { ApiService } from 'src/app/services/api/api.service';
import { IPerfil } from '../../../shared/model/perfil.model';

type EntityResponseType = HttpResponse<IPerfil>;
type EntityArrayResponseType = HttpResponse<IPerfil[]>;
let auth = JSON.parse(localStorage.getItem('user'))
let token = auth.token
@Injectable({ providedIn: 'root' })
export class PerfilService {
  public resourceUrl = ApiService.API_URL + '/users';
  constructor(protected http: HttpClient) { }

  create(perfil: IPerfil): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(perfil);
    return this.http
      .post<IPerfil>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(perfil: IPerfil): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(perfil);
    return this.http
      .put<IPerfil>(`${this.resourceUrl}/update`, copy, {headers: { 'Authorization': `${token}` }, observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findByUser(user: number): Observable<HttpResponse<IPerfil>> {

    return this.http.get(`${this.resourceUrl}/findById/${user}`, { headers: { 'Authorization': `${token}` }, observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPerfil>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }


  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(perfil: IPerfil): IPerfil {
    const copy: IPerfil = Object.assign({}, perfil, {
      fechaNacimiento: perfil.fechaNacimiento != null && perfil.fechaNacimiento.isValid() ? perfil.fechaNacimiento.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaNacimiento = res.body.fechaNacimiento != null ? moment(res.body.fechaNacimiento) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((perfil: IPerfil) => {
        perfil.fechaNacimiento = perfil.fechaNacimiento != null ? moment(perfil.fechaNacimiento) : null;
      });
    }
    return res;
  }
}
