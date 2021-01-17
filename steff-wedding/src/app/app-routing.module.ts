import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { DressComponent } from './pages/dress/dress.component';
import { DressesComponent } from './pages/dresses/dresses.component';
import { HomeComponent } from './pages/home/home.component';
import { OrganizationComponent } from './pages/organization/organization.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dresses', component: DressesComponent },
  { path: 'dresses/:id', component: DressComponent },
  { path: 'organization', component: OrganizationComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contacts', component: ContactsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
