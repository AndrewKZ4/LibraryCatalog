import { Component, OnInit } from '@angular/core';
import {AuthorsService} from "../../services/authors.service";
import {Author} from "../../models/author";

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  authors: Author[] = []

  constructor(private authorService: AuthorsService) {
  }

  ngOnInit(): void {

    this.fetchData()
  }

  delProduct(id: string) {
    this.authorService.getBooks(id).subscribe(books => {
      if (books.length > 0) {
        console.log('Нельзя удалить пока у автора есть книги')
      } else {
        this.authorService.delete(id).subscribe(author => {
          this.fetchData()
        })
      }
    })

  }

  fetchData() {
    this.authorService.fetch().subscribe(items => {
      this.authors = items

    })
  }
}

