import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {

  email: FormControl = new FormControl('', [Validators.required, Validators.email])
  constructor(private _authService: AuthService){}
  ngOnInit(): void {
    
    
  }

  handleSubmit() {
    if (this.email.valid) {
      this._authService.requestResetPassword(this.email.value).subscribe(res => console.log(res)
    )
    }
  }

  
}
