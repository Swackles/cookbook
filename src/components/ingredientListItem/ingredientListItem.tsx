import React from 'react'
import { IonItem, IonLabel, IonText } from '@ionic/react'
import { Ingredient } from '../../api/Storage'

interface IProps {
  ingredient: Ingredient
}

const IngredientListItem = React.memo(({ ingredient }: IProps): JSX.Element => {
  return (
    <IonItem>
      <IonText>
        {`${ingredient.amount} ${ingredient.amountType} ${ingredient.name}`}
      </IonText>
    </IonItem>
  )
})

export default IngredientListItem
