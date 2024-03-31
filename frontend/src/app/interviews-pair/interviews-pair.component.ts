import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Interview } from '../models/interview';
import { User } from '../models/user';
import { PairProgramming } from '../models/pair_programming';

@Component({
  selector: 'app-interviews-pair',
  templateUrl: './interviews-pair.component.html',
  styleUrls: ['./interviews-pair.component.css']
})
export class InterviewsPairComponent implements OnInit {
  constructor (private router:Router,private service:UserService){}
 
  prviDiv:any;
  drugiDiv:any;
  firstOpen:boolean=true;

  delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async test(){
    if(this.firstOpen){
      this.prviDiv.classList.toggle("fade-in");
      this.prviDiv.classList.toggle("fade-out");
      await this.delay(500);
      this.drugiDiv.classList.toggle("fade-out");
      this.drugiDiv.classList.toggle("fade-in");
      this.firstOpen=false;
    }else{
      this.drugiDiv.classList.toggle("fade-in");
      this.drugiDiv.classList.toggle("fade-out");
      await this.delay(500);
      this.prviDiv.classList.toggle("fade-out");
      this.prviDiv.classList.toggle("fade-in");
      this.firstOpen=true;
    }
  }

  ngOnInit(): void {
    this.prviDiv = document.querySelector("#prvi");
    this.drugiDiv=document.querySelector('#drugi');

    let y = localStorage.getItem("loggedUser");
    if(y) this.user = JSON.parse(y);
    this.danasnjiDatum = this.danasnjiDan();
    this.vreme = this.trenutnoVreme();

    this.service.getPotvrdjeniPairProgr(this.user.korime).subscribe(
      data=>{
        if(data!=null){
          this.confirmedPairs = data;

          let tridana = this.narednaTriDana(this.danasnjiDan());
          //let tridana = this.narednaTriDana("2024-03-30"); //for testing purposes je hardcoded
          this.danasnjiDatum = "2024-03-31"; //for testing purposes
          this.vreme = "19:22";

          this.confirmedPairs = this.confirmedPairs.filter(element=> tridana.includes(element.datum));
          this.confirmedPairs = this.confirmedPairs.filter(element=>{
            if(element.datum == this.danasnjiDatum){
              if(element.vreme > this.vreme) return 1;
              else return 0;
            }else return 1;
          });
        }
      }
    )
  }

  user:User=new User();
  danasnjiDatum:string="";
  vreme:string="";

  confirmedPairs:PairProgramming[]=[];

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

  enterSimulation(simulation:PairProgramming){
    localStorage.setItem("joinedSimulation",JSON.stringify(simulation));
    this.router.navigate(["pairProgrammingConcrete"]);
  }

  showFeedback(simulation:Interview){
    localStorage.setItem("viewedSimulation",JSON.stringify(simulation));
    this.router.navigate(["feedback"]);
  }

  logout(){
    localStorage.clear();
    this.router.navigate([""]);
  }
}
