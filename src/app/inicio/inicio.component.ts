import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BlogPost } from '../model/BlogPost';
import { Theme } from '../model/Theme';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { ThemeService } from '../service/theme.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  blogPost: BlogPost = new BlogPost()
  blogPostList: BlogPost[]
  userBlogPostList: BlogPost[]

  theme: Theme = new Theme()
  themeList: Theme[]
  themeId: number

  user: User = new User()

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private themeService: ThemeService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (environment.token === '') {
      this.router.navigate(['/entrar'])
    } else {
      this.getAllThemes()
      this.getAllPostagens()
    }
  }

  getAllThemes() {
    this.themeService.getAllTheme().subscribe({
      next: data => {
        this.themeList = data
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  findByIdTheme() {
    this.themeService.getByIdTheme(this.themeId).subscribe({
      next: data => {
        this.theme = data
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  getAllPostagens() {
    this.postagemService.getAllPostagens().subscribe({
      next: data => {
        this.blogPostList = data
        this.userBlogPostList = data.filter(post => post.user.id == environment.id)
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  post() {
    this.theme.id = this.themeId
    this.blogPost.theme = this.theme
    this.user.id = environment.id
    this.user.name = environment.name
    this.blogPost.user = this.user

    this.postagemService.postPostagens(this.blogPost).subscribe({
      next: data => {
        alert('Postagem realizada com sucesso!')
        console.log(this.user);
        console.log(data);

        this.blogPostList.push(data)
        this.userBlogPostList = this.blogPostList.filter(post => post.user.id == environment.id)
        this.blogPost = new BlogPost()
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }
}
