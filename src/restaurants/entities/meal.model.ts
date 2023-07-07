import * as dynamoose from "dynamoose";
import { mealSchema } from "./meal.schema";

export const mealModel = dynamoose
    .model("Meal", mealSchema)