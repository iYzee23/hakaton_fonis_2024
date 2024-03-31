import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Interview } from '../models/interview';

@Component({
  selector: 'app-interviewfeedback',
  templateUrl: './interviewfeedback.component.html',
  styleUrls: ['./interviewfeedback.component.css']
})
export class InterviewfeedbackComponent implements OnInit{
  constructor (private router:Router,private service:UserService){}

  ngOnInit(): void {
    let y = localStorage.getItem("loggedUser");
    if(y) this.user = JSON.parse(y);

    let z = localStorage.getItem("viewedSimulation");
    if(z) this.interview = JSON.parse(z);

    if(this.user.korime == this.interview.ucesnik1){
      //mi smo ucesnik1, sagovornik nam je ucesnik2
      this.sagovornik = this.interview.ucesnik2;
    }
    else{
      this.sagovornik = this.interview.ucesnik1;
    } 
  }

  user:User=new User();
  interview:Interview = new Interview();
  sagovornik:String="";

  nazad(){
    this.router.navigate(["interviews"]);
  }

}
