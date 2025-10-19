import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip.model';

@Component({
  selector: 'app-trip-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './trip-edit.component.html'
})
export class TripEditComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private api = inject(TripDataService);

  id: string | null = null;

  form = this.fb.group({
    code: ['', Validators.required],
    name: ['', Validators.required],
    length: [0, Validators.required],
    start: ['', Validators.required],
    resort: ['', Validators.required],
    perPerson: [0, Validators.required],
    image: ['reef1.jpg', Validators.required],
    description: ['']
  });

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.api.getTrip(this.id).subscribe(t => {
        this.form.patchValue({
          code: t.code,
          name: t.name,
          length: t.length,
          start: (t.start || '').toString().substring(0,10),
          resort: t.resort,
          perPerson: t.perPerson,
          image: (t.image || '').replace(/^\/?images\//,''),
          description: t.description
        });
      });
    }
  }

  save(): void {
    const v: Trip = this.form.getRawValue() as Trip;
    v.image = (v.image || '').replace(/^\/?images\//,'');
    if (this.id) {
      this.api.updateTrip(this.id, v).subscribe(() => this.router.navigate(['/trips']));
    } else {
      this.api.addTrip(v).subscribe(() => this.router.navigate(['/trips']));
    }
  }
}
