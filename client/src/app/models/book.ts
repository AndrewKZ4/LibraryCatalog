import {Category} from "./category";
import {Author} from "./author";

export interface Book {
  id: string
  title:string
  pages_count: number
  description: string
  author: Author
  category: Category
}

