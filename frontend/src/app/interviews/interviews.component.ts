import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Interview } from '../models/interview';
import { User } from '../models/user';
import { CalendarOptions, EventInput } from 'fullcalendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { Availability } from '../models/availability';
import { TranslationSynthesisResult } from 'microsoft-cognitiveservices-speech-sdk';

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.css']
})
export class InterviewsComponent implements OnInit {
  constructor(private router: Router, private service: UserService) { }

  prviDiv: any;
  drugiDiv: any;
  firstOpen: boolean = true;
  selectedType: string = "HR";
  requestMessage: string = "";
  privremen: Interview = new Interview();
  flag:boolean = false;

  delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async test() {
    if (this.firstOpen) {
      const optionSelected: boolean = window.confirm("Please choose an option:\n\n1. HR (OK button) \n2. Technical (Cancel button)");

      if (optionSelected) {
        this.selectedType = "HR"
      } else {
        this.selectedType = "Technical";
      }

          //ovde ide logika generisanja zahteva/uparivanja sa postojecim
    let neupareni = this.service.getUnpairedInterview(this.selectedType).subscribe(
      data => {
        if (data != null) {
          alert(data)
          if (data.length % 2 == 0) {
            this.requestMessage = "Your request has been received. The call will appear in your call list and calendar as soon as someone is paired with you.";

            let nova = new Interview();
            let cnt = 10;
            if (this.selectedType = "HR") {
              for (let i = 0; i < 10; i++) {
                const num = 1 + Math.floor(Math.random() * 58);
                this.service.getQuestions(num).subscribe(
                  data => {
                    console.log(data);
                    nova.pitanja.push(data.question);
                    if (--cnt === 0) {
                      nova.ucesnik1 = this.user.korime;
                      nova.status = "pending";
                      nova.tip = this.selectedType;
                      this.service.createInterviewRequest(nova).subscribe();
                    }
                  }
                );
              }
            } else {
              let cntt = 10;
              for (let i = 0; i < 10; i++) {
                const num = 59 + Math.floor(Math.random() * 30);
                this.service.getQuestions(num).subscribe(
                  data => {
                    nova.pitanja.push(data.question);
                    if (--cnt === 0) {
                      nova.ucesnik1 = this.user.korime;
                      nova.status = "pending";
                      nova.tip = this.selectedType;
                      this.service.createInterviewRequest(nova).subscribe();
                    }
                  }
                );
              }


            }


          } else {
            alert("ima neki");
            //uzmemo poslednji podatak tj onaj na poziciji data.length-1 zapravo 
            //njemu azuriramo status i ucesnik1

            this.privremen = data[data.length - 1];
            this.privremen.ucesnik2 = this.user.korime;
            this.privremen.status = "potvrdjen";
            this.flag = true;

            //this.service.pairInterview(this.privremen).subscribe();
            //SACEMO DA SE MUCIMO SA TUDJIM KALENDAROM ----------------------------------------------------------------------------------

            this.service.getPotvrdjeneSimulacije(this.privremen.ucesnik1).subscribe(
              async data => {
                if (data != null) {
                  this.confirmedSimulationsPaired = data;

                  this.confirmedSimulationsPaired = data.filter(element => {
                    if (element.datum < this.danasnjiDatum) return 0;
                    else if (element.datum > this.danasnjiDatum) return 1;
                    else {
                      if (element.vreme < this.vreme) return 0;
                      else return 1;
                    }
                  })
        
                  let tridana = this.narednaTriDana(this.danasnjiDan());
                  //let tridana = this.narednaTriDana("2024-03-30"); //for testing purposes je hardcoded
                  this.danasnjiDatum = "2024-03-31"; //for testing purposes
                  this.vreme = "19:22";
        
                  this.confirmedSimulationsPaired = this.confirmedSimulationsPaired.filter(element => tridana.includes(element.datum));
                  this.confirmedSimulationsPaired = this.confirmedSimulationsPaired.filter(element => {
                    if (element.datum == this.danasnjiDatum) {
                      if (element.vreme > this.vreme) return 1;
                      else return 0;
                    } else return 1;
                  });
        
        
                  //KALENDAR
                  
                  for (let i = 0; i < this.confirmedSimulationsPaired.length; i++) {
                    let datumVremePocetka = new Date(this.confirmedSimulationsPaired[i].datum);
                    let sati = this.confirmedSimulationsPaired[i].vreme.split(':')[0];
                    let minuti = this.confirmedSimulationsPaired[i].vreme.split(':')[1];
                    datumVremePocetka.setHours(parseInt(sati));
                    datumVremePocetka.setMinutes(parseInt(minuti));
        
                    let datumVremeKraja = new Date(this.confirmedSimulationsPaired[i].datum);
                    sati = this.confirmedSimulationsPaired[i].vremeKraja.split(':')[0];
                    minuti = this.confirmedSimulationsPaired[i].vremeKraja.split(':')[1];
                    datumVremeKraja.setHours(parseInt(sati));
                    datumVremeKraja.setMinutes(parseInt(minuti));
                    this.kalendarEventsPaired.push(
                      {
                        title: ("Simulation : ( " + this.confirmedSimulationsPaired[i].tip + " )"),
                        start: datumVremePocetka,
                        end: datumVremeKraja,
                        color: '#043c2c'
                      }
                    );
        
                  }
        
                  for (let i = 0; i < this.previousSimulationsPaired.length; i++) {
                    let datumVremePocetka = new Date(this.previousSimulationsPaired[i].datum);
                    let sati = this.previousSimulationsPaired[i].vreme.split(':')[0];
                    let minuti = this.previousSimulationsPaired[i].vreme.split(':')[1];
                    datumVremePocetka.setHours(parseInt(sati));
                    datumVremePocetka.setMinutes(parseInt(minuti));
        
                    let datumVremeKraja = new Date(this.previousSimulationsPaired[i].datum);
                    sati = this.previousSimulationsPaired[i].vremeKraja.split(':')[0];
                    minuti = this.previousSimulationsPaired[i].vremeKraja.split(':')[1];
                    datumVremeKraja.setHours(parseInt(sati));
                    datumVremeKraja.setMinutes(parseInt(minuti));
                    this.kalendarEventsPaired.push(
                      {
                        title: ("Simulation : ( " + this.previousSimulationsPaired[i].tip + " )"),
                        start: datumVremePocetka,
                        end: datumVremeKraja,
                        color: '#043c2c'
                      }
                    );
        
                  }
        
                  await this.service.getAvailability(this.privremen.ucesnik1).subscribe(
                    data => {
                      if (data != null) {
                        data.forEach(element => {
        
                          let datumVremePocetka = new Date(element.datum);
                          let sati = element.pocetakRada.split(':')[0];
                          let minuti = element.pocetakRada.split(':')[1];
        
                          let datumVremeKraja = new Date(element.datum);
                          let satiKraj = element.krajRada.split(':')[0];
                          let minutiKraj = element.krajRada.split(':')[1];
        
                          let startNeradno1 = new Date(element.datum);
                          startNeradno1.setHours(0);
                          startNeradno1.setMinutes(0);
        
                          let endNeradno1 = new Date(element.datum);
                          endNeradno1.setHours(parseInt(sati));
                          endNeradno1.setMinutes(parseInt(minuti));
        
                          let startNeradno2 = new Date(element.datum);
                          startNeradno2.setHours(parseInt(satiKraj));
                          startNeradno2.setMinutes(parseInt(minutiKraj));
        
                          let endNeradno2 = new Date(element.datum);
                          endNeradno2.setHours(23);
                          endNeradno2.setMinutes(59);
        
                          this.kalendarEventsPaired.push(
                            {
                              title: "Unavailable",
                              start: startNeradno1,
                              end: endNeradno1,
                              color: '#b35f56'
                            }
                          )
        
                          this.kalendarEventsPaired.push(
                            {
                              title: "Unavailable",
                              start: startNeradno2,
                              end: endNeradno2,
                              color: '#b35f56'
                            }
                          )
        
                        });
                        this.kalendarOptionsPaired.events = this.kalendarEventsPaired;
                      }
                    }
                  )
                }
              }
            )
            

          }
        } else {
          this.requestMessage = "Your request has been received. The call will appear in your call list and calendar as soon as someone is paired with you.";

          let nova = new Interview();
          if (this.selectedType = "HR") {
            for (let i = 0; i < 10; i++) {
              const num = 1 + Math.floor(Math.random() * 58);
              this.service.getBotSve(num).subscribe(
                data => {
                  nova.pitanja.push(data.pitanje);
                }
              );
            }
          } else {
            for (let i = 0; i < 10; i++) {
              const num = 59 + Math.floor(Math.random() * 30);
              this.service.getBotSve(num).subscribe(
                data => {
                  nova.pitanja.push(data.pitanje);
                }
              );
            }
          }

          nova.ucesnik1 = this.user.korime;
          nova.status = "pending";
          nova.tip = this.selectedType;

          this.service.createInterviewRequest(nova).subscribe();
        }
      }
    )

      this.prviDiv.classList.toggle("fade-in");
      this.prviDiv.classList.toggle("fade-out");
      await this.delay(500);
      this.drugiDiv.classList.toggle("fade-out");
      this.drugiDiv.classList.toggle("fade-in");
      this.firstOpen = false;
    } else {
      this.drugiDiv.classList.toggle("fade-in");
      this.drugiDiv.classList.toggle("fade-out");
      await this.delay(500);
      this.prviDiv.classList.toggle("fade-out");
      this.prviDiv.classList.toggle("fade-in");
      this.firstOpen = true;
    }
  }


