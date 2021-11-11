import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Theme } from '../model/Theme';
import { ThemeService } from '../service/theme.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  theme: Theme = new Theme()
  themeList: Theme[]

  constructor(
    private router: Router,
    private themeService: ThemeService
  ) { }

  ngOnInit() {
    if (environment.token === '') {
      this.router.navigate(['/entrar'])
    }
  }

  register() {
    console.log(this.theme);

    this.themeService.postTheme(this.theme).subscribe({
      next: data => {
        console.log(data);
        this.theme = new Theme();
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

}
