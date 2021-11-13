import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  name = environment.name
  photoUri = environment.photoUri
  id = environment.id

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  loggout() {
    this.router.navigate(['/entrar'])

    environment.token = ''
    environment.name = ''
    environment.photoUri = ''
    environment.id = 0
  }

}
