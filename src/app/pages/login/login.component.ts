import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //declare variables
  form: FormGroup;
  submitted = false;
  token:any;
  showError=false

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
   
  ) { }

  ngOnInit(): void {
    //initialise login form
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required,],
    })

  }

  get f() { return this.form.controls; }

  login(){

    //hold user creds
    const payload = `grant_type=password&client_secret=Zv19oWmm416sTyjWT5Sx2r1gRwjWrXU3P5dWledQpYjxEvavS58SPtz03M8wvsgajaVLhcimmJIUUYUDad06V6HQosmPoj3TPRNjg7bgniQlooIwyFWfz8KfkM5Tdh7R&client_id=zVs3J7FZupB3TLPskQOy1xHLwYTRkzUSf2rdTDCu&username=${this.form.get('email').value}&password=${this.form.get('password').value}`
   
    return this.auth.getToken(payload).subscribe(res=>{
      // console.log(res['access_token'])
      this.token=res['access_token']
      localStorage.setItem('auth_token', this.token)
       this.router.navigate(['/survey'])
    },
    err => {
      console.log('ERROR: ' ,err.error)
      this.showError=true
  })
  }


}