  kalendarOptions: CalendarOptions = {
    initialView: "timeGridWeek",
    plugins: [timeGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'timeGridWeek,timeGridDay'
    },
    events: [],
    dateClick: this.handleDateClick.bind(this)
  };

  kalendarEvents: EventInput[] = [];

  handleDateClick(arg: DateClickArg) {

  }


  kalendarOptionsPaired: CalendarOptions = {
    initialView: "timeGridWeek",
    plugins: [timeGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'timeGridWeek,timeGridDay'
    },
    events: [],
    dateClick: this.handleDateClickPaired.bind(this)
  };

  kalendarEventsPaired: EventInput[] = [];


  datumP:string="";
  datumvremeP:string="";
  vremeP:string="";

  handleDateClickPaired(arg:DateClickArg){
    let datumSaKalendara = arg.date;

    let godina = datumSaKalendara.getFullYear();
    let mesec = datumSaKalendara.getMonth()+1;
    let dan = datumSaKalendara.getDate();

    this.datumP = godina.toString() + "-" + mesec.toString().padStart(2,"0") + "-" + dan.toString().padStart(2,"0");

    let sati = datumSaKalendara.getHours();
    let minuti = datumSaKalendara.getMinutes();

    this.vremeP = sati.toString().padStart(2,"0")+ ":" + minuti.toString().padStart(2,"0");

    this.datumvremeP = this.datumP+"T"+this.vreme+":00";
  }

