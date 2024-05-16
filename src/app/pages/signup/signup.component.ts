import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from 'src/app/services/loader.service';
import { RouterLink } from '@angular/router';
import { NgTiltModule } from '@geometricpanda/angular-tilt';
import { ApiService } from 'src/app/services/api.service';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,NgTiltModule, RouterLink,FormsModule,
    ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupForm!: FormGroup;
  isPasswordVisible: boolean = false;
  isPasswordVisible1: boolean = false;
  passwordMismatch = false;

  constructor(private loaderService: LoaderService, private service : ApiService) { }

  ngOnInit(): void {
    this.initForm();
    this.loaderService.removeLoaderClass();
  }

  initForm() {
    this.signupForm = new FormGroup({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    })

    this.signupForm.get('confirmPassword')?.setValidators([
      Validators.required,
      this.passwordMatchValidator()
    ]);
  }

  signUp() {
    this.signupForm.markAllAsTouched();
    if (this.signupForm.valid) {
      //this.loading = true;
      const formURlData = new URLSearchParams();
      formURlData.set('first_name', this.signupForm.value.first_name);
      formURlData.set('last_name', this.signupForm.value.last_name);
      formURlData.set('email', this.signupForm.value.email);
      formURlData.set('password', this.signupForm.value.password);
      this.service.postAPI('signup',formURlData.toString()).subscribe({
        next: (resp) => {
          console.log(resp)
          if (resp.success == true) {
            //this.route.navigateByUrl("/user/main/dashboard");
            //localStorage.setItem('userDetail', JSON.stringify(resp.admin));
            //this.srevice.setToken(resp.token);
            this.service.showSuccess(resp.message);
            //this.loading = false;
            //this.signupForm.reset();
          } else {
            this.service.showWarning(resp.message);
            //this.loading = false;
          }
        },
        error: (error) => {
          //this.loading = false;
          this.service.showError('Something went wrong.');
          console.error('Login error:', error.message);
        }
      });
    }
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = this.signupForm.get('password')?.value;
      const confirmPassword = control.value;
      if (password !== confirmPassword) {
        this.passwordMismatch = true;
        return { passwordMismatch: true };
      } else {
        this.passwordMismatch = false;
        return null;
      }
    };
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  togglePasswordVisibility1() {
    this.isPasswordVisible1 = !this.isPasswordVisible1;
  }


}
