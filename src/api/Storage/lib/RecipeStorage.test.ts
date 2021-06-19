import {RecipeStorage} from "./RecipeStorage";
import {IngredientAmountType, Recipe} from "../types";

describe("Test RecipeStorage", () => {
  const r1 = {
    name: "r 1",
    ingredients: [
      {
        name: "ing1",
        amount: 1,
        amountType: IngredientAmountType.grams
      }
    ],
    description: "lorem 1",
    tutorial: "r 1 tut",

  } as Recipe;
  const r2 = {
    name: "r 2",
    ingredients: [
      {
        name: "ing2",
        amount: 2,
        amountType: IngredientAmountType.grams
      }
    ],
    description: "lorem 1",
    tutorial: "r 1 tut",

  } as Recipe;
  const r3 = {
    name: "r 3",
    ingredients: [
      {
        name: "ing3",
        amount: 2,
        amountType: IngredientAmountType.grams
      }
    ],
    description: "lorem 1",
    tutorial: "r 1 tut",

  } as Recipe;

  it("Test RecipeStorage", async () => {

    const r1Saved = await RecipeStorage.save(r1);
    const r2Saved = await RecipeStorage.save(r2);
    const r3Saved = await RecipeStorage.save(r3);
    expect(r1Saved.id !== null && r1Saved.id !== undefined).toBeTruthy();
    expect(r2Saved.id !== null && r2Saved.id !== undefined).toBeTruthy();
    expect(r3Saved.id !== null && r3Saved.id !== undefined).toBeTruthy();

    const result1 = await RecipeStorage.list();
    expect(result1.length).toBe(3);
    expect(result1[0].id).toBe(r1Saved.id);
    expect(result1[0].name).toBe(r1Saved.name);
    expect(result1[1].id).toBe(r2Saved.id);
    expect(result1[1].name).toBe(r2Saved.name);
    expect(result1[2].id).toBe(r3Saved.id);
    expect(result1[2].name).toBe(r3Saved.name);

    r3Saved.name = "UHUUU!";
    await RecipeStorage.save(r3Saved);
    const result2 = await RecipeStorage.list();
    expect(result2.length).toBe(3);
    expect(result2[0].id).toBe(r1Saved.id);
    expect(result2[0].name).toBe(r1Saved.name);
    expect(result2[1].id).toBe(r2Saved.id);
    expect(result2[1].name).toBe(r2Saved.name);
    expect(result2[2].id).toBe(r3Saved.id);
    expect(result2[2].name).toBe(r3Saved.name);
    expect(result2[2].name).toBe("UHUUU!");

    // noinspection TypeScriptValidateTypes
    // @ts-ignore
    await RecipeStorage.delete(r2Saved.id)

    const result3 = await RecipeStorage.list();
    expect(result3.length).toBe(2);
    expect(result3[0].id).toBe(r1Saved.id);
    expect(result3[0].name).toBe(r1Saved.name);
    expect(result3[1].id).toBe(r3Saved.id);
    expect(result3[1].name).toBe(r3Saved.name);

  });
});
