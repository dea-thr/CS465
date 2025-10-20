import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <h2>Admin Login</h2>
  <form [formGroup]="form" (ngSubmit)="submit()" class="form">
    <label>Email <input formControlName="email" type="email"></label>
    <label>Password <input formControlName="password" type="password"></label>
    <button type="submit">Sign in</button>
  </form>
  <style>
    .form{display:grid;gap:12px;max-width:360px}
    label{display:grid;gap:6px}
    input{padding:8px;border:1px solid #ddd;border-radius:6px}
    button{padding:8px 12px;border:1px solid #0b5ed7;border-radius:6px;background:#0b5ed7;color:#fff}
  </style>`
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  form = this.fb.group({ email:['admin@example.com',[Validators.required,Validators.email]], password:['Passw0rd!', Validators.required] });
  submit(){
    if(this.form.invalid) return;
    const {email,password} = this.form.getRawValue();
    this.auth.login(email!, password!).subscribe({
      next: r=>{ this.auth.setToken(r.token); this.router.navigateByUrl('/trips'); },
      error: _=>{ alert('Login failed'); }
    });
  }
}
