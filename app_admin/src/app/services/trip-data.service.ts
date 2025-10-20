import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Trip } from '../models/trip.model';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class TripDataService {
  private base = 'http://localhost:3200/api/trips';
  private http = inject(HttpClient);
  private auth = inject(AuthService);

  private normalizeIncoming(t: any): Trip {
    const per = typeof t.perPerson === 'string'
      ? Number(String(t.perPerson).replace(/[^0-9.-]/g, ''))
      : t.perPerson;
    const imageClean = (t.image || '').toString().replace(/^\/?images\//, '');
    return { ...t, perPerson: Number.isFinite(per) ? per : 0, image: imageClean || 'reef3.jpg' };
  }

  private normalizeOutgoing(t: Partial<Trip>): Partial<Trip> {
    const per = typeof t.perPerson === 'string'
      ? Number(String(t.perPerson).replace(/[^0-9.-]/g, ''))
      : t.perPerson;
    const imageClean = (t.image || '').toString().replace(/^\/?images\//, '');
    return { ...t, perPerson: per, image: imageClean };
  }

  private authHeaders(): { headers: HttpHeaders } {
    const h = this.auth.getAuthHeader() as any;
    return { headers: new HttpHeaders(h) };
  }

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.base).pipe(map(rows => (rows || []).map(r => this.normalizeIncoming(r))));
  }

  getTrip(id: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.base}/${id}`).pipe(map(r => this.normalizeIncoming(r)));
  }

  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.base, this.normalizeOutgoing(trip), this.authHeaders())
      .pipe(map(r => this.normalizeIncoming(r)));
  }

  updateTrip(id: string, trip: Partial<Trip>): Observable<Trip> {
    return this.http.put<Trip>(`${this.base}/${id}`, this.normalizeOutgoing(trip), this.authHeaders())
      .pipe(map(r => this.normalizeIncoming(r)));
  }

  deleteTrip(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`, this.authHeaders());
  }
}
