import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISRCase } from 'app/shared/model/sr-case.model';

@Component({
  selector: 'jhi-sr-case-detail',
  templateUrl: './sr-case-detail.component.html'
})
export class SRCaseDetailComponent implements OnInit {
  sRCase: ISRCase | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sRCase }) => {
      this.sRCase = sRCase;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
