export interface IMealKey {
    id: string;
  }
  
  export interface IRestaurant extends IMealKey {
    name: string;
    description: string;
    price: string;
    restaurantId: string;
    ingredients: Array<string>;
  }