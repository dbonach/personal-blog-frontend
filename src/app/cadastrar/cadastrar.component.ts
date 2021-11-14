import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  user: User = new User()
  password: string
  type: string

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  checkPassword(event: any) {
    this.password = event.target.value
  }

  userType(event: any) {
    this.type = event.target.value
  }

  registration() {
    this.user.userType = this.type

    if (this.user.hashcode !== this.password) {
      this.alertas.showAlertDanger('As senhas são diferentes.')
    } else {

      this.authService.registration(this.user).subscribe({
        next: data => {
          this.user = data
          this.alertas.showAlertSuccess('Usuario cadastrado com sucesso!')
          this.router.navigate(['/'])
        },
        error: error => {
          console.error('There was an error!', error);
          this.alertas.showAlertDanger('Ocorreu um erro com a requisição')
        }
      })
    }
  }

}
