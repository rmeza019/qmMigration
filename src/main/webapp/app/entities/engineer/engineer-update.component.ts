import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEngineer, Engineer } from 'app/shared/model/engineer.model';
import { EngineerService } from './engineer.service';

@Component({
  selector: 'jhi-engineer-update',
  templateUrl: './engineer-update.component.html'
})
export class EngineerUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    engMail: [null, [Validators.required]],
    engName: [null, [Validators.required]],
    engLastName: [null, [Validators.required]]
  });

  constructor(protected engineerService: EngineerService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ engineer }) => {
      this.updateForm(engineer);
    });
  }

  updateForm(engineer: IEngineer): void {
    this.editForm.patchValue({
      id: engineer.id,
      engMail: engineer.engMail,
      engName: engineer.engName,
      engLastName: engineer.engLastName
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const engineer = this.createFromForm();
    if (engineer.id !== undefined) {
      this.subscribeToSaveResponse(this.engineerService.update(engineer));
    } else {
      this.subscribeToSaveResponse(this.engineerService.create(engineer));
    }
  }

  private createFromForm(): IEngineer {
    return {
      ...new Engineer(),
      id: this.editForm.get(['id'])!.value,
      engMail: this.editForm.get(['engMail'])!.value,
      engName: this.editForm.get(['engName'])!.value,
      engLastName: this.editForm.get(['engLastName'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEngineer>>): void {
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
}
