import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-pair-programming',
  templateUrl: './pair-programming.component.html',
  styleUrls: ['./pair-programming.component.css']
})
export class PairProgrammingComponent {
  constructor (private router:Router,private service:UserService){}

  
  logout(){
    localStorage.clear();
    this.router.navigate([""]);
  }
}
