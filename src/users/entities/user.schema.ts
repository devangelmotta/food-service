import { Schema } from 'dynamoose';

export const userSchema = new Schema({
  id: {
    type: String,
    hashKey: true,
  },
  name: {
    type: String,
    required: true,
  },
  preferences: {
    type: Array<String>,
    required: true,
  },

});
