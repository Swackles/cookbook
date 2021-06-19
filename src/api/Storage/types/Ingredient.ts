export enum IngredientAmountType {
  grams = "grams"
}

export type Ingredient = {
  name: string;
  amountType: IngredientAmountType;
  amount: number;
};
