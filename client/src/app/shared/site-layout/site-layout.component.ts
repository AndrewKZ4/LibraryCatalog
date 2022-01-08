import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit {

  constructor(public auth:AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout($event: Event) {

    this.auth.logout()
    this.router.navigate(['/'])
  }

}
