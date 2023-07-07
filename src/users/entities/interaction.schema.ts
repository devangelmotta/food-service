import { Schema } from 'dynamoose';

export const interactionSchema = new Schema({
  id: {
    type: String,
    hashKey: true,
  },
  id_usuario: {
    type: String,
    required: true
  },
  typeInteraction: {
    type: String,
    required: true,
  },
  valueInteraction: {
    type: Number,
    required: true,
  },
  typeElement: {
    type: String,
    required: true,
  },
  id_element: {
    type: String,
    required: true,
  }
});