  schedule(){
    
    if (this.datumvremeP == "" && this.datumP=="" && this.vremeP=="" ) {
      alert("Please select date and time in the calendar first");
      return;
    }

    this.privremen.datum=this.datumP;
    this.privremen.vreme = this.vremeP;
    this.privremen.vremeKraja = this.satKasnije(this.vremeP);
    this.service.pairInterview(this.privremen).subscribe();

  }

  satKasnije(vreme: string): string {
    let delovi = vreme.split(":");
    let sati = delovi[0];
    let minuti = delovi[1];

    let satiK = parseInt(sati) + 1;
    if (satiK < 0) satiK += 24;

    let satKasnije = satiK.toString().padStart(2, "0") + ":" + minuti;
    return satKasnije;
  }

  ngOnInit(): void {
    this.prviDiv = document.querySelector("#prvi");
    this.drugiDiv = document.querySelector('#drugi');

    let y = localStorage.getItem("loggedUser");
    if (y) this.user = JSON.parse(y);
    this.danasnjiDatum = this.danasnjiDan();
    this.vreme = this.trenutnoVreme();

    this.service.getPotvrdjeneSimulacije(this.user.korime).subscribe(
      async data => {
        if (data != null) {
          this.confirmedSimulations = data;
          this.previousSimulations = data.filter(element => {
            if (element.datum < this.danasnjiDatum) return 1;
            else if (element.datum > this.danasnjiDatum) return 0;
            else {
              if (element.vreme < this.vreme) return 1;
              else return 0;
            }
          })

          let tridana = this.narednaTriDana(this.danasnjiDan());
          //let tridana = this.narednaTriDana("2024-03-30"); //for testing purposes je hardcoded
          this.danasnjiDatum = "2024-03-31"; //for testing purposes
          this.vreme = "19:22";

          this.confirmedSimulations = this.confirmedSimulations.filter(element => tridana.includes(element.datum));
          this.confirmedSimulations = this.confirmedSimulations.filter(element => {
            if (element.datum == this.danasnjiDatum) {
              if (element.vreme > this.vreme) return 1;
              else return 0;
            } else return 1;
          });


          //KALENDAR
          for (let i = 0; i < this.confirmedSimulations.length; i++) {
            let datumVremePocetka = new Date(this.confirmedSimulations[i].datum);
            let sati = this.confirmedSimulations[i].vreme.split(':')[0];
            let minuti = this.confirmedSimulations[i].vreme.split(':')[1];
            datumVremePocetka.setHours(parseInt(sati));
            datumVremePocetka.setMinutes(parseInt(minuti));

            let datumVremeKraja = new Date(this.confirmedSimulations[i].datum);
            sati = this.confirmedSimulations[i].vremeKraja.split(':')[0];
            minuti = this.confirmedSimulations[i].vremeKraja.split(':')[1];
            datumVremeKraja.setHours(parseInt(sati));
            datumVremeKraja.setMinutes(parseInt(minuti));
            this.kalendarEvents.push(
              {
                title: ("Simulation : ( " + this.confirmedSimulations[i].tip + " )"),
                start: datumVremePocetka,
                end: datumVremeKraja,
                color: '#043c2c'
              }
            );

          }

          for (let i = 0; i < this.previousSimulations.length; i++) {
            let datumVremePocetka = new Date(this.previousSimulations[i].datum);
            let sati = this.previousSimulations[i].vreme.split(':')[0];
            let minuti = this.previousSimulations[i].vreme.split(':')[1];
            datumVremePocetka.setHours(parseInt(sati));
            datumVremePocetka.setMinutes(parseInt(minuti));

            let datumVremeKraja = new Date(this.previousSimulations[i].datum);
            sati = this.previousSimulations[i].vremeKraja.split(':')[0];
            minuti = this.previousSimulations[i].vremeKraja.split(':')[1];
            datumVremeKraja.setHours(parseInt(sati));
            datumVremeKraja.setMinutes(parseInt(minuti));
            this.kalendarEvents.push(
              {
                title: ("Simulation : ( " + this.previousSimulations[i].tip + " )"),
                start: datumVremePocetka,
                end: datumVremeKraja,
                color: '#043c2c'
              }
            );

          }

          await this.service.getAvailability(this.user.korime).subscribe(
            data => {
              if (data != null) {
                data.forEach(element => {

                  let datumVremePocetka = new Date(element.datum);
                  let sati = element.pocetakRada.split(':')[0];
                  let minuti = element.pocetakRada.split(':')[1];

                  let datumVremeKraja = new Date(element.datum);
                  let satiKraj = element.krajRada.split(':')[0];
                  let minutiKraj = element.krajRada.split(':')[1];

                  let startNeradno1 = new Date(element.datum);
                  startNeradno1.setHours(0);
                  startNeradno1.setMinutes(0);

                  let endNeradno1 = new Date(element.datum);
                  endNeradno1.setHours(parseInt(sati));
                  endNeradno1.setMinutes(parseInt(minuti));

                  let startNeradno2 = new Date(element.datum);
                  startNeradno2.setHours(parseInt(satiKraj));
                  startNeradno2.setMinutes(parseInt(minutiKraj));

                  let endNeradno2 = new Date(element.datum);
                  endNeradno2.setHours(23);
                  endNeradno2.setMinutes(59);

                  this.kalendarEvents.push(
                    {
                      title: "Unavailable",
                      start: startNeradno1,
                      end: endNeradno1,
                      color: '#b35f56'
                    }
                  )

                  this.kalendarEvents.push(
                    {
                      title: "Unavailable",
                      start: startNeradno2,
                      end: endNeradno2,
                      color: '#b35f56'
                    }
                  )

                });
                this.kalendarOptions.events = this.kalendarEvents;
              }
            }
          )
        }
      }
    )
  }

