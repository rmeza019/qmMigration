import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { QmMigrationSharedModule } from 'app/shared/shared.module';
import { EngineerComponent } from './engineer.component';
import { EngineerDetailComponent } from './engineer-detail.component';
import { EngineerUpdateComponent } from './engineer-update.component';
import { EngineerDeleteDialogComponent } from './engineer-delete-dialog.component';
import { engineerRoute } from './engineer.route';

@NgModule({
  imports: [QmMigrationSharedModule, RouterModule.forChild(engineerRoute)],
  declarations: [EngineerComponent, EngineerDetailComponent, EngineerUpdateComponent, EngineerDeleteDialogComponent],
  entryComponents: [EngineerDeleteDialogComponent]
})
export class QmMigrationEngineerModule {}
