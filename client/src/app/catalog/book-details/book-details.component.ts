import { Component, OnInit } from '@angular/core';
import {Book} from "../../models/book";
import {ActivatedRoute, Params} from "@angular/router";
import {BooksService} from "../../services/books.service";
import {of, switchMap} from "rxjs";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book!: Book
  constructor( private route:ActivatedRoute, private bookService: BooksService) { }

  ngOnInit(): void {

    this.route.params.pipe(
      switchMap((params: Params) => {

        if (params['id']) {
          return this.bookService.getById(params['id'])
        }
        return of(null)
      })
    ).subscribe(book => {
      if (book) {
        this.book=book
      }
    })

  }

}
