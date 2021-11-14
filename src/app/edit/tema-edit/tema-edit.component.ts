import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Theme } from 'src/app/model/Theme';
import { AlertasService } from 'src/app/service/alertas.service';
import { ThemeService } from 'src/app/service/theme.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {

  theme: Theme = new Theme()

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private route: ActivatedRoute,
    private alertas: AlertasService
  ) { }

  ngOnInit(): void {
    if (!environment.token) {
      this.router.navigate(['/entrar'])
    } else {
      let id = this.route.snapshot.params['id']
      this.findByIdTheme(id)
    }
  }

  findByIdTheme(id: number) {
    this.themeService.getByIdTheme(id).subscribe({
      next: data => {
        this.theme = data
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  update() {
    this.themeService.putTheme(this.theme).subscribe({
      next: data => {
        this.theme = data
        this.alertas.showAlertSuccess("Tema atualizado com sucesso!")
        this.router.navigate(['/tema'])
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

}
