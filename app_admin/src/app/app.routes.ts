import { Routes } from '@angular/router';
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { TripEditComponent } from './trip-edit/trip-edit.component';
import { LoginComponent } from './auth/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'trips', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'trips', component: TripListingComponent, canActivate: [authGuard] },
  { path: 'trips/new', component: TripEditComponent, canActivate: [authGuard] },
  { path: 'trips/:id', component: TripEditComponent, canActivate: [authGuard] }
];
