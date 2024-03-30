import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/user';
import { Interview } from './models/interview';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  login(username:string,password:string){
    return this.http.post<User>(`http://localhost:4000/users/login`,{username:username,password:password});
  }

  getPotvrdjeneSimulacije(username:string){
    return this.http.post<Interview[]>(`http://localhost:4000/users/getPotvrdjeneSimulacije`,{username:username});
  }
}
