import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Filter } from '../../models/filter.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit {
  filterForm!: FormGroup

  minPrice!: number;
  constructor(private _formBuilder: FormBuilder, private _router: Router){}
  categories: string[] = [ "Après-Ski", "Chaussure de sécurité", "Sport"]
  brands: string[] = [ "Nike", "Adidas", "Puma"]
  ngOnInit(): void {
    this.filterForm = this._formBuilder.group({
      modelName: [''],
      category: [''],
      sexe: [''],
      brand: [''],
      minPrice: [0],
      maxPrice: [0]
    })
  }



  handleSubmit() {

    console.log(this.filterForm.get('minPrice')?.value);
    

    if (this.filterForm.valid) {
      const filter: Filter = {
        modelName: this.filterForm.get('modelName')?.value,
        category: this.filterForm.get('category')?.value,
        sexe: this.filterForm.get('sexe')?.value,
        brand: this.filterForm.get('brand')?.value,
        minPrice: this.filterForm.get('minPrice')?.value > 0 ? this.filterForm.get('minPrice')?.value : null,
        maxPrice: this.filterForm.get('maxPrice')?.value > 0 ? this.filterForm.get('maxPrice')?.value : null

      };
  
      this._router.navigate(['/products/filter'], {queryParams: filter })
      
    }
  }
}
