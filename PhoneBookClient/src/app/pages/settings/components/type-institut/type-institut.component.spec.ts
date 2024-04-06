import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeInstitutComponent } from './type-institut.component';

describe('TypeInstitutComponent', () => {
  let component: TypeInstitutComponent;
  let fixture: ComponentFixture<TypeInstitutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeInstitutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypeInstitutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
