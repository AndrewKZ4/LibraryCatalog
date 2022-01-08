import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AuthorsService} from "../../../services/authors.service";
import {Author} from "../../../models/author";
import {delay, of, switchMap} from "rxjs";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  form!: FormGroup
  author!:Author
  constructor(private router:Router, private authorService:AuthorsService,  public route:ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.pipe(
      switchMap((params: Params) => {

        if (params['id']) {

          return this.authorService.getById(params['id'])
        }
        return of(null)
      })
    ).subscribe(author => {

      if (author) {
        this.author=author
        this.form = new FormGroup({
          firstName: new FormControl(this.author.firstName, [Validators.required, Validators.minLength(2)] ),
          lastName: new FormControl(this.author.lastName, [Validators.required, Validators.minLength(2)]),
           })
      }
    })


  }


  onSubmit() {

    this.authorService.update(this.author.id,this.form.value)
      .subscribe(authors=>{
        this.router.navigate(['admin/authors'])
      })
  }

}
