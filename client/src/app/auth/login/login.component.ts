import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  form!: FormGroup
  aSub!: Subscription


  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {

    this.form = new FormGroup( {
        email: new FormControl('',[Validators.required, Validators.email]),
        password: new FormControl('',[Validators.required, Validators.minLength(6)])
      }
    )

    this.route.queryParams.subscribe((params:Params)=>{
      if(params['registered']){
        console.log('Register success.Please Login')
      } else if (params['accessDenied']){
        console.log('Please authorize first')
      } else if(params['sessionFailed']) {
        console.log('Please re-login!')
      }



    })

  }

  onSubmit(){

    this.aSub = this.auth.login(this.form.value).subscribe(
      () => {
        this.router.navigate(['/admin'])
      },
      (error) => { console.log(error.error.message)}
    )

  }

  ngOnDestroy(): void {
    if (this.aSub){
      this.aSub.unsubscribe()
    }

  }

}
