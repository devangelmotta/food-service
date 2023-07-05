import { Schema } from 'dynamoose';

const preferencesSchema = new Schema({
  type: String,
  value: String,
});

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
    type: Array,
    schema: [preferencesSchema],
    required: true,
  },

});
