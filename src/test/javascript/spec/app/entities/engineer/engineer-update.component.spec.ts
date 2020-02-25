import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { QmMigrationTestModule } from '../../../test.module';
import { EngineerUpdateComponent } from 'app/entities/engineer/engineer-update.component';
import { EngineerService } from 'app/entities/engineer/engineer.service';
import { Engineer } from 'app/shared/model/engineer.model';

describe('Component Tests', () => {
  describe('Engineer Management Update Component', () => {
    let comp: EngineerUpdateComponent;
    let fixture: ComponentFixture<EngineerUpdateComponent>;
    let service: EngineerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [QmMigrationTestModule],
        declarations: [EngineerUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EngineerUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EngineerUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EngineerService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Engineer(123);
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
        const entity = new Engineer();
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
