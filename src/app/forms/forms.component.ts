import { Component, inject, signal, TemplateRef, WritableSignal } from '@angular/core';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormService } from './form.service';
import { Photo } from './photo.interface';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateEditComponent } from '../form/create-edit/create-edit.component';

@Component({
    selector: 'app-forms',
    imports: [],
    templateUrl: './forms.component.html',
    styleUrl: './forms.component.scss'
})
export class FormsComponent {
  private readonly formService = inject(FormService);

  private modalService = inject(NgbModal);
  closeResult: WritableSignal<string> = signal('');

  
  photos: Photo[] = [];

  ngOnInit(): void {
    this.loadPhotos();
  }

  loadPhotos() {
    this.formService.getPhotos().subscribe((photos) => {
      this.photos = photos;
    });
  }

  open(id?: number) {
		const modalRef = this.modalService.open(CreateEditComponent, { ariaLabelledBy: 'modal-basic-title' });

    if (id) {
      console.log('ID', id);
      modalRef.componentInstance.id = id;
    }

    modalRef.result.then((result) => {
      console.log('CERRO CON EXITO', result);
    });
	}

  editData(id: number) {
    console.log('Edit', id);
    this.open(id);
  }
}
