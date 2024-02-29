import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, map, Observable, startWith } from 'rxjs';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';
import { AddressForm } from '../../models/adress.model';
import { AddressService } from '../../services/adress.service';
import { ModalService } from '../../services/modal.service';
import { TokenService } from '../../services/token.service';
import { countries } from '../../utils/auto-complete'
@Component({
  selector: 'app-create-adress',
  templateUrl: './create-adress.component.html',
  styleUrl: './create-adress.component.scss'
})
export class CreateAdressComponent implements OnInit {
  addressForm!: FormGroup;
  countries: string[] = countries;
  constructor(private _formBuilder: FormBuilder, private _modalService: ModalService, private _tokenService: TokenService, private _addressService: AddressService, private _snackBar: MatSnackBar){}
  ngOnInit(): void {
    this.addressForm = this._formBuilder.group({
      cityName: ['', Validators.required],
      country: ['', Validators.required],
      number: ['', Validators.required],
      street: ['', Validators.required],
    });
    this.filteredOptions = this.addressForm.get("country")!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  
  filteredOptions!: Observable<string[]>;
  closeModal(){
    this._modalService.closeModal();
  }

  handleSubmit() {
    if(this.addressForm.valid) {
    
      const userId: number = this._tokenService.decodeToken().id;
      
      this._addressService.create(this.addressForm.value, userId).subscribe({
        next: () => {this.closeModal(), this._openSnackBar()},
        error: () => {}
      });
    }

  }

  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    
    return this.countries.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _openSnackBar() {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: 1000,
      data: "Adresse crée !"
    });
  }
}

