import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { OverlayModule } from '@angular/cdk/overlay';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MonacoEditorModule } from 'ngx-monaco-editor';
import { CookieService } from 'ngx-cookie-service';
import { AgGridModule } from 'ag-grid-angular';
import { NgxMdModule } from 'ngx-md';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { UiModule } from './ui/ui.module';
import { HomeComponent } from './components/home/home.component';
import { ContestComponent } from './components/contest/contest.component';
import { ContestsComponent } from './components/contests/contests.component';
import { AddcontestComponent } from './components/addcontest/addcontest.component';
import { ResultComponent } from './components/result/result.component';
import { ResultsComponent } from './components/results/results.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';

import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-javascript';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    UiModule,
    NgxMdModule.forRoot(),
    MonacoEditorModule.forRoot(),
    AgGridModule.withComponents(
      [ContestsComponent]
    ),
    MatProgressSpinnerModule,
    OverlayModule,
    NgbModule.forRoot(),
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  entryComponents: [
    MatSpinner
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    ContestsComponent,
    AddcontestComponent,
    ContestComponent,
    LoginComponent,
    UsersComponent,
    ResultsComponent,
    ResultComponent
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
