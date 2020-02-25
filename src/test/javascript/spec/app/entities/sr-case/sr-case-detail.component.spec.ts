import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { QmMigrationTestModule } from '../../../test.module';
import { SRCaseDetailComponent } from 'app/entities/sr-case/sr-case-detail.component';
import { SRCase } from 'app/shared/model/sr-case.model';

describe('Component Tests', () => {
  describe('SRCase Management Detail Component', () => {
    let comp: SRCaseDetailComponent;
    let fixture: ComponentFixture<SRCaseDetailComponent>;
    const route = ({ data: of({ sRCase: new SRCase(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [QmMigrationTestModule],
        declarations: [SRCaseDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SRCaseDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SRCaseDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load sRCase on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.sRCase).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
