import { Routes } from "@angular/router";

import { HomeComponent } from "../home/home.component";
import { MainComponent } from "./main.component";

export const  MAIN_ROUTES: Routes = [
 {
    path: '',
    component : MainComponent,
    children:[
        {
            path: '',
            pathMatch: 'full',
            redirectTo: 'home'
        },
        {
            path: 'home',
            component: HomeComponent
        }
    ]
 }
];

