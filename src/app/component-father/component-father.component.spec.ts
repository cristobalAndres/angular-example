import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentFatherComponent } from './component-father.component';

describe('ComponentFatherComponent', () => {
  let component: ComponentFatherComponent;
  let fixture: ComponentFixture<ComponentFatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentFatherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentFatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
