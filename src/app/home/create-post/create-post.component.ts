import { Component, inject, output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Post } from '../../models/post.interface';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss',
})
export class CreatePostComponent {
  private readonly activeModal = inject(NgbActiveModal);
  private readonly fb = inject(FormBuilder);
  posts = output<Post[]>();

  formPost!: FormGroup;

  constructor() {
    this.initFormPosts();
  }

  initFormPosts() {
    this.formPost = this.fb.group({
      posts: new FormArray([]),
    });

    this.addPost();
  }

  createPost() {
    return this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      image: [''],
    });
  }

  addPost() {
    const posts = this.formPost.get('posts') as FormArray;
    posts.push(this.createPost());
  }

  addPosts() {
    this.posts.emit(this.formPost.value.posts);
    this.activeModal.close('Close click');
  }

  closeModal() {
    this.activeModal.dismiss('Cross click');
  }

  get formPostsControls() {
    return (this.formPost.get('posts') as FormArray).controls;
  }
}
