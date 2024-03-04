import { BehaviorSubject } from "rxjs";
import { CartProduct } from "../models/cart.model";

export function refreshCart(product: CartProduct, totalPrice: number, $totalPrice: BehaviorSubject<number>, cartLength: number, $cartLength: BehaviorSubject<number>  ) : number  {
    console.log(totalPrice);
    
    cartLength = cartLength - 1;
    $cartLength.next(cartLength);
    totalPrice -= (product.price - (product.price*product.discount));
    $totalPrice.next(totalPrice);
    return totalPrice;
}