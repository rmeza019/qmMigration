import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEngineer } from 'app/shared/model/engineer.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { EngineerService } from './engineer.service';
import { EngineerDeleteDialogComponent } from './engineer-delete-dialog.component';

@Component({
  selector: 'jhi-engineer',
  templateUrl: './engineer.component.html'
})
export class EngineerComponent implements OnInit, OnDestroy {
  engineers: IEngineer[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected engineerService: EngineerService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.engineers = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.engineerService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IEngineer[]>) => this.paginateEngineers(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.engineers = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEngineers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEngineer): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEngineers(): void {
    this.eventSubscriber = this.eventManager.subscribe('engineerListModification', () => this.reset());
  }

  delete(engineer: IEngineer): void {
    const modalRef = this.modalService.open(EngineerDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.engineer = engineer;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateEngineers(data: IEngineer[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.engineers.push(data[i]);
      }
    }
  }
}
