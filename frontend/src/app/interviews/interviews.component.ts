import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Interview } from '../models/interview';
import { User } from '../models/user';

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.css']
})
export class InterviewsComponent implements OnInit{
  constructor (private router:Router,private service:UserService){}
 
  ngOnInit(): void {
    let y = localStorage.getItem("loggedUser");
    if(y) this.user = JSON.parse(y);
    this.danasnjiDatum = this.danasnjiDan();
    this.vreme = this.trenutnoVreme();

    this.service.getPotvrdjeneSimulacije(this.user.korime).subscribe(
      data=>{
        if(data!=null){
          this.confirmedSimulations = data;
          alert("ima")
        }else{
          alert(this.user.korime)
        }
      }
    )
  }

  user:User=new User();
  danasnjiDatum:string="";
  vreme:string="";

  confirmedSimulations:Interview[]=[];

  danasnjiDan():string{
    let danas = new Date();

    let godina = danas.getFullYear();
    let mesec = (danas.getMonth()+1).toString().padStart(2,'0');
    let dan = danas.getDate().toString().padStart(2,'0');

    let danasString = godina+"-"+mesec+"-"+dan;
    return danasString;
  }

  trenutnoVreme():string{
    let sada = new Date();

    let sati = sada.getHours();
    let minuta = sada.getMinutes();

    let sadaString = sati.toString().padStart(2,"0") + ":" + minuta.toString().padStart(2,"0");
    return sadaString;
  }

  narednaTriDana(danas:string):string[]{
    let danasnjiDan = new Date(danas);
    let narednaTri:string[]=[];

    let ms = 24*60*60*1000;

    for(let i=0; i<3; i++){
      let naredni = new Date(danasnjiDan.getTime()+i*ms);
      let naredniString = naredni.toISOString().split("T")[0];
      narednaTri.push(naredniString);
    }

    return narednaTri;
  }

  petnaestMinutaPred(vreme:string):string{
    let delovi = vreme.split(":");
    let sati = delovi[0];
    let minuti = delovi[1];

    let minutaPre = parseInt(minuti)-15;
    if(minutaPre<0){
      minutaPre +=60;
      sati = (parseInt(sati) -1).toString().padStart(2,"0");
    }

    let vremeRanije = sati.toString().padStart(2,"0") + ":" + minutaPre.toString().padStart(2,"0");
    return vremeRanije;
  }

  enterSimulation(simulation:Interview){
    localStorage.setItem("joinedSimulation",JSON.stringify(simulation));
    this.router.navigate(["jitsi"]);
  }

  logout(){
    localStorage.clear();
    this.router.navigate([""]);
  }
}
