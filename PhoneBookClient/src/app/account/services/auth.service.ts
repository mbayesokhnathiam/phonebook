import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../models/auth-response.model';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_COOKIE_NAME = 'ctctoken';

  constructor(private http: HttpClient, private cookieService: CookieService, private jwtHelper: JwtHelperService) { }

  // token management
  // Méthode pour stocker le token dans un cookie sécurisé
  public setToken(token: string): void {
    // const expirationDate = new Date(); // Créez une nouvelle date d'expiration
    // expirationDate.setFullYear(expirationDate.getFullYear() + 1); // Définissez la date d'expiration sur un an dans le futur (par exemple)
    // this.cookieService.set(this.TOKEN_COOKIE_NAME, token, expirationDate, '/', '', true, 'Strict');
    localStorage.setItem(this.TOKEN_COOKIE_NAME,token);
  }

  // Méthode pour récupérer le token depuis le cookie
  public getToken(): string | undefined {
    const token = localStorage.getItem(this.TOKEN_COOKIE_NAME);

    if (token) {
        return token;
    } else {
        return undefined;
    }
}

public isTokenValid(token: string): boolean {
  try {
      const tokenPayload: any = this.jwtHelper.decodeToken(token); // Décodez le token JWT
      const expirationDate = new Date(tokenPayload.exp * 1000); // Convertissez la date d'expiration en millisecondes
      const currentDate = new Date();

      return expirationDate > currentDate; // Retourne true si la date d'expiration est postérieure à la date actuelle
  } catch (error) {
      console.error('Error decoding token:', error);
      return false; // En cas d'erreur, considérez le token comme invalide
  }
}

  // Méthode pour supprimer le token du cookie
  public deleteToken(): void {
    localStorage.removeItem(this.TOKEN_COOKIE_NAME);
  }

  // Exemple d'une méthode pour effectuer une requête HTTP avec le token dans les en-têtes d'autorisation
  public getDataWithToken(): any{
    const token = this.getToken();
    if (token) {
      return this.jwtHelper.decodeToken(token);
    } else {
      // Gérez le cas où le token n'est pas disponible
      return null; // Ou retournez un observable vide ou un observable avec une erreur
    }
  }
  // end token management
  login(request: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${environment.apiUrl}/auth/login`,request
    );
  }

  refresh(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${environment.apiUrl}/auth/refresh`,null
    );
  }

  logout(): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/auth/logout`
    );
  }
}


