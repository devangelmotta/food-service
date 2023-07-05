import * as dynamoose from "dynamoose";
import { interactionSchema } from "./interaction.schema";

export const interactionModel = dynamoose
    .model("Interaction", interactionSchema)