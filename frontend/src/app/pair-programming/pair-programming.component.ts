import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Interview } from '../models/interview';
declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-pair-programming',
  templateUrl: './pair-programming.component.html',
  styleUrls: ['./pair-programming.component.css']
})
export class PairProgrammingComponent implements OnInit {
  constructor (private router:Router,private service:UserService){}

  ngOnInit(): void {
    let cm = localStorage.getItem("joinedSimulation");
    if(cm) this.interview=JSON.parse(cm);
    
    let kr = localStorage.getItem("loggedUser");
    if(kr) this.ulogovan = JSON.parse(kr);

    if(this.ulogovan.korime == this.interview.ucesnik1){
      //mi smo ucesnik1, sagovornik nam je ucesnik2
      this.sagovornik = this.interview.ucesnik2;
    }
    else{
      this.sagovornik = this.interview.ucesnik1;
    } 

    this.room = 'Simulation-' + this.interview.id;
    this.user = {
        name: this.ulogovan.ime + " " + this.ulogovan.prezime,
    }
    console.log(this.user);
  }

  domain: string = "meet.jit.si"; 
  room: any;
  options: any;
  api: any;
  user: any;

  interview:Interview=new Interview();

  ulogovan:User=new User();
  sagovornik:String='';
  feedback:string[]=[];
  errorMessage:String="";

  isAudioMuted = false;
  isVideoMuted = false;

  hangupFlag = false;

  ngAfterViewInit(): void {
    this.options = {
      roomName: this.room,
      width: 900,
      height: 500,
      configOverwrite: { prejoinPageEnabled: false },
      interfaceConfigOverwrite: {},
      parentNode: document.querySelector('#jitsi-iframe'),
      userInfo: {
          displayName: this.user.name
      }
    }

    this.api = new JitsiMeetExternalAPI(this.domain, this.options);

   // Event handlers
    this.api.addEventListeners({
      readyToClose: this.handleClose,
      participantLeft: this.handleParticipantLeft,
      participantJoined: this.handleParticipantJoined,
      videoConferenceJoined: this.handleVideoConferenceJoined,
      videoConferenceLeft: this.handleVideoConferenceLeft,
      audioMuteStatusChanged: this.handleMuteStatus,
      videoMuteStatusChanged: this.handleVideoStatus
    });
  }

  handleClose = () => {
    console.log("handleClose");
  }

  handleParticipantLeft = async (participant: any) => {
      const data = await this.getParticipants();
  }

  handleParticipantJoined = async (participant: any) => {
      const data = await this.getParticipants();
  }

  handleVideoConferenceJoined = async (participant: any) => {
      const data = await this.getParticipants();
  }

  handleVideoConferenceLeft = () => {
      if(this.hangupFlag){
        this.router.navigate(["interviews"]);
      }

  }

  handleMuteStatus = (audio: any) => {
      console.log("handleMuteStatus", audio); 
  }

  handleVideoStatus = (video: any) => {
      console.log("handleVideoStatus", video);
  }

  getParticipants() {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              resolve(this.api.getParticipantsInfo()); 
          }, 500)
      });
  }

  executeCommand(command: string) {
    this.api.executeCommand(command);
    if(command == 'hangup') {
       this.hangupFlag=true;
       this.router.navigate(["pairProgramming"]);

      return;
    }

    if(command == 'toggleAudio') {
      this.isAudioMuted = !this.isAudioMuted;
    }

    if(command == 'toggleVideo') {
        this.isVideoMuted = !this.isVideoMuted;
    }
  } 

  code = '';
  output: string="";

  runCode() {
    this.service.runCode(this.code).subscribe({
      next: (response: any) => {
        this.output = response['output'] || response['error']
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  logout(){
    localStorage.clear();
    this.router.navigate([""]);
  }
}
