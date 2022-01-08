import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs/index'
import {Book} from "../models/book";
import {Category} from "../models/category";

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  constructor(private http: HttpClient) {
  }

  fetch(): Observable<Book[]> {
    return this.http.get<Book[]>('/api/book')
  }

  getById(id: string): Observable<Book> {
    return this.http.get<Book>(`/api/book/${id}`)
  }

  update(id: string,  book:Book): Observable<Book>{

    return this.http.put<Book>(`/api/Book/${id}`, book)
  }
  delete(id: string):Observable<any>{
    return this.http.delete<any>(`/api/Book/${id}`)
  }
  create( book:Book): Observable<Book>{
    return this.http.post<Book>(`/api/Book`, book)
  }

}
