import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  token=localStorage.getItem('auth_token')
  show=false
  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
    if (this.token!==null){
      this.show=true;
      console.log(this.show)
    }
   
  }

logout(){
  const data={}
  this.auth.destroyToken(data).subscribe(res=>{
    localStorage.removeItem('auth_token')
    this.router.navigate(['/login'])
   
  })
}
}
