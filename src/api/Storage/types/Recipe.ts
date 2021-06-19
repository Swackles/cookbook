import { Ingredient } from "./Ingredient";
import {BaseType} from "./BaseType";

export type RecipeImage = {
  base64: string;
}

export type Recipe = {
  name: string;
  ingredients: Ingredient[];
  description: string;
  tutorial: string;
  image?:RecipeImage;
} & BaseType;
