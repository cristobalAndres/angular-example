import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  getOptions(): Observable<{ id: number; code: string }[]> {
    // Simulación de una petición HTTP
    return of([
      { id: 1, code: 'Opción 1' },
      { id: 2, code: 'Opción 2' },
      { id: 3, code: 'Opción 3' }
    ]);
  }
}
