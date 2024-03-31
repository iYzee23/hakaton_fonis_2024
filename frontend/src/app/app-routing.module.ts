import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { InterviewsComponent } from './interviews/interviews.component';
import { PairProgrammingComponent } from './pair-programming/pair-programming.component';
import { JitsimeetComponent } from './jitsimeet/jitsimeet.component';
import { InterviewfeedbackComponent } from './interviewfeedback/interviewfeedback.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { InterviewsPairComponent } from './interviews-pair/interviews-pair.component';

const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"home",component:HomeComponent},
  {path:"interviews",component:InterviewsComponent},
  {path:"jitsi",component:JitsimeetComponent},
  {path:"feedback",component:InterviewfeedbackComponent},
  {path:"pairProgramming",component:InterviewsPairComponent},
  {path:"pairProgrammingConcrete",component:PairProgrammingComponent},
  {path:"chatbot",component:ChatbotComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
