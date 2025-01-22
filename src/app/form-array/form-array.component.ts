import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-form-array',
    imports: [FormsModule, ReactiveFormsModule, CommonModule],
    templateUrl: './form-array.component.html',
    styleUrl: './form-array.component.scss'
})
export class FormArrayComponent {
  private readonly fb = inject(FormBuilder);

  formPost!: FormGroup;

  constructor() {
    this.initFormPosts();
  }

  initFormPosts() {
    this.formPost = this.fb.group({
      name: ['', Validators.required],
      posts: new FormArray([]),
      photos: new FormArray([])
    });
    
    this.addPost();
    this.addPhoto();
  }

  createPhoto() {
    return this.fb.group({
      url: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  addPhoto() {
    const photos = this.formPost.get('photos') as FormArray;
    photos.push(this.createPhoto());
  }

  createPost() {
    return this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  addPost() {
    const posts = this.formPost.get('posts') as FormArray;
    posts.push(this.createPost());
  }

  removePost(index: number) {
    const posts = this.formPost.get('posts') as FormArray;
    posts.removeAt(index);
  }

  addData() {
    const data = {
      name: 'John Doe',
      posts: [
        {
          title: 'Title 1',
          content: 'Content 1'
        },
        {
          title: 'Title 2',
          content: 'Content 2'
        }
      ]
    };

    // this.formPost.patchValue(data);

    // data.posts.forEach(post => {
    //   const posts = this.formPost.get('posts') as FormArray;
    //   posts.push(this.fb.group(post));
    // });

    // data.posts.forEach(post => {
    //   this.addPost();
    // });

    // this.formPost.patchValue(data);
  }

  get formPostsControls() {
    return (this.formPost.get('posts') as FormArray).controls;
  }

  get formPhotosControls() {
    return (this.formPost.get('photos') as FormArray).controls;
  }
}
