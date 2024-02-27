import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './shared/material/material.module';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { ExpansionPanelComponent } from './components/expansion-panel/expansion-panel.component';
import { FrenchDatePipe } from './pipes/french-date.pipe';


@NgModule({
  declarations: [AppComponent, HomeComponent, SnackbarComponent],
  imports: [AppRoutingModule, SharedModule, MaterialModule, HttpClientModule, ReactiveFormsModule, BrowserModule, BrowserAnimationsModule, CommonModule, ExpansionPanelComponent],

  providers: [
    provideAnimations()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
