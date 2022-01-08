import { Component, OnInit } from '@angular/core';
import {CategoriesService} from "../../services/categories.service";
import {Category} from "../../models/category";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories:Category[] = []
  constructor(private categoriesService:CategoriesService) { }

  ngOnInit(): void {
    this.fetchData()
  }

  delProduct(id: string) {
    this.categoriesService.getBooks(id).subscribe(books => {
      if (books.length > 0) {
        console.log('Нельзя удалить пока в категорий есть книги')
      } else {
        this.categoriesService.delete(id).subscribe(category => {
          this.fetchData()
        })
      }
    })

  }

  fetchData() {
    this.categoriesService.fetch().subscribe(items=>{
      this.categories=items

    })
  }
}
