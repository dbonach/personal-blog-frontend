import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPost } from 'src/app/model/BlogPost';
import { Theme } from 'src/app/model/Theme';
import { PostagemService } from 'src/app/service/postagem.service';
import { ThemeService } from 'src/app/service/theme.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {

  blogPost: BlogPost = new BlogPost()

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

  delete() {
    this.postagemService.deletePostagemById(this.blogPost.id).subscribe({
      next: () => {
        alert("Postagem apagada com sucesso!");
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
