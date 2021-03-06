import { BlogPost } from "./BlogPost"

export class User {
  public id: number
  public name: string
  public user: string
  public hashcode: string
  public photoUri: string
  public userType: string
  public blogPosts: BlogPost[]
}
