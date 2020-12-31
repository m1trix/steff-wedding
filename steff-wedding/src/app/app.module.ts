import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { DressesComponent } from './pages/dresses/dresses.component';
import { OrganizationComponent } from './pages/organization/organization.component';
import { HomeComponent } from './pages/home/home.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { DressComponent } from './pages/dress/dress.component';
import { HttpClientModule } from '@angular/common/http';
import { ImageCollectionComponent } from './image-collection/image-collection.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeScreenComponent,
    AboutUsComponent,
    DressesComponent,
    OrganizationComponent,
    HomeComponent,
    WelcomeComponent,
    ContactsComponent,
    DressComponent,
    ImageCollectionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
