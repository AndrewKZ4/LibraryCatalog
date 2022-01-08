import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs/index'
import {Category} from "../models/category";
import {Book} from "../models/book";
import {Author} from "../models/author";


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http: HttpClient) {
  }

  fetch(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/Category')
  }

  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`/api/Category/${id}`)
  }

  getBooks(id: string): Observable<Book[]> {
    return this.http.get<Book[]>(`/api/Category/${id}/books`)
  }

  update(id: string,category:Category): Observable<Category>{

    return this.http.put<Category>(`/api/Category/${id}`, category)
  }
  delete(id: string):Observable<any>{
    return this.http.delete<any>(`/api/Category/${id}`)
  }
  create( category:Category): Observable<Category>{
    return this.http.post<Category>(`/api/Category`, category)
  }

}
