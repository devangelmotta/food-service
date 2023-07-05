import * as dynamoose from "dynamoose";
import { restaurantSchema } from "./restaurant.schema";

export const restaurantModel = dynamoose
    .model("Restaurant", restaurantSchema)