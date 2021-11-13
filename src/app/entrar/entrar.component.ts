import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  userLogin: UserLogin = new UserLogin()

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    window.scroll(0, 0)
  }

  login() {
    this.auth.login(this.userLogin).subscribe((res: UserLogin) => {
      this.userLogin = res

      environment.userLogin = this.userLogin

      environment.user = this.userLogin.user
      environment.userType = this.userLogin.userType
      environment.token = this.userLogin.token
      environment.name = this.userLogin.name
      environment.photoUri = this.userLogin.photoUri
      environment.id = this.userLogin.id

      this.router.navigate(['/inicio'])
    }, err => {
      if (err.status == 500) {
        alert("Usuario ou senha estão incorretos!")
      }
    })
  }

}
