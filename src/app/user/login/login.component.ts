import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginForm } from '../../models/auth.model';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  private _mailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  private _passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  loginForm!: FormGroup;
  message!: string;
  constructor(private _authService: AuthService, private _formBuilder: FormBuilder, private _modalService: ModalService, private _snackBar: MatSnackBar) {
  }
  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this._mailPattern)]],
      password: ['', [Validators.required, Validators.pattern(this._passwordPattern)]]
    })
  }

  login() {

  }

  handleSubmit() {
    if (this.loginForm.valid) {
      const loginForm: LoginForm = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      }

      this._authService.login(loginForm).subscribe({
        next: (token) => {
          console.log(token)
          this.closeModal();
          this._openSnackBar()
        },
        error: (err) => console.log(err)
        
      })
    }
    
  }

  closeModal(){
    this._modalService.closeModal();
  }

  private _openSnackBar() {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: 1000,
      data: "Connecté"
    });
  }
}
