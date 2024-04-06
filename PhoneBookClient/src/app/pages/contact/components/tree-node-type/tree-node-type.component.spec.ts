import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeNodeTypeComponent } from './tree-node-type.component';

describe('TreeNodeTypeComponent', () => {
  let component: TreeNodeTypeComponent;
  let fixture: ComponentFixture<TreeNodeTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeNodeTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TreeNodeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
