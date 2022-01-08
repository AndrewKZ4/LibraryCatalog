import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthorsService} from "../../../services/authors.service";
import {CategoriesService} from "../../../services/categories.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form!: FormGroup

  constructor(private router: Router, private categoriesService: CategoriesService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(2)]),


    })

  }

  onSubmit() {

    this.categoriesService.create(this.form.value)
      .subscribe(category=>{
        this.router.navigate(['admin/categories'])
      })
  }
}
