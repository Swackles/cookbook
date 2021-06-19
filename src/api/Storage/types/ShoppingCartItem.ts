import {BaseType} from "./BaseType";
import {Recipe} from "./Recipe";

export type ShoppingCartItem = {
  recipe: Recipe;
} & BaseType;
