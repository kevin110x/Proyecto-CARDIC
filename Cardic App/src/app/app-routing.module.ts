import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserUpdateComponent } from './components/user-update/user-update.component'

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'regis', redirectTo: './home/home.module#HomePageModule' },
  { path: 'index', loadChildren: './index/index.module#IndexPageModule' },
  { path: 'config', loadChildren: './config/config.module#ConfigPageModule' },
  { path: 'estadis', loadChildren: './estadis/estadis.module#EstadisPageModule' },
  { path: 'registros', loadChildren: './registros/registros.module#RegistrosPageModule' },
  { path: 'consejos', loadChildren: './consejos/consejos.module#ConsejosPageModule' },
  { path: 'cont', loadChildren: './cont/cont.module#ContPageModule' },
  { path: 'user', redirectTo: './config/config.module#ConfigPageModule'},
  { path: 'act', redirectTo: './config/config.module#ConfigPageModule'},
  { path: 'act', component: UserUpdateComponent },
  { path: 'user', component: UserListComponent },
  { path: 'regis', component: UserFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
