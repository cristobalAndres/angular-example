import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FintocComponent } from './fintoc.component';

describe('FintocComponent', () => {
  let component: FintocComponent;
  let fixture: ComponentFixture<FintocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FintocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FintocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
