import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError(error => {
      if (error.status === 403 && !req.url.includes('/admin/login')) {
        localStorage.removeItem('token');
        router.navigateByUrl('/login');
      }

      return throwError(() => error);
    })
  );
};
