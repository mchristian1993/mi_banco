import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from 'src/app/services/api/api.service';
import { IBanco } from '../../../shared/model/banco.model';

type EntityResponseType = HttpResponse<IBanco>;
type EntityArrayResponseType = HttpResponse<IBanco[]>;
let auth = JSON.parse(localStorage.getItem('user'))
let token = auth.token
@Injectable({ providedIn: 'root' })
export class BancoService {
  public resourceUrl = ApiService.API_URL + '/bank';

  constructor(protected http: HttpClient) {}

  create(banco: IBanco): Observable<EntityResponseType> {
    return this.http.post<IBanco>(this.resourceUrl, banco, { observe: 'response' });
  }

  update(banco: IBanco): Observable<EntityResponseType> {
    return this.http.put<IBanco>(this.resourceUrl, banco, { observe: 'response' });
  }

  find(): Observable<EntityResponseType> {
    return this.http.get<IBanco>(`${this.resourceUrl}/getAll`, { headers: { 'Authorization': `${token}` },observe: 'response' });
  }

 
  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
