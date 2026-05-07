import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private api: String = 'https://fakestoreapi.com';

  private usersUrl = `${this.api}/users`;
  private loginUrl = `${this.api}/auth/login`;  // endpoint del token real

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    // Paso 1: verificar que el usuario existe en /users
    return this.http.get<any[]>(this.usersUrl).pipe(
      switchMap((users) => {
        const user = users.find(u => u.username === username && u.password === password);
        if (!user) {
          throw new Error('Credenciales invalidas');
        }
        // Paso 2: si existe, obtener el token real desde /auth/login
        return this.http.post<any>(this.loginUrl, { username, password }).pipe(
          map((res) => {
            const session = { id: user.id, username: user.username };
            // Paso 3: guardar token real y datos del usuario en localStorage
            localStorage.setItem('currentUser', JSON.stringify(session));
            localStorage.setItem('token', res.token);
            return { token: res.token, user: session };
          })
        );
      })
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();  // true si hay token, false si no
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }
}