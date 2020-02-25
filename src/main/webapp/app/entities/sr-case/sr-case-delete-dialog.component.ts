import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISRCase } from 'app/shared/model/sr-case.model';
import { SRCaseService } from './sr-case.service';

@Component({
  templateUrl: './sr-case-delete-dialog.component.html'
})
export class SRCaseDeleteDialogComponent {
  sRCase?: ISRCase;

  constructor(protected sRCaseService: SRCaseService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.sRCaseService.delete(id).subscribe(() => {
      this.eventManager.broadcast('sRCaseListModification');
      this.activeModal.close();
    });
  }
}
