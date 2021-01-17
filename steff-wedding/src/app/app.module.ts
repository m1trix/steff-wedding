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
import { NavigationComponent } from './navigation/navigation.component';
import { DialogComponent } from './dialog/dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PlaceholderComponent } from './pages/placeholder/placeholder.component';

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
    ImageCollectionComponent,
    NavigationComponent,
    DialogComponent,
    PlaceholderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
