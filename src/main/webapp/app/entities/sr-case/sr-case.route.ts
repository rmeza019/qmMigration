import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISRCase, SRCase } from 'app/shared/model/sr-case.model';
import { SRCaseService } from './sr-case.service';
import { SRCaseComponent } from './sr-case.component';
import { SRCaseDetailComponent } from './sr-case-detail.component';
import { SRCaseUpdateComponent } from './sr-case-update.component';

@Injectable({ providedIn: 'root' })
export class SRCaseResolve implements Resolve<ISRCase> {
  constructor(private service: SRCaseService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISRCase> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((sRCase: HttpResponse<SRCase>) => {
          if (sRCase.body) {
            return of(sRCase.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SRCase());
  }
}

export const sRCaseRoute: Routes = [
  {
    path: '',
    component: SRCaseComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'qmMigrationApp.sRCase.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SRCaseDetailComponent,
    resolve: {
      sRCase: SRCaseResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'qmMigrationApp.sRCase.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SRCaseUpdateComponent,
    resolve: {
      sRCase: SRCaseResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'qmMigrationApp.sRCase.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SRCaseUpdateComponent,
    resolve: {
      sRCase: SRCaseResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'qmMigrationApp.sRCase.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
