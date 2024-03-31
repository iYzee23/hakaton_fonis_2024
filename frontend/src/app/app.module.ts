import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { InterviewsComponent } from './interviews/interviews.component';
import { PairProgrammingComponent } from './pair-programming/pair-programming.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JitsimeetComponent } from './jitsimeet/jitsimeet.component';
import { InterviewfeedbackComponent } from './interviewfeedback/interviewfeedback.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { InterviewsPairComponent } from './interviews-pair/interviews-pair.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    InterviewsComponent,
    PairProgrammingComponent,
    JitsimeetComponent,
    InterviewfeedbackComponent,
    ChatbotComponent,
    InterviewsPairComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
