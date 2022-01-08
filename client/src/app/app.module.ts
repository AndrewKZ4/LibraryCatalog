import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiteLayoutComponent } from './shared/site-layout/site-layout.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CatalogComponent } from './catalog/catalog.component';
import { BookDetailsComponent } from './catalog/book-details/book-details.component';
import { BooksTableComponent } from './catalog/books-table/books-table.component';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import {CategoryComponent} from "./admin/category/category.component";
import {CreateComponent as CreateCategory} from "./admin/category/create/create.component";
import {EditComponent as EditCategory} from "./admin/category/edit/edit.component";
import {AuthorComponent} from "./admin/author/author.component";
import {CreateComponent as CreateAuthor} from "./admin/author/create/create.component";
import {EditComponent as EditAuthor} from "./admin/author/edit/edit.component";
import {BookComponent} from "./admin/book/book.component";
import {CreateComponent as CreateBook} from "./admin/book/create/create.component";
import {EditComponent as EditBook} from "./admin/book/edit/edit.component";
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import {TokenInterceptor} from "./services/token.interceptor";




@NgModule({
  declarations: [
    AppComponent,
    SiteLayoutComponent,
    HomeComponent,
    AboutComponent,
    CatalogComponent,
    BookDetailsComponent,
    BooksTableComponent,
    AdminLayoutComponent,
    CategoryComponent,
    CreateCategory,
    EditCategory,
    AuthorComponent,
    CreateAuthor,
    EditAuthor,
    BookComponent,
    CreateBook,
    EditBook,
    RegisterComponent,
    LoginComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
