import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Chatbot } from '../models/chatbot';
// import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk'

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  status = 'Initializing...';
  questions = [1, 2, 4, 5];
  chbot: Chatbot = new Chatbot();
  answer: string = "";
  feedback: string = ""

  constructor(private router:Router,private service:UserService) {}

  splitIntoBullets(text: string): string {
    const sentences = text.split('.').map(sentence => sentence.trim()).filter(sentence => sentence.length > 0);
    const bulletPoints = sentences.map(sentence => `- ${sentence}`).join('\n');
    return bulletPoints;
  }

  ngOnInit() {
    this.generateHRQuestion();
  }

  generateHRQuestion() {
    const num = Math.floor(Math.random() * 2);
    this.service.getBotSve(this.questions[num]).subscribe(
      data => {
        this.chbot = data;
        this.answer = "";
        this.feedback = "";
      }
    );
  }

  generateTCHQuestion() {
    const num = 2 + Math.floor(Math.random() * 2);
    this.service.getBotSve(this.questions[num]).subscribe(
      data => {
        this.chbot = data;
        this.answer = "";
        this.feedback = "";
      }
    );
  }

  /*
  async startListening() {
    const subscriptionKey = '542f3fbc78cb4616bf450c37a33b85e2';
    const serviceRegion = 'northeurope';
    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
    speechConfig.speechRecognitionLanguage = 'en-US';
  
    const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
  
    recognizer.recognized = (s, e) => {
      if (e.result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
        console.log(`RECOGNIZED: Text=${e.result.text}`);
        this.status = `Recognized: ${e.result.text}`;
        this.answer = this.chbot.pitanje;
        setTimeout(() => {
          this.feedback = this.chbot.odgovor;
        }, 1500);
        
        // Stop the recognizer after recognizing speech
        recognizer.stopContinuousRecognitionAsync(
          () => console.log('Recognition stopped'),
          err => console.error('Error stopping recognition: ', err)
        );
      } else if (e.result.reason === SpeechSDK.ResultReason.NoMatch) {
        console.log('NOMATCH: Speech could not be recognized.');
        this.status = 'No match found.';
      }
    };
  
    recognizer.startContinuousRecognitionAsync(
      () => {
        console.log('Recognition started');
        this.status = 'Listening...';
      },
      err => {
        console.error('Error starting recognition: ', err);
        this.status = 'Error starting recognition.';
      },
    );
  }
  */

  
  logout(){
    localStorage.clear();
    this.router.navigate([""]);
  }

}
