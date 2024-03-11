import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password-confirm',
  templateUrl: './reset-password-confirm.component.html',
  styleUrl: './reset-password-confirm.component.scss'
})
export class ResetPasswordConfirmComponent implements OnInit {
  id!: number;
  private _passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  password: FormControl = new FormControl('', [Validators.required, Validators.pattern(this._passwordPattern)])
  constructor(private _activatedRoute: ActivatedRoute, private _authService: AuthService) {}
  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.params["id"];
  }

  handleSubmit() {
    if(this.password.valid) {
      this._authService.resetPassword(this.password.value, this.id).subscribe(res => console.log(res)
      )
    }
  }

}
