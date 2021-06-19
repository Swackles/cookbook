import React, { useState } from 'react'
import { IonCard, IonGrid, IonRow, IonCol, IonText, IonContent } from '@ionic/react'

import { RecipeModal } from './../../modals'
import {  Recipe } from './../../../api/Storage'

import "./recipeLarge.css"

interface IProps {
  data: Recipe
  alignRight: boolean
}

const RecipesLarge = React.memo(({ data, alignRight }: IProps): JSX.Element => {
  const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false)

  function toggleModal(): void { setIsModalOpen(!isModalOpen) }

  function RightSide(): JSX.Element {
    return (
      <IonCol size="6">
        <IonGrid style={{ padding: 0 }}>
          <IonRow className="title"> {data.name} </IonRow>
          <IonRow className="image-parent">
            <div
              style={{ backgroundImage: "url(https://via.placeholder.com/200x134)" }}
              className="image" />
          </IonRow>
        </IonGrid>
      </IonCol>
    )
  }

  function LeftSide(): JSX.Element {
    return (
      <IonCol size="6">
        <IonText className="description">
          <span className="description-quotes">"</span>
          {data.description}
          <span className="description-quotes">"</span>
        </IonText>
      </IonCol>
    )
  }

  return (
    <IonCard className="container">
      <RecipeModal onModalClose={toggleModal} isOpen={isModalOpen} recipe={data} />
      <IonGrid onClick={toggleModal}>
        <IonRow>
          { alignRight ? RightSide() : LeftSide() }
          { alignRight ? LeftSide() : RightSide() }
        </IonRow>
      </IonGrid>
    </IonCard>
  )
})


export default RecipesLarge;
