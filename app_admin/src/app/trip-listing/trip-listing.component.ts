import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip.model';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe, RouterModule],
  templateUrl: './trip-listing.component.html',
  styles: [`
  .actions{display:flex;gap:8px;margin:12px 0}
  .grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
  .card{border:1px solid #ddd;border-radius:8px;overflow:hidden}
  .card img{width:100%;height:180px;object-fit:cover;background:#f5f5f5}
  .body{padding:12px}
  .title{font-weight:700;font-size:20px;margin:0 0 6px}
  .meta b{font-weight:700}
  button{padding:6px 10px;border-radius:6px;border:1px solid #ddd;cursor:pointer}
  .danger{border-color:#dc3545;color:#dc3545}
  .primary{border-color:#0b5ed7;color:#0b5ed7}
  `]
})
export class TripListingComponent implements OnInit {
  trips: Trip[] = [];
  loading = false;
  constructor(private api: TripDataService) {}
  ngOnInit(): void { this.load(); }
  load(): void {
    this.loading = true;
    this.api.getTrips().subscribe({
      next: (rows)=>{ this.trips = rows; this.loading=false; },
      error: ()=>{ this.trips = []; this.loading=false; }
    });
  }
  imgSrc(t: Trip): string {
    const name = (t.image || '').replace(/^\/?images\//,'');
    return `assets/images/${name}`;
  }
  tripId(t: any): string { return t?._id || t?.id || ''; }
  delete(id?: string): void {
    if (!id) return;
    this.api.deleteTrip(id).subscribe(()=> this.load());
  }
}
