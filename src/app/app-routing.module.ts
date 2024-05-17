import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/login/login.component')
          .then(c => c.LoginComponent)
      },
      {
        path: 'signup',
        loadComponent: () => import('./pages/signup/signup.component')
          .then(c => c.SignupComponent)
      },
    ]
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main/main.routes')
      .then(r => r.MAIN_ROUTES)

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
