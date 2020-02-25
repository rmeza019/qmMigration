import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISRCase } from 'app/shared/model/sr-case.model';

type EntityResponseType = HttpResponse<ISRCase>;
type EntityArrayResponseType = HttpResponse<ISRCase[]>;

@Injectable({ providedIn: 'root' })
export class SRCaseService {
  public resourceUrl = SERVER_API_URL + 'api/sr-cases';

  constructor(protected http: HttpClient) {}

  create(sRCase: ISRCase): Observable<EntityResponseType> {
    return this.http.post<ISRCase>(this.resourceUrl, sRCase, { observe: 'response' });
  }

  update(sRCase: ISRCase): Observable<EntityResponseType> {
    return this.http.put<ISRCase>(this.resourceUrl, sRCase, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISRCase>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISRCase[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
