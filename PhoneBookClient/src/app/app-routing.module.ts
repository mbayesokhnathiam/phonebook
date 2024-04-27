import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layouts/layout.component';

// Auth
import { AuthGuard } from './core/guards/auth.guard';
import { GestionnaireGuard } from './core/guards/gestionnaire.guard';
import { LecteurGuard } from './core/guards/lecteur.guard';

const routes: Routes = [
  
  { path: 'users', component: LayoutComponent, loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule), canActivate: [GestionnaireGuard] },
  { path: 'auth', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)  },
  { path: 'contact', component: LayoutComponent, loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule), canActivate: [AuthGuard]},
  { path: 'settings', component: LayoutComponent, loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule), canActivate: [GestionnaireGuard] },
  { path: '', redirectTo:'contact', pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
