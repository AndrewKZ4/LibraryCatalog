import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Router} from "@angular/router";
import {AuthorsService} from "../../../services/authors.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form!: FormGroup
  constructor(private router:Router, private authorService:AuthorsService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.minLength(2)] ),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(2)]),


    })
  }


  onSubmit() {


    this.authorService.create(this.form.value)
      .subscribe(authors=>{
        this.router.navigate(['admin/authors'])
      })
  }
}
