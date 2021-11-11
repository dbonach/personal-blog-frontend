import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Theme } from 'src/app/model/Theme';
import { ThemeService } from 'src/app/service/theme.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

  theme: Theme = new Theme()
  id: number

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (!environment.token) {
      this.router.navigate(['/entrar'])
    } else {
      this.id = this.route.snapshot.params['id']
      this.findByIdTheme(this.id)
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

  delete() {
    this.themeService.deleteTheme(this.id).subscribe({
      next: () => {
        alert('Tema apagado com sucesso!')
        this.router.navigate(['/tema'])
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

}
