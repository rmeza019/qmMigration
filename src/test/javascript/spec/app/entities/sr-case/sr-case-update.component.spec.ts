import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { QmMigrationTestModule } from '../../../test.module';
import { SRCaseUpdateComponent } from 'app/entities/sr-case/sr-case-update.component';
import { SRCaseService } from 'app/entities/sr-case/sr-case.service';
import { SRCase } from 'app/shared/model/sr-case.model';

describe('Component Tests', () => {
  describe('SRCase Management Update Component', () => {
    let comp: SRCaseUpdateComponent;
    let fixture: ComponentFixture<SRCaseUpdateComponent>;
    let service: SRCaseService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [QmMigrationTestModule],
        declarations: [SRCaseUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SRCaseUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SRCaseUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SRCaseService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SRCase(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new SRCase();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
