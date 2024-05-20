import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, FormsModule,
    ReactiveFormsModule, ],
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {

  userDet: any = '';
  userFirstName: any = '';
  userLastName: any = '';
  userEmail: any = '';
  updateForm!: FormGroup;

  constructor(){}

  ngOnInit(){
    this.userDet = localStorage.getItem('userDetail');
    const userData = JSON.parse(this.userDet);
    this.userFirstName = userData['first_name'];
    this.userLastName = userData['last_name'];
    this.userEmail = userData['email'];
    this.initUpdateForm();
  }

  initUpdateForm() {
    this.updateForm = new FormGroup({
      firstName: new FormControl(this.userFirstName, Validators.required),
      lastName: new FormControl(this.userLastName, Validators.required),
      email: new FormControl(this.userEmail, Validators.required),
    })
  }

}
