import { Component, computed, effect, signal } from '@angular/core';

interface Tarea {
  id: number;
  descripcion: string;
  completada: boolean;
}

@Component({
  selector: 'app-signals-tasks',
  standalone: true,
  imports: [],
  templateUrl: './signals-tasks.component.html',
  styleUrl: './signals-tasks.component.scss'
})
export class SignalsTasksComponent {
  // Signal que mantiene la lista de tareas
  tareas = signal<Tarea[]>([]);

  // Signal para el filtro actual
  filtroActual = signal<'todas' | 'completadas' | 'pendientes'>('todas');

  // Signal computado que filtra las tareas según el filtro actual
  tareasFiltradas = computed(() => {
    switch (this.filtroActual()) {
      case 'completadas':
        return this.tareas().filter(t => t.completada);
      case 'pendientes':
        return this.tareas().filter(t => !t.completada);
      default:
        return this.tareas();
    }
  });

  // Efecto para mostrar en consola las tareas cada vez que cambian
  constructor() {
    effect(() => {
      console.log('Tareas actuales:', this.tareas());
    });
  }

  // Método para agregar una nueva tarea
  agregarTarea(descripcion: string) {
    const nuevaTarea: Tarea = {
      id: Date.now(),
      descripcion,
      completada: false
    };
    this.tareas.update(tareas => [...tareas, nuevaTarea]);
  }

  // Método para marcar una tarea como completada
  toggleCompletada(id: number) {
    this.tareas.update(tareas =>
      tareas.map(t =>
        t.id === id ? { ...t, completada: !t.completada } : t
      )
    );
  }

  // Método para cambiar el filtro actual
  cambiarFiltro(filtro: 'todas' | 'completadas' | 'pendientes') {
    this.filtroActual.set(filtro);
  }
}
