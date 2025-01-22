import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalsPokemonResourceComponent } from './signals-pokemon-resource.component';

describe('SignalsPokemonResourceComponent', () => {
  let component: SignalsPokemonResourceComponent;
  let fixture: ComponentFixture<SignalsPokemonResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalsPokemonResourceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalsPokemonResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
