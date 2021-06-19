import React from "react"
import { IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonModal, IonRow, IonText, IonTitle } from "@ionic/react"
import { close, add, trash } from 'ionicons/icons'
import { IngredientList } from './../../'

import "./recipeModal.css"
import { Recipe, RecipeStorage, ShoppingCartStorage } from "../../../api/Storage"

interface IProps {
  isOpen: boolean
  recipe: Recipe
  onModalClose: () => void
}

const ViewRecipes = React.memo(({ isOpen, recipe, onModalClose }: IProps): JSX.Element => {
  
  function addToCart() { ShoppingCartStorage.save({ recipe: recipe }); onModalClose() }
  function deleteRecipe() { if(recipe.id) RecipeStorage.delete(recipe.id); onModalClose() }

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
          <IonTitle size="small">Recipe</IonTitle>
        </IonHeader>
        <IonContent>
          <IonFab vertical="top" horizontal="start" slot="fixed">
            <IonFabButton onClick={deleteRecipe}>
              <IonIcon icon={trash} />
            </IonFabButton>
          </IonFab>
          <IonGrid className="recipe-modal">
            <IonRow>
              <div
                style={{ backgroundImage: "url(https://via.placeholder.com/200x134)" }}
                className="image image-large" />
            </IonRow>
            <IonRow className="title"> {recipe.name} </IonRow>
            <h2>Description</h2>
            <IonRow>
              <IonText className="description">
                <span className="description-quotes">"</span>
                {recipe.description}
                <span className="description-quotes">"</span>
              </IonText>
            </IonRow>
            <h2>Ingredients</h2>
            <IonRow className="ingredients-row">
              <IngredientList ingredients={recipe.ingredients} />
            </IonRow>
            <h2>Tutorial</h2>
            <IonRow>
              <IonText className="tutorial-text">{recipe.tutorial}</IonText>
            </IonRow>
          </IonGrid>
        </IonContent>
    </IonModal>
  )
})

export default ViewRecipes
