import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CategoriesService} from "../../../services/categories.service";
import {of, switchMap} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../../models/category";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  form!: FormGroup
  category!:Category
  constructor(private router:Router, private categoryService:CategoriesService,  public route:ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.pipe(
      switchMap((params: Params) => {

        if (params['id']) {

          return this.categoryService.getById(params['id'])
        }
        return of(null)
      })
    ).subscribe(category => {

      if (category) {
        this.category=category
        this.form = new FormGroup({
          name: new FormControl(this.category.name, [Validators.required, Validators.minLength(2)] ),

        })
      }
    })


  }


  onSubmit() {

    this.categoryService.update(this.category.id,this.form.value)
      .subscribe(category=>{
        this.router.navigate(['admin/categories'])
      })
  }
}
