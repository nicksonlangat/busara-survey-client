import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private http:HttpClient) { }

  getSurvey(){
    return this.http.get('https://fullstack-role.busara.io/api/v1/recruitment/forms/2/?node_type=Both')
  }

  postAnswers(payload:any){
    return this.http.post(
      "https://fullstack-role.busara.io/api/v1/recruitment/answers/submit/",
      payload
    )
  }
  
}
