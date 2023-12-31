import { Schema } from 'dynamoose';

export const mealSchema = new Schema({
  id: {
    type: String,
    hashKey: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: String,
    required: true,
  },
  restaurantId: {
    type: String,
    required: true
  },
  ingredients: {
    type: Array,
    schema: [String],
    required: true,
  },

});

