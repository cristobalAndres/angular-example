import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeTestComponent } from './code-test.component';

describe('CodeTestComponent', () => {
  let component: CodeTestComponent;
  let fixture: ComponentFixture<CodeTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
