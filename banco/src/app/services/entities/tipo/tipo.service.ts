import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from 'src/app/services/api/api.service';
import { ITipo } from '../../../shared/model/tipo.model';

type EntityResponseType = HttpResponse<ITipo>;
type EntityArrayResponseType = HttpResponse<ITipo[]>;
let auth = JSON.parse(localStorage.getItem('user'))
let token = auth.token
@Injectable({ providedIn: 'root' })
export class TipoService {
  public resourceUrl = ApiService.API_URL + '/type_account';

  constructor(protected http: HttpClient) {}

  create(tipo: ITipo): Observable<EntityResponseType> {
    return this.http.post<ITipo>(this.resourceUrl, tipo, { observe: 'response' });
  }

  update(tipo: ITipo): Observable<EntityResponseType> {
    return this.http.put<ITipo>(this.resourceUrl, tipo, { observe: 'response' });
  }

  find(): Observable<EntityResponseType> {
    return this.http.get<ITipo>(`${this.resourceUrl}/getAll`, { headers: { 'Authorization': `${token}` },observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
