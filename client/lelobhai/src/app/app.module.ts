
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RestApiService } from './rest-api.service';
import { DataService } from './data.service';
import { AuthGuardService } from './auth-guard.service';

import { HomeComponent } from './home/home.component';
import { MessageComponent } from './message/message.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { CategoriesComponent } from './categories/categories.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { AddressComponent } from './address/address.component';
import { ProductComponent } from './product/product.component';
import { SettingsComponent } from './settings/settings.component';
import { PostProductComponent } from './post-product/post-product.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { MyordersComponent } from './myorders/myorders.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { CategoryComponent } from './category/category.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MessageComponent,
    RegistrationComponent,
    LoginComponent,
    CategoriesComponent,
    CartComponent,
    ProfileComponent,
    AddressComponent,
    ProductComponent,
    SettingsComponent,
    PostProductComponent,
    MyProductsComponent,
    MyordersComponent,
    OrderdetailsComponent,
    CategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule,
  ],
  providers: [RestApiService, DataService, AuthGuardService],
  bootstrap: [AppComponent],
})
//Exporting the AppModule
export class AppModule {}
