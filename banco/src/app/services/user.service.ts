import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from '../shared/util/request-util';
import { User, } from '../services/user/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  public resourceUrl = ApiService.API_URL + '/users';

  constructor(private http: HttpClient) { }

  create(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(this.resourceUrl, user, { observe: 'response' });
  }

  update(user: User): Observable<HttpResponse<User>> {
    return this.http.put<User>(this.resourceUrl, user, { observe: 'response' });
  }

  find(login: string): Observable<HttpResponse<User>> {
    return this.http.get<User>(`${this.resourceUrl}/${login}`, { observe: 'response' });
  }

  query(req?: any): Observable<HttpResponse<User[]>> {
    const options = createRequestOption(req);
    return this.http.get<User[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(login: string): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.resourceUrl}/${login}`, { observe: 'response' });
  }

  authorities(): Observable<string[]> {
    return this.http.get<string[]>(ApiService.API_URL + 'api/users/authorities');
  }
}
