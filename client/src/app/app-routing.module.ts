import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BasketComponent } from './e-commerce/basket/basket.component';
import { HomeComponent } from './e-commerce/home/home.component';
import { ItemComponent } from './e-commerce/item/item.component';
import { LoginComponent } from "./e-commerce/login/login.component";
import { RegisterComponent } from './e-commerce/register/register.component';
import { UserComponent } from './e-commerce/user/user.component';
import { ItemListComponent } from './e-commerce/item-list/item-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path : 'login', component : LoginComponent},
  { path : 'register', component : RegisterComponent},
  { path : 'home', component : HomeComponent},
  { path : 'basket', component : BasketComponent},
  { path : 'items', component : ItemListComponent},
  { path : 'item', component : ItemComponent},
  { path : 'user', component : UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
