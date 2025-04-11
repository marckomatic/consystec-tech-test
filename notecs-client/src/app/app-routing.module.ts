import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './landing/login/login.component';
import { SignupComponent } from './landing/signup/signup.component';

const routes: Routes = [

  {
    path: 'login', component: LoginComponent
    
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: 'dashboard', loadChildren: ()=> import('./dashboard/dashboard.module').then(m=>m.DashboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
