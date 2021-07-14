import { Component, OnInit, ViewChild, } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SurveyService } from 'src/app/shared/services/survey/survey.service';


@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  @ViewChild('Form', {static: false}) Form: NgForm;
  //define variables
  forms:any
  form:FormGroup
  submitted = false;
  success = false;
  token=localStorage.getItem('auth_token')
  constructor(
    private survey:SurveyService, 
    private formBuilder: FormBuilder,private router:Router){ 

    }

  ngOnInit(): void {

    if (this.token==null){
      this.router.navigate(['/login'])
    }
    //initialise our form when the component is ready
    this.form = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', [Validators.required]],
      contact: ['', Validators.required],
      country: ['', Validators.required],
      county: ['', Validators.required,],
      constituency: ['', Validators.required],
      ward: ['', Validators.required],
      gender: ['', Validators.required],
      education: ['', Validators.required],
     
    })

    //let's collect the form data/questions
    this.survey.getSurvey().subscribe(res=>{
      this.forms=res
    },
    err => {
      console.log('ERROR: ' ,err)
  })

    //nav
    this.nav()
  }
  

  //logic to submit form answers
  submitAnswers(): void{
    this.submitted = true;
    //store user answers in a variable
    const payload =[
     {
       "ans":[
        {
          column_match: "first_name",
          q_ans: this.form.get('first_name').value,
          q_id: 1
        },
        {
          column_match: "last_name",
          q_ans: this.form.get('last_name').value,
          q_id: 2
        },
        {
          column_match: "contact",
          q_ans: this.form.get('contact').value,
          q_id: 3
        },
        {
          column_match: "country",
          q_ans: this.form.get('country').value,
          q_id: 4
        },
        {
          column_match: "county",
          q_ans: this.form.get('county').value,
          q_id: 5
        },
        {
          column_match: "constituency",
          q_ans: this.form.get('constituency').value,
          q_id: 6
        },
        {
          column_match: "ward",
          q_ans: this.form.get('ward').value,
          q_id: 7
        },
        {
          column_match: "gender",
          q_ans: this.form.get('gender').value,
          q_id: 11
        },
        {
          column_match: "education",
          q_ans: this.form.get('education').value,
          q_id: 10
        },
       ],
       end_time: "2021-07-13 11:35:16.649 +0300",
       local_id: 36,
       location: {
           accuracy: 1,
           lat: -1.4057472,
           lon: 36.4296512
          },
      start_time: "2021-07-13 11:27:37.739 +0300",
      survey_id: 2,
      subject: 19
     }
    ] 

    //send user answers to db
    this.survey.postAnswers(payload)
    .subscribe(
      data => {
        // console.log(data)
        this.success=true
        this.Form.resetForm();
      },
      err => {
        console.log('ERROR: ' ,err.error?.errors[0]?.errors[0])
    }
    )
  }
  nav(){
    let hamburger = document.getElementById('hamburgerbtn');

    let mobileMenu = document.getElementById('mobileMenu');

    hamburger.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
    });
  }

  close(){
    return this.success=false
  }

}
