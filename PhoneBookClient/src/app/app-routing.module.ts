import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layouts/layout.component';

// Auth
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)},
  // { path: 'auth', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)  },
  // { path: 'landing', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule)},
  { path: 'contact', component: LayoutComponent, loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule)},
  { path: 'settings', component: LayoutComponent, loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
