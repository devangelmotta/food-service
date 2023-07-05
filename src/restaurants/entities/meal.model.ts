import * as dynamoose from "dynamoose";
import { mealSchema } from "./restaurant.schema";

export const mealModel = dynamoose
    .model("Restaurant", mealSchema)