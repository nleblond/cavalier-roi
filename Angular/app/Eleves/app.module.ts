import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http'; 

import { AppComponent } from './app.component';
//export * from './Models/Eleve';

@NgModule({
    imports: [BrowserModule, HttpModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
})
export class AppModule { }


