import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/account/services/auth.service';

@Injectable({ providedIn: 'root' })
export class GestionnaireGuard {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // Vérifiez si l'utilisateur est connecté
        const token = this.authService.getToken();
        if (!token) {
            // Redirigez vers la page de connexion si l'utilisateur n'est pas connecté
            this.router.navigate(['/auth/signin']);
            return false;
        }

        // Vérifiez si le token est expiré
        const tokenExpiration = this.getTokenExpiration();
        if (tokenExpiration && new Date() > tokenExpiration) {
            // Déconnectez l'utilisateur et redirigez-le vers la page de connexion
            localStorage.removeItem('token');
            this.router.navigate(['/auth/signin']);
            return false;
        }

        // Vérifiez le rôle de l'utilisateur
        const tokenPayload = this.authService.getDataWithToken();
        if (tokenPayload && tokenPayload.role !== 'GESTIONNAIRE') {
            // Redirigez vers une page non autorisée si le rôle n'est pas LECTEUR
            this.router.navigate(['/contact/advanced/search']);
            return false;
        }

        // L'utilisateur est connecté, le token n'est pas expiré et le rôle est LECTEUR
        return true;
    }

    private getTokenExpiration(): Date | null {
        try {
            const tokenPayload = this.authService.getDataWithToken();
            if (tokenPayload && tokenPayload.exp) {
                return new Date(tokenPayload.exp * 1000);
            }
        } catch (error) {
            console.error('Error parsing token:', error);
        }
        return null;
    }
    


}
