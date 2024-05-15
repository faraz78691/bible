import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgTiltModule} from '@geometricpanda/angular-tilt';
import { RouterLink } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,NgTiltModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.removeLoaderClass();
  }
}
