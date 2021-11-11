import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Theme } from '../model/Theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private http: HttpClient) { }

  getAllTheme(): Observable<Theme[]> {
    return this.http.get<Theme[]>(`${environment.baseUrl}/theme`, { headers: { 'Authorization': environment.token } })
  }

  postTheme(theme: Theme): Observable<Theme> {
    return this.http.post<Theme>(`${environment.baseUrl}/theme`, theme, { headers: { 'Authorization': environment.token } })
  }
}
