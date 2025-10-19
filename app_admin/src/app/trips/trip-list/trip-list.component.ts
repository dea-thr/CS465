import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TripService, Trip } from '../../core/trip.service';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './trip-list.component.html'
})
export class TripListComponent implements OnInit {
  trips: Trip[] = [];
  loading = true;

  constructor(private tripsSvc: TripService) {}

  ngOnInit(): void {
    this.tripsSvc.getTrips().subscribe({
      next: (t: Trip[]) => {
        this.trips = t;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Failed to load trips', err);
        this.loading = false;
      }
    });
  }

  deleteTrip(code: string): void {
    if (confirm('Delete this trip?')) {
      this.tripsSvc.deleteTrip(code).subscribe(() => {
        this.trips = this.trips.filter(x => x.code !== code);
      });
    }
  }
}
