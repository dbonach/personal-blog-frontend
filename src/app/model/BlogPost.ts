import { BlogPostTheme } from "./BlogPostTheme"
import { User } from "./User"

export class BlogPost {
  public id: number
  public title: string
  public content: string
  public date: Date
  public user: User
  public theme: BlogPostTheme
}
