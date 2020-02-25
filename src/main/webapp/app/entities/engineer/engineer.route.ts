import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEngineer, Engineer } from 'app/shared/model/engineer.model';
import { EngineerService } from './engineer.service';
import { EngineerComponent } from './engineer.component';
import { EngineerDetailComponent } from './engineer-detail.component';
import { EngineerUpdateComponent } from './engineer-update.component';

@Injectable({ providedIn: 'root' })
export class EngineerResolve implements Resolve<IEngineer> {
  constructor(private service: EngineerService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEngineer> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((engineer: HttpResponse<Engineer>) => {
          if (engineer.body) {
            return of(engineer.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Engineer());
  }
}

export const engineerRoute: Routes = [
  {
    path: '',
    component: EngineerComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'qmMigrationApp.engineer.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EngineerDetailComponent,
    resolve: {
      engineer: EngineerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'qmMigrationApp.engineer.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EngineerUpdateComponent,
    resolve: {
      engineer: EngineerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'qmMigrationApp.engineer.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EngineerUpdateComponent,
    resolve: {
      engineer: EngineerResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'qmMigrationApp.engineer.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
