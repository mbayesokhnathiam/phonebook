import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerContactComponent } from './creer-contact.component';

describe('CreerContactComponent', () => {
  let component: CreerContactComponent;
  let fixture: ComponentFixture<CreerContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreerContactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreerContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
