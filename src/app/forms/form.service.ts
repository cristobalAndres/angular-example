import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Photo } from './photo.interface';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private readonly http = inject(HttpClient);

  addPhoto(photo: Photo) {
    return this.http.post<Photo>('https://jsonplaceholder.typicode.com/photos', photo);
  }

  getPhotos() {
    return this.http.get<Photo[]>('https://jsonplaceholder.typicode.com/photos');
  }

  getPhotoById(id: number) {
    return this.http.get<Photo>(`https://jsonplaceholder.typicode.com/photos/${id}`);
  }
}