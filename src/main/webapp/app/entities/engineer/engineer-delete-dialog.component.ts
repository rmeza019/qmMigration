import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEngineer } from 'app/shared/model/engineer.model';
import { EngineerService } from './engineer.service';

@Component({
  templateUrl: './engineer-delete-dialog.component.html'
})
export class EngineerDeleteDialogComponent {
  engineer?: IEngineer;

  constructor(protected engineerService: EngineerService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.engineerService.delete(id).subscribe(() => {
      this.eventManager.broadcast('engineerListModification');
      this.activeModal.close();
    });
  }
}
