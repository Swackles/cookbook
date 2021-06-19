import {Recipe} from "../types";
import {StorageBase} from "./Storage";

export const RecipeStorage = StorageBase<Recipe>("recipe");
