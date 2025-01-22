import { Component, inject, Input, input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormService } from '../../forms/form.service';

@Component({
    selector: 'app-create-edit',
    imports: [FormsModule, ReactiveFormsModule],
    templateUrl: './create-edit.component.html',
    styleUrl: './create-edit.component.scss'
})
export class CreateEditComponent {
  @Input() id: number | undefined;
  private readonly fb = inject(FormBuilder);
  private readonly activeModal = inject(NgbActiveModal);
  private readonly formsService = inject(FormService);
  formPhoto!: FormGroup;

  ngOnInit(): void {
    this.initFormPhoto();

    const idPhoto = this.id;
    if (idPhoto) {
      this.formsService.getPhotoById(idPhoto).subscribe((photo) => {
        this.formPhoto.patchValue(photo);
      });
    }
  }

  initFormPhoto() {
    this.formPhoto = this.fb.group({
      albumId: [null],
      title: [null, Validators.required],
      url: [null, Validators.required],
      thumbnailUrl: [null, Validators.required],
    });
  }

  save() {
    const value = this.formPhoto.value;
    if (!this.id) {
      this.formsService.addPhoto(value).subscribe(() => {
        this.activeModal.close('Save click');
      });
    } else {
      // SERVICIO DEL UPDATE
    }
   
  }

  close() {
    this.activeModal.close('Save click');
  }
}
