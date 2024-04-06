import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeNodeVilleComponent } from './tree-node-ville.component';

describe('TreeNodeVilleComponent', () => {
  let component: TreeNodeVilleComponent;
  let fixture: ComponentFixture<TreeNodeVilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeNodeVilleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TreeNodeVilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
