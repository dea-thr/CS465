import { Routes } from '@angular/router';
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { TripEditComponent } from './trip-edit/trip-edit.component';

export const routes: Routes = [
  { path: '', redirectTo: 'trips', pathMatch: 'full' },
  { path: 'trips', component: TripListingComponent },
  { path: 'trips/new', component: TripEditComponent },
  { path: 'trips/:id', component: TripEditComponent }
];
