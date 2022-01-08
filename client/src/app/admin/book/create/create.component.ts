import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {BooksService} from "../../../services/books.service";
import {AuthorsService} from "../../../services/authors.service";
import {CategoriesService} from "../../../services/categories.service";
import {Author} from "../../../models/author";
import {Category} from "../../../models/category";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form!: FormGroup
  authors:Author[] = []
  categories:Category[] = []

  constructor(private router:Router,
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


    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(2)] ),
      categoryId: new FormControl(null, [Validators.required]),
      authorId: new FormControl(null, [Validators.required ]),
      pages_count: new FormControl(null, [Validators.required,Validators.min(1)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(20)]),


    })
  }


  onSubmit() {

    this.booksService.create(this.form.value)
      .subscribe(book=>{
        this.router.navigate(['admin/books'])
      })
  }

}
