import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from 'src/app/services/loader.service';
import { RouterLink } from '@angular/router';
import { NgTiltModule } from '@geometricpanda/angular-tilt';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,NgTiltModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.removeLoaderClass();
  }
}
