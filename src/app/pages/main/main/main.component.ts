import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../../layout/sidebar/sidebar.component";
import { HeaderComponent } from "../../layout/header/header.component";
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-main',
    standalone: true,
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
    imports: [CommonModule, SidebarComponent, HeaderComponent,RouterOutlet]
})
export class MainComponent {

}
