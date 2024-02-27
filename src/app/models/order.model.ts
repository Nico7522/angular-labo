import { Size } from "./size.model";
import { User } from "./user.model";

export interface Order {
    orderId: number;
    user: User;
    orderedProducts: OrderedProducts[];
    totalPrice: number;
    totalReduction: number;
    orderDate: Date;
  }
  
  export interface OrderedProducts {
    productId: number;
    price: number;
    productName: number;
    quantity: number;
    reductionPerProduct: number;
    size: Size;
    imgUrl: string
  }