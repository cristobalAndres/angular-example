import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Input, output, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-component-children',
  imports: [FormsModule, CommonModule],
  templateUrl: './component-children.component.html',
  styleUrl: './component-children.component.scss'
})
export class ComponentChildrenComponent {
  @Input() title: string = '';
  @Input() message: string = '';

  @Output() newItemEvent = new EventEmitter<string>();

  name = input<string>();
  eventOutput = output<string>();

  sendMessageToFather(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.newItemEvent.emit(value ? value : 'Message from children to father');
  }

  sendMessageToFatherSignal() {
    this.eventOutput.emit('Message from children to father');
  }
}
