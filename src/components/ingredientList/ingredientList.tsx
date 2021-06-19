import React from 'react'
import { IonItem, IonLabel, IonList, IonText } from '@ionic/react'
import { Ingredient } from './../../api/Storage'
import IngredientListItem from '../ingredientListItem/ingredientListItem'

interface IProps {
  ingredients: Ingredient[]
}

const IngredientList = React.memo(({ ingredients }: IProps): JSX.Element => {
  return (
    <IonList>
      { ingredients.map((x, i) =>
        <IngredientListItem ingredient={x} key={i}/>
      ) }
    </IonList>
  )
})

export default IngredientList