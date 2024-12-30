import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Post } from './models/post.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private readonly http = inject(HttpClient);
  post = signal<Post[]>([]);
  loading = signal(false);

  getPost() {
    this.loading.set(true);
    // return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/photos').subscribe({
    //   next: (data) => {
    //     this.loading.set(false);
    //     this.post.set(data);
    //   },
    //   error: (error) => {
    //     this.loading.set(false);
    //     console.log(error);
    //   },
    // });


  }
}