import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SiteLayoutComponent} from "./shared/site-layout/site-layout.component";
import {HomeComponent} from "./home/home.component";
import {CatalogComponent} from "./catalog/catalog.component";
import {AboutComponent} from "./about/about.component";
import {BookDetailsComponent} from "./catalog/book-details/book-details.component";
import {BooksTableComponent} from "./catalog/books-table/books-table.component";
import {AdminLayoutComponent} from "./shared/admin-layout/admin-layout.component";
import {CategoryComponent} from "./admin/category/category.component";
import {CreateComponent as CreateCategory} from "./admin/category/create/create.component";
import {EditComponent as EditCategory} from "./admin/category/edit/edit.component";
import {AuthorComponent} from "./admin/author/author.component";
import {CreateComponent as CreateAuthor} from "./admin/author/create/create.component";
import {EditComponent as EditAuthor} from "./admin/author/edit/edit.component";
import {BookComponent} from "./admin/book/book.component";
import {CreateComponent as CreateBook} from "./admin/book/create/create.component";
import {EditComponent as EditBook} from "./admin/book/edit/edit.component";
import {RegisterComponent} from "./auth/register/register.component";
import {LoginComponent} from "./auth/login/login.component";
import {AuthGuardService} from "./services/auth-guard.service";



const routes: Routes = [
  {path:'', component:SiteLayoutComponent, children:[
      {path:'', component:HomeComponent},
      {path:'catalog', component:CatalogComponent, children:[
          {path:'',component:BooksTableComponent},
          {path:'author/:id',component:BooksTableComponent},
          {path:'category/:id',component:BooksTableComponent},
          {path: 'details/:id', component:BookDetailsComponent}
        ]},
      {path:'about',component:AboutComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'login', component: LoginComponent}

    ]},
  {path: 'admin',component:AdminLayoutComponent, canActivate:[AuthGuardService], children:[
      {path: 'categories', component: CategoryComponent},
      {path:'categories/new', component: CreateCategory},
      {path: 'categories/edit/:id', component: EditCategory},

      {path: 'authors', component: AuthorComponent},
      {path:'authors/new', component: CreateAuthor},
      {path: 'authors/edit/:id', component: EditAuthor},

      {path: 'books', component: BookComponent},
      {path:'books/new', component: CreateBook},
      {path: 'books/edit/:id', component: EditBook}

    ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
