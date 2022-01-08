import { Component, OnInit } from '@angular/core';
import {BooksService} from "../../services/books.service";
import {Book} from "../../models/book";
import {of, switchMap} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {AuthorsService} from "../../services/authors.service";
import {CategoriesService} from "../../services/categories.service";

@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.css']
})
export class BooksTableComponent implements OnInit {

  books: Book[]=[]
  constructor(private route:ActivatedRoute,
              private booksService:BooksService,
              private authorService:AuthorsService,
              private categoriesService:CategoriesService) { }

  ngOnInit(): void {

    this.route.url.pipe(
      switchMap((params: Params) => {

        if (params[0]===undefined) {
          return this.booksService.fetch()
        } else if(params[0]=='author'){
          return this.authorService.getBooks(params[1])
        } else if(params[0]=='category'){
          return this.categoriesService.getBooks(params[1])
        }
        return of(null)
      })
    ).subscribe(books => {
      if (books) {
        this.books=books
      }
    })

    this.booksService.fetch().subscribe( items =>{
      this.books = items

    })

  }

}
