import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

const TOKEN_KEY = 'admin_token';

@Injectable({ providedIn: 'root' })
export class AdminAuthService {
  private readonly http = inject(HttpClient);

  login(email: string, password: string): Observable<{ access_token: string }> {
    return this.http
      .post<{ access_token: string }>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(tap((res) => localStorage.setItem(TOKEN_KEY, res.access_token)));
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  }
}
