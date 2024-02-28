import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterForm } from '../../models/auth.model';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';
import { phoneNumberValidator } from '../../utils/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  message!: string;
  private _mailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  private _passwordPattern =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _modalService: ModalService,
    private _router: Router
  ) {}
  ngOnDestroy(): void {
    
    
  }

  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, phoneNumberValidator()]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(this._mailPattern),
        ],
      ],
      password: [
        '',
        [Validators.required, Validators.pattern(this._passwordPattern)],
      ],
    });
  }

  handleSubmit() {
    console.log(this.registerForm.value);

    if (this.registerForm.valid) {
      const registerForm: RegisterForm = {
        firstName: this.registerForm.get('firstName')?.value,
        lastName: this.registerForm.get('lastName')?.value,
        phoneNumber: this.registerForm.get('phoneNumber')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
      };

      this._authService.register(registerForm).subscribe({
        next: (token) => {
          (this.message = 'Compte crée, vous allez être rediriger ...');
          let timeout = setTimeout(() => {
            this._router.navigate(['/'])
          }, 2000)
        },
        error: (err) => (this.message = 'Erreur')
      });
    }
  }

  closeModal() {
    this._modalService.closeModal();
  }

}
