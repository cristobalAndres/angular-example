import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Post } from '../models/post.interface';
import { CreatePostComponent } from './create-post/create-post.component';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-home',
    imports: [],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
  private modalService = inject(NgbModal);
  closeResult: WritableSignal<string> = signal('');
  posts = signal<Post[]>([]);

  open() {
    const modalRef = this.modalService.open(CreatePostComponent, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',
    });
    modalRef.componentInstance.posts.subscribe((posts: Post[]) => {
      this.posts.update((value) => [...value, ...posts]);
    });
  }

  deletePost(index: number) {
    this.posts.update((value) => {
      value.splice(index, 1);
      return value;
    });
  }
}
