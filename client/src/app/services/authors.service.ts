import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs/index'
import {Author} from "../models/author";
import {Book} from "../models/book";

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  constructor(private http: HttpClient) {
  }

  fetch(): Observable<Author[]> {
    return this.http.get<Author[]>('/api/Author')
  }

  getById(id: string): Observable<Author> {
    return this.http.get<Author>(`/api/Author/${id}`)
  }
  getBooks(id: string): Observable<Book[]> {
    return this.http.get<Book[]>(`/api/Author/${id}/books`)
  }

  update(id: string,author:Author): Observable<Author>{

    return this.http.put<Author>(`/api/Author/${id}`, author)
  }
  delete(id: string):Observable<any>{
    return this.http.delete<any>(`/api/Author/${id}`)
  }
  create( author:Author): Observable<Author>{
    const fd = new FormData()
    return this.http.post<Author>(`/api/Author`, author)
  }



}
