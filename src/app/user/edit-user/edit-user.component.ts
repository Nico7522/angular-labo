import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router,  } from '@angular/router';
import { Subscription } from 'rxjs';
import { EditUserForm, User } from '../../models/user.model';
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
  message!: string;
  userSub!: Subscription;
  editSub!: Subscription;

  private _mailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  // Edit de l'email appart.
  userEmail = new FormControl('', [Validators.required, Validators.pattern(this._mailPattern)]);

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {}
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    if(this.editSub) {
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

        // this.editFrom.patchValue({
        //   firstName : user.firstName
        // })

        this.editFrom.get('firstName')?.setValue(user.firstName);
        this.editFrom.get('lastName')?.setValue(user.lastName);
        this.editFrom.get('phoneNumber')?.setValue(user.phoneNumber);
        this.userEmail.setValue(user.email);
      },
    });
  }

  handleSubmitEdit(){
    const editForm: EditUserForm = {
      lastName: this.editFrom.get('lastName')?.value,
      firstName: this.editFrom.get('firstName')?.value,
      phoneNumber: this.editFrom.get('phoneNumber')?.value

    }
    if(this.editFrom.valid) {
      
      this.editSub = this._userService.edit(editForm, this.userId).subscribe({
        next: () => {
          this.message = "Compte modifié avec succèss.";
          this._router.navigateByUrl('/user/profil')
      },
        error: () => {this.message = "Une erreur s'est produite."},
      })
    }
  }

  handleSubmitMail(){

  }
}
