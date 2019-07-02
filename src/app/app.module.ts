import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import { AppComponent } from './app.component';
import {MatListModule, MatCardModule} from '@angular/material/';
//import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent
   ],
  imports: [
    // tslint:disable-next-line:max-line-length
    BrowserModule, HttpClientModule, FormsModule, BrowserAnimationsModule , MatFormFieldModule , MatInputModule , MatButtonModule, MatListModule, MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
