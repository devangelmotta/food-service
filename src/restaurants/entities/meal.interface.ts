export interface IMealKey {
    id: string;
  }
  
  export interface IMeal extends IMealKey {
    name: string;
    description: string;
    price: string;
    restaurantId: string;
    ingredients: Array<string>;
  }