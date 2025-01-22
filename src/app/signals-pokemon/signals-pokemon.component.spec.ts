import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalsPokemonComponent } from './signals-pokemon.component';

describe('SignalsPokemonComponent', () => {
  let component: SignalsPokemonComponent;
  let fixture: ComponentFixture<SignalsPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalsPokemonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalsPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
