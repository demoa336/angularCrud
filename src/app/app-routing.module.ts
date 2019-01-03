import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemListComponent } from './item-list/item-list.component';
import { ItemCreateComponent } from './item-create/item-create.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { LoginComponent } from './Auth/login/login.component';
import { AuthGuard } from './Auth/auth.guard';

const routes: Routes = [
	{ path:  '', redirectTo:  'items', pathMatch:  'full' },
	{ path:  'login', component:  LoginComponent },
	{ path:  'signup', component:  SignupComponent },
	{ path:  'items', component:  ItemListComponent, canActivate: [AuthGuard] },
	{ path:  'items/create', component:  ItemCreateComponent, canActivate: [AuthGuard] },
	{ path:  'items/edit/:id', component:  ItemCreateComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
