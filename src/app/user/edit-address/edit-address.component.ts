import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { Address } from '../../models/adress.model';
import { AddressService } from '../../services/adress.service';
import { SnackbarService } from '../../services/snackbar.service';
import { countries } from '../../utils/auto-complete'

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrl: './edit-address.component.scss',
})
export class EditAddressComponent implements OnInit {
  countries: string[] = countries;

  addressId!: number;
  address!: Address;
  editAddressForm!: FormGroup;
  errorMessage!: string;
  constructor(
    private _addressService: AddressService,
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _snackbarService: SnackbarService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this.addressId = this._activatedRoute.snapshot.params['id'];
    this._addressService.getById(this.addressId).subscribe({
      next: (address) => {
        this.editAddressForm.patchValue(address);
      },
      error: (err) => console.log(err),
    });

    this.editAddressForm = this._formBuilder.group({
      cityName: ['', Validators.required],
      country: ['', Validators.required],
      number: ['', Validators.required],
      street: ['', Validators.required],
    });

    this.filteredOptions = this.editAddressForm
      .get('country')!
      .valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value || ''))
      );
  }
  filteredOptions!: Observable<string[]>;

  _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.countries.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  handleSubmit() {
    if (this.editAddressForm.valid) {
      this._addressService
        .edit(this.editAddressForm.value, this.addressId)
        .subscribe({
          next: () => {
            this._snackbarService.openSnackBar('Adresse modifiée !');
            setTimeout(() => {
              this._router.navigate(['/user/profil']);
            }, 2000);
          },
          error: () => {
            this.errorMessage = "Une erreur s'est produite.";
          },
        });
    }
  }

}
