import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { InterviewsComponent } from './interviews/interviews.component';
import { PairProgrammingComponent } from './pair-programming/pair-programming.component';
import { JitsimeetComponent } from './jitsimeet/jitsimeet.component';

const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"home",component:HomeComponent},
  {path:"interviews",component:InterviewsComponent},
  {path:"jitsi",component:JitsimeetComponent},
  {path:"pairProgramming",component:PairProgrammingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
