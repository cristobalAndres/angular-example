import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form-array-2',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './form-array-2.component.html',
  styleUrl: './form-array-2.component.scss',
})
export class FormArray2Component {
  private readonly fb = inject(FormBuilder);

  form!: FormGroup;

  constructor() {
    this.initFormArrayPosts();
  }

  initFormArrayPosts() {
    this.form = this.fb.group({
      posts: new FormArray([]),
    });
  }

  createPost() {
    return this.fb.group({
      title: ['', Validators.required],
      items: new FormArray([]),
    });
  }

  addPost() {
    const posts = this.form.get('posts') as FormArray;
    posts.push(this.createPost());
  }

  removePost(index: number) {
    const posts = this.form.get('posts') as FormArray;
    posts.removeAt(index);
  }

  createItem() {
    return this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  addItem(index: number) {
    const posts = this.form.get('posts') as FormArray;
    const items = posts.at(index).get('items') as FormArray;
    items.push(this.createItem());
  }

  get formPostsControls() {
    return (this.form.get('posts') as FormArray).controls;
  }

  getItemsControls(index: number) {
    const posts = this.form.get('posts') as FormArray;
    return (posts.at(index).get('items') as FormArray).controls;
  }
  
}
