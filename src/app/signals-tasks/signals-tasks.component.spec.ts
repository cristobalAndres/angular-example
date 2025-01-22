import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalsTasksComponent } from './signals-tasks.component';

describe('SignalsTasksComponent', () => {
  let component: SignalsTasksComponent;
  let fixture: ComponentFixture<SignalsTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalsTasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalsTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
