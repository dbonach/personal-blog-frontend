import { Theme } from "./Theme"
import { User } from "./User"

export class BlogPost {
  public id: number
  public title: string
  public content: string
  public date: Date
  public user: User
  public theme: Theme
}
