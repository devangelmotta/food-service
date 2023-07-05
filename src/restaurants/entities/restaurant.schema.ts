import { Schema } from 'dynamoose';

export const restaurantSchema = new Schema({
  id: {
    type: String,
    hashKey: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  cuisineType: {
    type: String,
    required: true,
  },

});

