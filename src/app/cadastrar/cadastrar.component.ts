import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';
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
    private router: Router
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
      alert('As senhas são diferentes.')
    } else {
      this.authService.registration(this.user).subscribe((res: User) => {
        this.user = res
        alert('Usuario cadastrado com sucesso!')
        this.router.navigate(['/'])
      }, err => {
        if (err.status == 500) {
          alert('Usuário ou senha estão incorretos!')
        }
      })
    }
  }

}
