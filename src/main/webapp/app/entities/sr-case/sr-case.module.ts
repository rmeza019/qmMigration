import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { QmMigrationSharedModule } from 'app/shared/shared.module';
import { SRCaseComponent } from './sr-case.component';
import { SRCaseDetailComponent } from './sr-case-detail.component';
import { SRCaseUpdateComponent } from './sr-case-update.component';
import { SRCaseDeleteDialogComponent } from './sr-case-delete-dialog.component';
import { sRCaseRoute } from './sr-case.route';

@NgModule({
  imports: [QmMigrationSharedModule, RouterModule.forChild(sRCaseRoute)],
  declarations: [SRCaseComponent, SRCaseDetailComponent, SRCaseUpdateComponent, SRCaseDeleteDialogComponent],
  entryComponents: [SRCaseDeleteDialogComponent]
})
export class QmMigrationSRCaseModule {}
