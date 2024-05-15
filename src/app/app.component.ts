import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';


const routes: Routes = [
  {
    path : '',
    children : [
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
@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bibleWebApp';
}
