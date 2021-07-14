import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //define variables
  form: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
   
  ) { }

  ngOnInit(): void {
    //initialise registration form
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      full_name: ['', Validators.required],
      phone_number: ['', Validators.required],
      password1: ['', Validators.required,],
      password2: ['', Validators.required],
      referral_code: [''],
      device_details: [{"device": "Samsung"}],
      location: [''],
    })
  

  }

  get f() { return this.form.controls; }

  submit(): void{
    this.submitted = true;
    //collect user input
    const data={
      username: this.form.get('email').value,
      email: this.form.get('email').value,
      password1:  this.form.get('password1').value,
      password2: this.form.get('password2').value,
      referral_code: this.form.get('referral_code').value,
      phone_number: this.form.get('phone_number').value,
      full_name:  this.form.get('full_name').value,
      device_details:   this.form.get('device_details').value,
      location: this.form.get('location').value,
    }

    //submit to registration API
    this.auth.register(data)
    .subscribe(
      data => {
        // console.log(data)
        // this.alertService.success('Your account was created successfully', true);
        this.router.navigate(['/login'])
      },
      err => {
        console.log('ERROR: ' ,err)
        // this.showError=true
    }
    )
  }


}
