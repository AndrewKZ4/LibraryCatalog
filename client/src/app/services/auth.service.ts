import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token:string = ''

  constructor( private http: HttpClient) { }

  login( user: User):Observable<{token:string}>{
    return this.http.post<{token:string}>('/api/auth/login', user).pipe(
      tap(
        ({token}) => {
          localStorage.setItem('auth-token', token)
          this.setToken(token)
        }
      )
    )
  }

  register(user: User){
    console.log(user)
    return this.http.post<User>('/api/auth/register', user)
  }

  setToken(token: string) {
    this.token = token
  }

  getToken(): string {
    return this.token
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  logout() {
    this.setToken('')
    localStorage.clear()
  }
}
