import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeNodeInstitutComponent } from './tree-node-institut.component';

describe('TreeNodeInstitutComponent', () => {
  let component: TreeNodeInstitutComponent;
  let fixture: ComponentFixture<TreeNodeInstitutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeNodeInstitutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TreeNodeInstitutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
