import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { SafePipe } from './safe.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './e-commerce/login/login.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LabelModule } from '@progress/kendo-angular-label';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './e-commerce/register/register.component';
import { HomeComponent } from './e-commerce/home/home.component';
import { ItemComponent } from './e-commerce/item/item.component';
import { BasketComponent } from './e-commerce/basket/basket.component';
import { EmailValidator } from './directives/uniqueEmailValidator.directive';
import { NavigationComponent } from './e-commerce/navigation/navigation.component';
import { UserComponent } from './e-commerce/user/user.component';
import { IconsModule } from '@progress/kendo-angular-icons';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ItemListComponent } from './e-commerce/item-list/item-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ItemComponent,
    BasketComponent,
    EmailValidator,
    NavigationComponent,
    UserComponent,
    SafePipe,
    ItemListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InputsModule,
    BrowserAnimationsModule,
    LabelModule,
    FormsModule,
    ReactiveFormsModule,
    IconsModule,
    ButtonsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
