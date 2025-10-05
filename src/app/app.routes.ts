import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HelpdeskComponent } from './components/helpdesk/helpdesk.component';
import { authGuard } from './components/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'helpdesk',
    component: HelpdeskComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];