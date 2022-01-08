import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CategoriesService} from "../../../services/categories.service";
import {of, switchMap} from "rxjs";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Category} from "../../../models/category";
import {BooksService} from "../../../services/books.service";
import {AuthorsService} from "../../../services/authors.service";
import {Author} from "../../../models/author";
import {Book} from "../../../models/book";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  form!: FormGroup
  authors:Author[] = []
  categories:Category[] = []
  book!:Book
  constructor(private router:Router,
              public route:ActivatedRoute,
              private booksService:BooksService,
              private authorsService:AuthorsService,
              private categoriesService:CategoriesService) { }

  ngOnInit(): void {

    this.authorsService.fetch().subscribe(items=>{
      this.authors=items

    })

    this.categoriesService.fetch().subscribe(items=>{
      this.categories=items

    })

    this.route.params.pipe(
      switchMap((params: Params) => {

        if (params['id']) {

          return this.booksService.getById(params['id'])
        }
        return of(null)
      })
    ).subscribe(book => {

      if (book) {
        this.book=book
        this.form = new FormGroup({
          title: new FormControl(this.book.title, [Validators.required, Validators.minLength(2)] ),
          categoryId: new FormControl(this.book.category.id, [Validators.required]),
          authorId: new FormControl(this.book.author.id, [Validators.required ]),
          pages_count: new FormControl(this.book.pages_count, [Validators.required,Validators.min(1)]),
          description: new FormControl(this.book.description, [Validators.required, Validators.minLength(20)]),


        })
      }
    })


  }


  onSubmit() {

    this.booksService.update(this.book.id,this.form.value)
      .subscribe(book=>{
        this.router.navigate(['admin/books'])
      })
  }
}

