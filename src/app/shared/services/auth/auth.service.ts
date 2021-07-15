import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  base_url='https://fullstack-role.busara.io'
  
  token:any;
  refresh_token:any;

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

  refresh(){
    const ref=localStorage.getItem('refresh_token')
    const payload = `grant_type=refresh_token&client_secret=Zv19oWmm416sTyjWT5Sx2r1gRwjWrXU3P5dWledQpYjxEvavS58SPtz03M8wvsgajaVLhcimmJIUUYUDad06V6HQosmPoj3TPRNjg7bgniQlooIwyFWfz8KfkM5Tdh7R&client_id=zVs3J7FZupB3TLPskQOy1xHLwYTRkzUSf2rdTDCu&refresh_token=${ref}`
    return this.getToken(payload).subscribe(res=>{
      console.log(res['access_token'])
      this.token=res['access_token']
      this.refresh_token=res['refresh_token']
      localStorage.setItem('auth_token', this.token)
      localStorage.setItem('refresh_token', this.refresh_token)
       
    },
    err => {
      console.log('ERROR: ' ,err.error)
      
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




