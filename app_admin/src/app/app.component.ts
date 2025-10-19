import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
  <nav class="navbar navbar-dark bg-dark px-3">
    <a class="navbar-brand" routerLink="/">Travlr Admin</a>
    <a class="nav-link text-white ms-auto" routerLink="/trips/new">Add Trip</a>
  </nav>
  <div class="container py-3"><router-outlet /></div>
  `
})
export class AppComponent {}
