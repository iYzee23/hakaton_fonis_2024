import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor (private router:Router,private service:UserService){}

  
  logout(){
    localStorage.clear();
    this.router.navigate([""]);
  }
}