  user: User = new User();
  danasnjiDatum: string = "";
  vreme: string = "";

  confirmedSimulations: Interview[] = [];
  previousSimulations: Interview[] = [];

  confirmedSimulationsPaired: Interview[] = [];
  previousSimulationsPaired: Interview[] = [];

  datumRada: string = "";
  pocetakRada: string = "";
  krajRada: string = "";
  errorMessageRadno: string = "";

  danasnjiDan(): string {
    let danas = new Date();

    let godina = danas.getFullYear();
    let mesec = (danas.getMonth() + 1).toString().padStart(2, '0');
    let dan = danas.getDate().toString().padStart(2, '0');

    let danasString = godina + "-" + mesec + "-" + dan;
    return danasString;
  }

  trenutnoVreme(): string {
    let sada = new Date();

    let sati = sada.getHours();
    let minuta = sada.getMinutes();

    let sadaString = sati.toString().padStart(2, "0") + ":" + minuta.toString().padStart(2, "0");
    return sadaString;
  }

  narednaTriDana(danas: string): string[] {
    let danasnjiDan = new Date(danas);
    let narednaTri: string[] = [];

    let ms = 24 * 60 * 60 * 1000;

    for (let i = 0; i < 3; i++) {
      let naredni = new Date(danasnjiDan.getTime() + i * ms);
      let naredniString = naredni.toISOString().split("T")[0];
      narednaTri.push(naredniString);
    }

    return narednaTri;
  }

