import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { UserFormComponent } from './components/user-form/user-form.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'usuario/:id', component: UserViewComponent },
  { path: 'nuevo-usuario', component: UserFormComponent },
  { path: 'actualizar-usuario/:id', component: UserFormComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];