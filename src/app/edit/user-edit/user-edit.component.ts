import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { UserLogin } from 'src/app/model/UserLogin';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  userLogin: UserLogin = new UserLogin()
  password: string
  type: string

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit(): void {
    window.scroll(0, 0)

    if (!environment.token) {
      this.router.navigate(['/entrar'])
    } else {
      this.userLogin = environment.userLogin
    }
  }

  checkPassword(event: any) {
    this.password = event.target.value
  }

  userType(event: any) {
    this.type = event.target.value
  }

  update() {
    this.userLogin.userType = this.type

    if (this.userLogin.hashcode !== this.password) {
      alert('As senhas são diferentes.')
    } else {
      let user = new User()
      user = this.updateUserInfo(user)
      this.authService.registration(user).subscribe({
        next: data => {
          this.alertas.showAlertSuccess('Informações atualizadas com sucesso!')
          environment.token = ''
          this.router.navigate(['/entrar'])
        },
        error: error => {
          console.error('There was an error!', error);
          this.alertas.showAlertDanger('Usuário ou senha estão incorretos!')
        }
      })
    }
  }

  private updateUserInfo(user: User): User {
    user.id = this.userLogin.id
    user.name = this.userLogin.name
    user.user = this.userLogin.user
    user.hashcode = this.userLogin.hashcode
    user.photoUri = this.userLogin.photoUri
    user.userType = this.userLogin.userType

    return user
  }

}
