import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripService } from '../../core/trip.service';

@Component({
  selector: 'app-trip-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './trip-form.component.html'
})
export class TripFormComponent {
  form = new FormGroup({
    code: new FormControl('', { nonNullable: true }),
    name: new FormControl('', { nonNullable: true }),
    length: new FormControl('', { nonNullable: true }),
    start: new FormControl('', { nonNullable: true }),
    resort: new FormControl('', { nonNullable: true }),
    perPerson: new FormControl('', { nonNullable: true }),
    image: new FormControl(''),
    description: new FormControl('')
  });

  constructor(private trips: TripService, private router: Router) {}

  save() {
    const v = this.form.value;
    const payload = {
      code: (v.code ?? '').trim(),
      name: (v.name ?? '').trim(),
      length: (v.length ?? '').trim(),
      start: v.start ? new Date(v.start as string).toISOString() : undefined,
      resort: (v.resort ?? '').trim(),
      perPerson: String(v.perPerson ?? ''),
      image: v.image || '/images/reef1.jpg',
      description: v.description || ''
    };
    this.trips.createTrip(payload).subscribe({
      next: () => this.router.navigate(['/trips']),
      error: (err: any) => alert(err?.error?.message || 'Failed to save')
    });
  }
}
