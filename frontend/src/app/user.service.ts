import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/user';
import { Interview } from './models/interview';
import { Chatbot } from './models/chatbot';
import { Availability } from './models/availability';
import { Question } from './models/question';
import { PairProgramming } from './models/pair_programming';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getPotvrdjeniPairProgr(username:string){
    return this.http.post<PairProgramming[]>(`http://localhost:4000/users/getPotvrdjeniPairProgr`,{username:username});
  }
  
  runCode(code:string){
    return this.http.post(`http://localhost:4000/users/run`,{code:code});
  }

  getBotSve(rb:number){
    return this.http.post<Chatbot>(`http://localhost:4000/users/getBotSve`,{rb:rb});
  }

  login(username:string,password:string){
    return this.http.post<User>(`http://localhost:4000/users/login`,{username:username,password:password});
  }

  getPotvrdjeneSimulacije(username:string){
    return this.http.post<Interview[]>(`http://localhost:4000/users/getPotvrdjeneSimulacije`,{username:username});
  }

  getPotvrdjeneSimulacijePair(username:string){
    return this.http.post<PairProgramming[]>(`http://localhost:4000/users/getPotvrdjeneSimulacijePair`,{username:username});
  }


  postaviFeedbackSimulacije(id:number,feedback:string[]){
    return this.http.post(`http://localhost:4000/users/postaviFeedbackSimulacije`,{id:id,feedback:feedback});
  }

  definisiAvailability(availability:Availability){
    return this.http.post(`http://localhost:4000/users/definisiAvailability`,{availability:availability});
  }

  getAvailability(korime:string){
    return this.http.post<Availability[]>(`http://localhost:4000/users/getAvailability`,{korime:korime});
  }

  getUnpairedInterview(type:string){
    console.log("uso");
    return this.http.post<Interview[]>(`http://localhost:4000/users/getUnpairedInterview`,{type:type});
  }

  createInterviewRequest(interview:Interview){
    return this.http.post(`http://localhost:4000/users/createInterviewRequest`,{interview:interview});
  }

  
  pairInterview(interview:Interview){
    return this.http.post(`http://localhost:4000/users/pairInterview`,{interview:interview});
  }

  getQuestions(rb:number){
    return this.http.post<Question>(`http://localhost:4000/users/getQuestions`,{rb:rb});
  }

  getUnpairedInterviewPair(type:string){
    console.log("uso");
    return this.http.post<PairProgramming[]>(`http://localhost:4000/users/getUnpairedInterviewPair`,{type:type});
  }

  createInterviewPairRequest(interview:PairProgramming){
    return this.http.post(`http://localhost:4000/users/createInterviewPairRequest`,{interview:interview});
  }

  
  pairInterviewPair(interview:PairProgramming){
    return this.http.post(`http://localhost:4000/users/pairInterviewPair`,{interview:interview});
  }

  getQuestionPair(rb:number){
    return this.http.post<Question>(`http://localhost:4000/users/getQuestionPair`,{rb:rb});
  }

}
