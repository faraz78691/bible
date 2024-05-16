import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { RouterModule, Routes, provideRouter } from '@angular/router';
import { AuthInterceptor } from './app/auth.interceptor';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';


export const routes: Routes = [
  {
    path : '',
    children : [
        {
            path: '',
            loadComponent: () => import('./app/pages/login/login.component')
                                      .then(c => c.LoginComponent)
        },
        {
            path: 'signup',
            loadComponent: () => import('./app/pages/signup/signup.component')
                                      .then(c => c.SignupComponent)
        },
    ]
},
{
  path: 'main',
  loadChildren: () => import('./app/pages/main/main/main.routes')
                              .then(r => r.MAIN_ROUTES)

},
];


bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
    provideHttpClient(
      withInterceptorsFromDi(),
      
    ),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideRouter(routes)
  ],
});

