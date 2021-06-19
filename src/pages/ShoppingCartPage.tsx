import React, {useEffect, useState} from "react";
import {calculateShoppingCart, Ingredient, ShoppingCartStorage} from "../api/Storage";
import {ShoppingCartItem} from "../api/Storage/types/ShoppingCartItem";
import {IonButton, IonContent, IonFab, IonFabButton, IonFabList, IonIcon, IonItem, IonList, IonText} from "@ionic/react";
import { IngredientListItem } from "../components";
import { list, cart, chevronUpCircleOutline } from "ionicons/icons";

function ShoppingCartPage() {
  const [recipes, setRecipes] = useState<ShoppingCartItem[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const initResults = () => {
    ShoppingCartStorage.list().then(x => {
      console.log(x)
      setIngredients(calculateShoppingCart(x))
      setRecipes(x);
    })
  };

  const removeItem = async (id?: string) => {
    if (!id) return;
    await ShoppingCartStorage.delete(id);
    await initResults();
  };

  useEffect(initResults, []);

  return (
    <IonContent>
      <section>
        <h2>Ingredients</h2>
        <IonList>
          {ingredients.map((value, index) =>
            <IngredientListItem ingredient={value} key={`ing${value.name}`}/>
          )}
        </IonList>
      </section>
      <section>
        <h2>Recipes</h2>
        <IonList>
          {recipes.map(value =>
            <IonItem key={`rec${value.id}`}>
              <IonText>{value.recipe.name}</IonText>
              <IonButton onClick={() => removeItem(value.id)}>Remove</IonButton>
            </IonItem>
          )}
        </IonList>
      </section>

      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton>
          <IonIcon icon={chevronUpCircleOutline} />
        </IonFabButton>
        <IonFabList side="top">
          <IonFabButton routerLink="/home"><IonIcon icon={list} /></IonFabButton>
          <IonFabButton routerLink="/cart"><IonIcon icon={cart} /></IonFabButton>
        </IonFabList>
      </IonFab>
    </IonContent>
  );
};

export default ShoppingCartPage;
