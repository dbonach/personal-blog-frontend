import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BlogPost } from 'src/app/model/BlogPost';
import { Theme } from 'src/app/model/Theme';
import { PostagemService } from 'src/app/service/postagem.service';
import { ThemeService } from 'src/app/service/theme.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {

  blogPost: BlogPost = new BlogPost()
  theme: Theme = new Theme()
  themeList: Theme[]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    window.scroll(0, 0)

    if (!environment.token) {
      this.router.navigate(['/entrar'])
    } else {
      let id = this.route.snapshot.params['id']
      this.findPostagemById(id)
      this.getAllThemes()
    }
  }

  findPostagemById(id: number) {
    this.postagemService.getPostagemById(id).subscribe({
      next: data => {
        this.blogPost = this.blogPostFactory(data)
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  findTemaById() {
    this.themeService.getByIdTheme(this.theme.id).subscribe({
      next: data => {
        this.theme = data
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
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

  update() {
    this.blogPost.theme = this.theme
    this.postagemService.putPostagens(this.blogPost).subscribe({
      next: data => {
        this.blogPost = this.blogPostFactory(data)
        alert("Postagem atualizada com sucesso!")
        this.router.navigate(["/inicio"])
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
  }

  private blogPostFactory(obj: any) {
    let newBlogPost: BlogPost = new BlogPost()
    newBlogPost.id = obj.id
    newBlogPost.title = obj.title
    newBlogPost.content = obj.content
    newBlogPost.date = obj.date
    newBlogPost.user = obj.user
    newBlogPost.theme = obj.theme

    return newBlogPost
  }

}
