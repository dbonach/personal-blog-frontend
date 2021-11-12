import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BlogPost } from '../model/BlogPost';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http: HttpClient) { }

  getAllPostagens(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${environment.baseUrl}/posts`, { headers: { 'Authorization': environment.token } })
  }

  postPostagens(blogPost: BlogPost): Observable<BlogPost> {
    return this.http.post<BlogPost>(`${environment.baseUrl}/posts`, blogPost, { headers: { 'Authorization': environment.token } })
  }
}
