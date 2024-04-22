import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/account/services/auth.service';
import { environment } from 'src/environments/environment';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     // Exclude certain routes from requiring token
     if (request.url.includes(`${environment.apiUrl}/auth/signin`) || request.url.includes(`${environment.apiUrl}/auth/forgot`)) {
        return next.handle(request);
    }

    // Get the JWT token from the authentication service
    const token = this.authService.getToken();

    // If token is available, add it to the request headers
    if (token) {
        // Clone the request and add the JWT token to the Authorization header
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    
    return next.handle(request).pipe(
      catchError(error => {
        if (error.status === 401) {
          // Le token a expiré, rafraîchir le token
          return this.authService.refresh().pipe(
            switchMap((response) => {
                this.authService.setToken(response.authorisation.token);
              // Réessayer la requête avec le nouveau token
              const token = this.authService.getToken();
              request = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${token}`
                }
              });
              return next.handle(request);
            }),
            catchError(() => {
              // Échec du rafraîchissement du token, rediriger vers la page de connexion ou gérer l'erreur
              return throwError(error);
            })
          );
        }
        return throwError(error);
      })
    );
  }
}
