import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEngineer } from 'app/shared/model/engineer.model';

type EntityResponseType = HttpResponse<IEngineer>;
type EntityArrayResponseType = HttpResponse<IEngineer[]>;

@Injectable({ providedIn: 'root' })
export class EngineerService {
  public resourceUrl = SERVER_API_URL + 'api/engineers';

  constructor(protected http: HttpClient) {}

  create(engineer: IEngineer): Observable<EntityResponseType> {
    return this.http.post<IEngineer>(this.resourceUrl, engineer, { observe: 'response' });
  }

  update(engineer: IEngineer): Observable<EntityResponseType> {
    return this.http.put<IEngineer>(this.resourceUrl, engineer, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEngineer>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEngineer[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
