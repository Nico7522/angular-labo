export interface CartOrder {
    userId: number;
    totalReduction: number;
    orderProduct: CartProduct[];
  }
  
  export interface CartProduct {
    modelName: string;
    productId: number;
    sizeId: number;
    price: number;
    quantity: number;
    discount: number;
    image: string;
  }