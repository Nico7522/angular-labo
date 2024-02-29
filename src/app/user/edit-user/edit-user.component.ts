import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router,  } from '@angular/router';
import { Subscription } from 'rxjs';
import { EditUserForm, User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { SnackbarService } from '../../services/snackbar.service';
import { UserService } from '../../services/user.service';
import { phoneNumberValidator } from '../../utils/validators';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
})
export class EditUserComponent implements OnInit, OnDestroy {
  editFrom!: FormGroup;
  userId!: number;
  user!: User;
  errorMessage!: string;
  userSub!: Subscription;
  editSub!: Subscription;

  private _mailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  // Edit de l'email appart.
  userEmail = new FormControl('', [
    Validators.required,
    Validators.pattern(this._mailPattern),
  ]);

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _authService: AuthService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _snackbarService: SnackbarService
  ) {}
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    if (this.editSub) {
      this.editSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.editFrom = this._formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, phoneNumberValidator()]],
    });

    this.userId = this._activatedRoute.snapshot.params['id'];
    this.userSub = this._userService.GetById(this.userId).subscribe({
      next: (user) => {
        this.user = user;
        this.editFrom.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
        });
        this.userEmail.setValue(user.email);
      },
    });
  }

  handleSubmitEdit() {
    const editForm: EditUserForm = {
      lastName: this.editFrom.get('lastName')?.value,
      firstName: this.editFrom.get('firstName')?.value,
      phoneNumber: this.editFrom.get('phoneNumber')?.value,
    };
    if (this.editFrom.valid) {
      this.editSub = this._userService
        .edit(this.editFrom.value, this.userId)
        .subscribe({
          next: () => {
            this._snackbarService.openSnackBar('Compte modifiée !');
            setTimeout(() => {
              this._router.navigateByUrl('/user/profil');
            }, 2000);
          },
          error: () => {
            this.errorMessage = "Une erreur s'est produite.";
          },
        });
    }
  }

  handleSubmitEmail() {
    if (this.userEmail.valid) {
      this._authService
        .editEmail(this.userEmail.value!, this.userId)
        .subscribe({
          next: (res) => {
            this._snackbarService.openSnackBar('Email modifiée !');
            setTimeout(() => {
              this._router.navigateByUrl('/user/profil');
            }, 2000);
          },
          error: (err) => {
            this.errorMessage = "L' email existe déjà";
          },
        });
    }
  }
}
