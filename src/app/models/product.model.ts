import { Category } from './category.model';

export interface Product {
  productId: number;
  modelName: string;
  description: string;
  brand: string;
  sexe: string;
  image: string;
  price: number;
  discount: number;
  categories: Category[];
  sizes: AvailableSizes[];
}

export interface AvailableSizes {
  sizeId: number;
  size: number;
  stock: number;
}