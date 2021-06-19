import { IonItemGroup, IonText } from '@ionic/react'
import { RecipeLarge } from '..'
import { Recipe } from '../../../api/Storage'

import './recipesList.css'

interface IProps {
  recipes: Recipe[] | null
}

function RecipesList({ recipes }: IProps): JSX.Element {

  if (recipes == null) return (<IonText>Loading...</IonText>)

  return (
    <IonItemGroup>
      {recipes.map((x, i) => <RecipeLarge key={i} alignRight={i%2==0} data={x} /> )}
    </IonItemGroup>
  )
}


export default RecipesList
