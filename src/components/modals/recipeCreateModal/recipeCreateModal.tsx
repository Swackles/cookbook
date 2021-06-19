import React, { useState } from "react"
import { IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonList, IonModal, IonRow, IonTextarea, IonTitle } from "@ionic/react"
import { close, add, trash } from 'ionicons/icons'

import { Recipe, RecipeStorage, Ingredient } from "../../../api/Storage"
import IngredentForm from "../../ingredientForm/ingredientForm"
import { IngredientListItem } from "../.."

interface IProps {
  isOpen: boolean
  recipe?: Recipe
  onModalClose: () => void
}

function RecipeCreateModal({ isOpen, recipe, onModalClose }: IProps): JSX.Element {
  const [ name, setName ] = useState<string>(recipe?.name || "")
  const [ description, setDescription ] = useState<string>(recipe?.description || "")
  const [ tutorial, setTutorial ] = useState<string>(recipe?.tutorial || "")
  const [ingredients, setIngredients] = useState<Ingredient[]>(recipe?.ingredients || [])

  function clearState() {
    setName("")
    setDescription("")
    setTutorial("")
    setIngredients([])
  }

  function addToCart() {
    const recipeSave: Recipe = {
      name: name,
      description: description,
      tutorial: tutorial,
      ingredients: ingredients
    }

    RecipeStorage.save(recipeSave);
    setName("");
    clearState();
    onModalClose()
  }

  function addIngredient(x: Ingredient): void {
    ingredients.push(x)
    setIngredients(ingredients)
  }

  return (
    <IonModal isOpen={isOpen}>
      <IonFab vertical="top" horizontal="end" slot="fixed">
        <IonFabButton color="danger" onClick={onModalClose}>
          <IonIcon icon={close} />
        </IonFabButton>
      </IonFab>
      <IonFab vertical="center" horizontal="end" slot="fixed">
        <IonFabButton onClick={addToCart}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>

      <IonHeader>
        <IonTitle size="small">Create Recipe</IonTitle>
      </IonHeader>
      
      <IonContent>
        <IonGrid className="recipe-modal">
          <IonRow>
            <div
              style={{ backgroundImage: "url(https://via.placeholder.com/200x134)" }}
              className="image image-large" />
          </IonRow>
          <IonRow className="title">
            <IonTextarea value={name} placeholder="Name" onIonChange={e => setName(e.detail.value || "")} />
          </IonRow>
          <IonRow>
            <IonTextarea value={description} placeholder="Description" onIonChange={e => setDescription(e.detail.value || "")} />
          </IonRow>
          <IonRow className="ingredients-row">
            <IonGrid>
              <IonRow><h2>Ingredients</h2></IonRow>
              <IonRow>
                <IonList>
                  { ingredients.map((x, i) => <IngredientListItem ingredient={x} key={i} />)}
                  <IngredentForm onAdd={addIngredient} />
                </IonList>
              </IonRow>
            </IonGrid>            
          </IonRow>
          <IonRow>
            <IonTextarea value={tutorial} placeholder="tutorial" onIonChange={e => setTutorial(e.detail.value || "") } className="tutorial-text" />
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  )
}

export default RecipeCreateModal
