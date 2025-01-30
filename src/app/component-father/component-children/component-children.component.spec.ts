import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentChildrenComponent } from './component-children.component';

describe('ComponentChildrenComponent', () => {
  let component: ComponentChildrenComponent;
  let fixture: ComponentFixture<ComponentChildrenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentChildrenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