  petnaestMinutaPred(vreme: string): string {
    let delovi = vreme.split(":");
    let sati = delovi[0];
    let minuti = delovi[1];

    let minutaPre = parseInt(minuti) - 15;
    if (minutaPre < 0) {
      minutaPre += 60;
      sati = (parseInt(sati) - 1).toString().padStart(2, "0");
    }

    let vremeRanije = sati.toString().padStart(2, "0") + ":" + minutaPre.toString().padStart(2, "0");
    return vremeRanije;
  }

  enterSimulation(simulation: Interview) {
    localStorage.setItem("joinedSimulation", JSON.stringify(simulation));
    this.router.navigate(["jitsi"]);
  }

  showFeedback(simulation: Interview) {
    localStorage.setItem("viewedSimulation", JSON.stringify(simulation));
    this.router.navigate(["feedback"]);
  }

  logout() {
    localStorage.clear();
    this.router.navigate([""]);
  }

  definisiRadno() {
    if (this.datumRada == "" || this.pocetakRada == "" || this.krajRada == "") {
      this.errorMessageRadno = "Please input a date, start and end time of your availability!";
      return;
    }

    if (this.datumRada < this.danasnjiDatum) {
      //ogranicenje: ne moze danas za ranije ovo da menja
      this.errorMessageRadno = "You cannot change your availability in the past!";
      return;
    }

    let valja = true;

    let casovi = this.confirmedSimulations;
    casovi = casovi.filter(element => element.datum == this.datumRada);

    //proveriti preklapanje sa vec zakazanim tj. potvrdjenim casovima
    casovi.forEach(element => {
      let pocetakCasa = element.vreme;
      let krajCasa = element.vremeKraja;

      if (this.pocetakRada > pocetakCasa) {
        this.errorMessageRadno = "You have a call scheduled! No cancelling!";
        valja = false;
        return;
      }

      if (this.krajRada >= pocetakCasa && this.krajRada < krajCasa) {
        this.errorMessageRadno = "You have a call scheduled! No cancelling!";
        valja = false;
        return;
      }

    });

    if (!valja) return;

    this.errorMessageRadno = "";

    //moze da stavi da ne radi
    let novoradno = new Availability();
    novoradno.datum = this.datumRada;
    novoradno.korime = this.user.korime;
    novoradno.pocetakRada = this.pocetakRada;
    novoradno.krajRada = this.krajRada;

    this.service.definisiAvailability(novoradno).subscribe(
      data => {
        if (data != null) {
          this.ngOnInit();
          window.location.reload()
        }
      }
    )

  }
}
