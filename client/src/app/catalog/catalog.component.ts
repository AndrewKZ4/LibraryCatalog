import { Component, OnInit } from '@angular/core';
import {BooksService} from "../services/books.service";
import {Book} from "../models/book";
import {CategoriesService} from "../services/categories.service";
import {Category} from "../models/category";
import {AuthorsService} from "../services/authors.service";
import {Author} from "../models/author";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {


  categories: Category[]=[]
  authors: Author[]=[]
  constructor(private categoriesService: CategoriesService,private authorsService:AuthorsService) { }

  ngOnInit(): void {

    this.categoriesService.fetch().subscribe(items=>{
      this.categories=items

    })
    this.authorsService.fetch().subscribe(items=>{
      this.authors=items

    })
  }

}
