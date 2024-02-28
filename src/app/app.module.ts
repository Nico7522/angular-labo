import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './shared/material/material.module';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { UserModule } from './user/user.module';


@NgModule({
  declarations: [AppComponent, HomeComponent, SnackbarComponent],
  imports: [AppRoutingModule, SharedModule, MaterialModule, HttpClientModule, ReactiveFormsModule, BrowserModule, BrowserAnimationsModule, CommonModule],

  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: tokenInterceptor, multi: true },
    provideAnimations(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
