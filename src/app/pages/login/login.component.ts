import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgTiltModule} from '@geometricpanda/angular-tilt';
import { Router, RouterLink } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,NgTiltModule, RouterLink,FormsModule,
    ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isPasswordVisible: boolean = false;
  loginForm!: FormGroup

  constructor(private loaderService: LoaderService, private service : ApiService, private route: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.loaderService.removeLoaderClass();
  }

  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    })
  }

  login() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      //this.loading = true;
      const formURlData = new URLSearchParams();
      formURlData.set('email', this.loginForm.value.email);
      formURlData.set('password', this.loginForm.value.password);
      this.service.postAPI('loginUser',formURlData.toString()).subscribe({
        next: (resp) => {
          if (resp.success == true) {
            this.route.navigateByUrl("/main");
            //localStorage.setItem('userDetail', JSON.stringify(resp.admin));
            this.service.setToken(resp.token);
            //this.toastr.success(resp.message);
            //this.loading = false;
            this.service.showSuccess(resp.message);
          } else {
            this.service.showWarning(resp.message);
            // this.toastr.warning(resp.message);
            // this.loading = false;
          }
        },
        error: (error) => {
          this.service.showError('Something went wrong.');
          // this.loading = false;
          // this.toastr.warning('Something went wrong.');
          console.error('Login error:', error.message);
        }
      });
    }
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  
}
