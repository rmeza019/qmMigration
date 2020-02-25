import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { QmMigrationTestModule } from '../../../test.module';
import { EngineerDetailComponent } from 'app/entities/engineer/engineer-detail.component';
import { Engineer } from 'app/shared/model/engineer.model';

describe('Component Tests', () => {
  describe('Engineer Management Detail Component', () => {
    let comp: EngineerDetailComponent;
    let fixture: ComponentFixture<EngineerDetailComponent>;
    const route = ({ data: of({ engineer: new Engineer(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [QmMigrationTestModule],
        declarations: [EngineerDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EngineerDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EngineerDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load engineer on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.engineer).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
