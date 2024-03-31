import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router:Router,private service:UserService){}

  username:string="";
  password:string="";
  errorMessageLogin:string="";

  login(){
    if(this.username == "" || this.password == ""){
      this.errorMessageLogin = "Morate uneti sve podatke!";
      return;
    }

    this.service.login(this.username,this.password).subscribe(
      data=>{
        if(data==null){
          this.errorMessageLogin="Pogresni kredencijali!";
          return;
        }else{
          
          localStorage.setItem("loggedUser",JSON.stringify(data));
          this.errorMessageLogin="";
          this.router.navigate(["home"]);
        }
      }
    )
  }

}
