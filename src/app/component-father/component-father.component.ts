import { Component } from '@angular/core';
import { ComponentChildrenComponent } from "./component-children/component-children.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-component-father',
  imports: [ComponentChildrenComponent, FormsModule],
  templateUrl: './component-father.component.html',
  styleUrl: './component-father.component.scss'
})
export class ComponentFatherComponent {
  title = 'Message Father';
  message = 'Message from father to children';

  name = 'Juanito';

  messageFromChildren = '';

  messageFromChildrenOutput = '';

  messageOutput(message: string) {
    console.log('HOLA MUNDO ->', message);
    this.messageFromChildren = message;
  }

  messageOutputSignal(message: string) {
    console.log('HOLA MUNDO ->', message);
    this.messageFromChildrenOutput = message;

    console.log('HOLA MUNDO 2 ->', this.messageFromChildrenOutput);
  }
}
