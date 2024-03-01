import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Filter } from '../../models/filter.model';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { api } from '../../../../environement/environement'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _productService: ProductService
  ) {}
  filteredProduct: Product[] = [];
  imageUrl: string = api.img_url;
  mybreakpoint!: number;
  ngOnInit(): void {
    this.mybreakpoint = (window.innerWidth <= 600) ? 1 : 4;
    let filter: Filter = {
      modelName: '',
      sexe: '',
      category: '',
      brand: '',
    };
    this._activatedRoute.queryParams.subscribe((params) => {
        (filter.modelName = params['modelName']),
        (filter.sexe = params['sexe']),
        (filter.category = params['category']),
        (filter.brand = params['brand']);

      this._productService
        .filter(filter)
        .subscribe((res) => this.filteredProduct = res.data);
    });
  }
}
