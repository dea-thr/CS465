import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable({providedIn:'root'})
export class AuthService {
  private base = 'http://localhost:3200/api/users';
  private platformId = inject(PLATFORM_ID);
  private storage: Storage | null = isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined' ? localStorage : null;

  token = signal<string | null>(this.storage?.getItem('token') ?? null);

  constructor(private http: HttpClient) {}

  login(email:string, password:string){
    return this.http.post<{token:string}>(`${this.base}/login`, {email,password});
  }

  setToken(t:string){
    if (this.storage) this.storage.setItem('token', t);
    this.token.set(t);
  }

  logout(){
    if (this.storage) this.storage.removeItem('token');
    this.token.set(null);
  }

  isLoggedIn(){ return !!this.token(); }

  getAuthHeader(){ const t=this.token(); return t ? { Authorization: `Bearer ${t}` } : {}; }
}
