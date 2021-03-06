import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserLogin } from '../model/UserLogin';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(userLogin: UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>(`${environment.baseUrl}/user/login`, userLogin)
  }

  registration(user: User): Observable<User> {
    return this.http.post<User>(`${environment.baseUrl}/user/registration`, user)
  }

  userIsLogged() {
    return environment.token !== ''
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${environment.baseUrl}/user/${id}`, { headers: { 'Authorization': environment.token } })
  }
}