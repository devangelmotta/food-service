export interface IRestaurantKey {
    id: string;
  }
  
  export interface IRestaurant extends IRestaurantKey {
    name: string,
    location: string,
    cuisineType: string,
    similarity?: number
  }