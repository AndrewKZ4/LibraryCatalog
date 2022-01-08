import { Component, OnInit } from '@angular/core';
import {BooksService} from "../../services/books.service";
import {Book} from "../../models/book";
import {Router} from "@angular/router";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  books:Book[]=[]
  constructor(private booksService:BooksService, private router:Router) { }

  ngOnInit(): void {
    this.fetchData()
  }

  delProduct(id:string) {

    this.booksService.delete(id).subscribe(book=>{
      this.fetchData()
    })
  }

  fetchData(){
    this.booksService.fetch().subscribe(items=>{
      this.books=items

    })
  }
}
