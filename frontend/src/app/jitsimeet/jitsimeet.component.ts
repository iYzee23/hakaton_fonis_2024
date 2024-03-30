import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Interview } from '../models/interview';
declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-jitsimeet',
  templateUrl: './jitsimeet.component.html',
  styleUrls: ['./jitsimeet.component.css']
})
export class JitsimeetComponent {
  constructor( private router: Router) { }

  
  ngOnInit(): void {
    let cm = localStorage.getItem("joinedSimulation");
    if(cm) this.interview=JSON.parse(cm);
    let i = 0;
    while(i<5) this.pitanja1.push(this.interview.pitanja[i]);
    while(i<10) this.pitanja2.push(this.interview.pitanja[i]);

    let kr = localStorage.getItem("loggedUser");
    if(kr) this.ulogovan = JSON.parse(kr);

    this.room = 'Simulation-' + this.interview.id;
    this.user = {
        name: this.ulogovan.ime + " " + this.ulogovan.prezime,
    }
  }

  domain: string = "meet.jit.si"; 
  room: any;
  options: any;
  api: any;
  user: any;

  interview:Interview=new Interview();
  pitanja1:String[]=[];
  pitanja2:String[]=[];

  ulogovan:User=new User();

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
        this.router.navigate([""]);
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
       this.router.navigate([""]);

      return;
    }

    if(command == 'toggleAudio') {
      this.isAudioMuted = !this.isAudioMuted;
    }

    if(command == 'toggleVideo') {
        this.isVideoMuted = !this.isVideoMuted;
    }
}
}
