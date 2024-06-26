import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriaSearchComponent } from './criteria-search.component';

describe('CriteriaSearchComponent', () => {
  let component: CriteriaSearchComponent;
  let fixture: ComponentFixture<CriteriaSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriteriaSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriteriaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
