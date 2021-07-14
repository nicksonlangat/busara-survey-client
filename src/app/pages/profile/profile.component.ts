import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any
  token=localStorage.getItem('auth_token')

  constructor(private auth:AuthService, private router:Router){
   
  }

  ngOnInit(): void {
    if (this.token==null){
      this.router.navigate(['/login'])
    }
    
    this.auth.getCurrentUser().subscribe(res=>{
      // console.log(res)
      this.user=res

    })

    this.nav()
  }

  nav(){
    let hamburger = document.getElementById('hamburgerbtn');

    let mobileMenu = document.getElementById('mobileMenu');

    hamburger.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
    });
}

  

}
