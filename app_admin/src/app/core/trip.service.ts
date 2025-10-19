import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Trip {
  code: string;
  name: string;
  length: string;         // e.g., "6 nights"
  start: string;          // ISO string
  resort: string;
  perPerson: string;      // keep as string like "$1,599"
  image?: string;
  description?: string;
}

@Injectable({ providedIn: 'root' })
export class TripService {
  private http = inject(HttpClient);
  private base = 'http://localhost:3000/api';

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.base}/trips`);
  }

  getTrip(code: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.base}/trips/${code}`);
  }

  createTrip(trip: Partial<Trip>): Observable<Trip> {
    const body = {
      ...trip,
      start: trip.start ? new Date(trip.start).toISOString() : undefined
    };
    return this.http.post<Trip>(`${this.base}/trips`, body);
  }

  updateTrip(code: string, trip: Partial<Trip>): Observable<Trip> {
    const body = {
      ...trip,
      start: trip.start ? new Date(trip.start).toISOString() : undefined
    };
    return this.http.put<Trip>(`${this.base}/trips/${code}`, body);
  }

  deleteTrip(code: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/trips/${code}`);
  }
}
