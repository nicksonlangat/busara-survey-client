import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  base_url='https://fullstack-role.busara.io'
  
  constructor(private http: HttpClient) {
   }

   //handles registration
  register(data:any) {
    return this.http.post(
      this.base_url+'/api/v1/users/registration/',data)
  }

  //handles login
  getToken(data:any){
    
    return this.http.post(
     'https://fullstack-role.busara.io/api/v1/oauth/token/',data,
     {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Accept', 'application/json')
    })
  }

  //handles getting the details of currently logged in user
  getCurrentUser(){
    return this.http.get(this.base_url+'/api/v1/users/current-user')
  }

  //handles logout
  destroyToken(data:any){
    return this.http.post(this.base_url+'/api/v1/auth/logout/',data)
  }

}




