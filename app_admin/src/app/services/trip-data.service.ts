import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Trip } from '../models/trip.model';

@Injectable({ providedIn: 'root' })
export class TripDataService {
  private base = 'http://localhost:3200/api/trips';
  constructor(private http: HttpClient) {}

  private normalizeIncoming(t: any): Trip {
    const per =
      typeof t.perPerson === 'string'
        ? Number(String(t.perPerson).replace(/[^0-9.-]/g, ''))
        : t.perPerson;
    const imageClean = (t.image || '').toString().replace(/^\/?images\//, '');
    return {
      ...t,
      perPerson: Number.isFinite(per) ? per : 0,
      image: imageClean || 'reef3.jpg'
    };
  }

  private normalizeOutgoing(t: Partial<Trip>): Partial<Trip> {
    const per =
      typeof t.perPerson === 'string'
        ? Number(String(t.perPerson).replace(/[^0-9.-]/g, ''))
        : t.perPerson;
    const imageClean = (t.image || '').toString().replace(/^\/?images\//, '');
    return { ...t, perPerson: per, image: imageClean };
  }

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.base).pipe(
      map((rows: any) => (rows || []).map((r: any) => this.normalizeIncoming(r)))
    );
  }

  getTrip(id: string): Observable<Trip> {
    return this.http.get<Trip>(this.base + '/' + id).pipe(
      map((r: any) => this.normalizeIncoming(r))
    );
  }

  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.base, this.normalizeOutgoing(trip)).pipe(
      map((r: any) => this.normalizeIncoming(r))
    );
  }

  updateTrip(id: string, trip: Partial<Trip>): Observable<Trip> {
    return this.http.put<Trip>(this.base + '/' + id, this.normalizeOutgoing(trip)).pipe(
      map((r: any) => this.normalizeIncoming(r))
    );
  }

  deleteTrip(id: string): Observable<void> {
    return this.http.delete<void>(this.base + '/' + id);
  }
}
