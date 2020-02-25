import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'sr-case',
        loadChildren: () => import('./sr-case/sr-case.module').then(m => m.QmMigrationSRCaseModule)
      },
      {
        path: 'engineer',
        loadChildren: () => import('./engineer/engineer.module').then(m => m.QmMigrationEngineerModule)
      },
      {
        path: 'schedule',
        loadChildren: () => import('./schedule/schedule.module').then(m => m.QmMigrationScheduleModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class QmMigrationEntityModule {}
