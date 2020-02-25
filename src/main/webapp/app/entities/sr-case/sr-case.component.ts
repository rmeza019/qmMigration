import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISRCase } from 'app/shared/model/sr-case.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { SRCaseService } from './sr-case.service';
import { SRCaseDeleteDialogComponent } from './sr-case-delete-dialog.component';

@Component({
  selector: 'jhi-sr-case',
  templateUrl: './sr-case.component.html'
})
export class SRCaseComponent implements OnInit, OnDestroy {
  sRCases: ISRCase[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected sRCaseService: SRCaseService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.sRCases = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.sRCaseService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<ISRCase[]>) => this.paginateSRCases(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.sRCases = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSRCases();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISRCase): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSRCases(): void {
    this.eventSubscriber = this.eventManager.subscribe('sRCaseListModification', () => this.reset());
  }

  delete(sRCase: ISRCase): void {
    const modalRef = this.modalService.open(SRCaseDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.sRCase = sRCase;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateSRCases(data: ISRCase[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.sRCases.push(data[i]);
      }
    }
  }
}
