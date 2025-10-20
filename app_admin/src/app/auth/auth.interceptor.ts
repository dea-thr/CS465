import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Only add the token for mutating calls
  const method = (req.method || 'GET').toUpperCase();
  const shouldAttach = method === 'POST' || method === 'PUT' || method === 'DELETE' || method === 'PATCH';
  if (shouldAttach) {
    const auth = inject(AuthService);
    const token = auth.token();
    if (token) {
      req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }
  }
  return next(req);
};
