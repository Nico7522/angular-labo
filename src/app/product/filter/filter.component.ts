import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../../models/category.model';
import { Filter } from '../../models/filter.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit {
  filterForm!: FormGroup
  categories: Category[] = [];
  minPrice!: number;
  constructor(private _formBuilder: FormBuilder, private _router: Router, private _categorieService: CategoryService){}
  brands: string[] = [ "Nike", "Adidas", "Puma"]
  ngOnInit(): void {
    this._categorieService.getAll().subscribe({
      next: (categories) => {
        this.categories = categories
      },
      error: () => {}
    })
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
