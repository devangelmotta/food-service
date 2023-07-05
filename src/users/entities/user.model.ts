import * as dynamoose from "dynamoose";
import { userSchema } from "./user.schema";

export const userModel = dynamoose
    .model("User", userSchema)