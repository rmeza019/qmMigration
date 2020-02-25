import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ISRCase, SRCase } from 'app/shared/model/sr-case.model';
import { SRCaseService } from './sr-case.service';
import { IEngineer } from 'app/shared/model/engineer.model';
import { EngineerService } from 'app/entities/engineer/engineer.service';

@Component({
  selector: 'jhi-sr-case-update',
  templateUrl: './sr-case-update.component.html'
})
export class SRCaseUpdateComponent implements OnInit {
  isSaving = false;

  engineers: IEngineer[] = [];

  editForm = this.fb.group({
    id: [],
    srNumber: [null, [Validators.required]],
    severity: [null, [Validators.required, Validators.maxLength(1)]],
    type: [null, [Validators.required]],
    caseOwner: []
  });

  constructor(
    protected sRCaseService: SRCaseService,
    protected engineerService: EngineerService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sRCase }) => {
      this.updateForm(sRCase);

      this.engineerService
        .query()
        .pipe(
          map((res: HttpResponse<IEngineer[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IEngineer[]) => (this.engineers = resBody));
    });
  }

  updateForm(sRCase: ISRCase): void {
    this.editForm.patchValue({
      id: sRCase.id,
      srNumber: sRCase.srNumber,
      severity: sRCase.severity,
      type: sRCase.type,
      caseOwner: sRCase.caseOwner
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const sRCase = this.createFromForm();
    if (sRCase.id !== undefined) {
      this.subscribeToSaveResponse(this.sRCaseService.update(sRCase));
    } else {
      this.subscribeToSaveResponse(this.sRCaseService.create(sRCase));
    }
  }

  private createFromForm(): ISRCase {
    return {
      ...new SRCase(),
      id: this.editForm.get(['id'])!.value,
      srNumber: this.editForm.get(['srNumber'])!.value,
      severity: this.editForm.get(['severity'])!.value,
      type: this.editForm.get(['type'])!.value,
      caseOwner: this.editForm.get(['caseOwner'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISRCase>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IEngineer): any {
    return item.id;
  }
}
