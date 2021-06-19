import React, { useEffect, useState } from 'react'

import { IonContent, IonFab, IonFabButton, IonFabList, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { list, addCircle, cart, chevronUpCircleOutline } from "ionicons/icons"
import { RecipesList, RecipeCreateModal } from '../components';
import { Recipe, RecipeStorage } from '../api/Storage';

function RecipesPage() {
  const [createOpen, setCreateOpen] = useState<boolean>(false)
  const [recipies, setRecipies] = useState<Recipe[] | null>(null)

  function loadRecipes() {
    setInterval(() => RecipeStorage.list().then(x => setRecipies(x)), 1000)
  }
  useEffect(loadRecipes, [])

  function toggleCreateOpen() { setCreateOpen(!createOpen) }

  return (
    <IonPage>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">Recipes</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon icon={chevronUpCircleOutline} />
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton routerLink="/home"><IonIcon icon={list} /></IonFabButton>
            <IonFabButton routerLink="/cart"><IonIcon icon={cart} /></IonFabButton>
            <IonFabButton onClick={toggleCreateOpen}><IonIcon icon={addCircle} /></IonFabButton>
          </IonFabList>
        </IonFab>

        <RecipeCreateModal isOpen={createOpen} onModalClose={toggleCreateOpen} />
        <RecipesList recipes={recipies} />
      </IonContent>
    </IonPage>
  );
};

export default RecipesPage;
