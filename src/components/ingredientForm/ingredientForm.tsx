import React, { useState } from 'react'
import { IonButton, IonGrid, IonItem, IonRow, IonText, IonTextarea } from '@ionic/react'
import { Ingredient, IngredientAmountType } from '../../api/Storage';

interface IProps {
  onAdd: (x: Ingredient) => void
}

function IngredentForm({ onAdd }: IProps): JSX.Element {
  const [ name, setName ] = useState<string | null | undefined>(null)
  const [amount, setAmount] = useState<number>(0)
  const [ type, _ ] = useState<IngredientAmountType>(IngredientAmountType.grams)

  function save() {
    if (name == null || amount == null) return
  
    onAdd({
      name: name,
      amount: amount,
      amountType: type
    })

    setName(null)
    setAmount(0)
  }

  return (
    <IonItem>
      <IonGrid>
        <IonRow>
          <IonText>Name: </IonText>
        </IonRow>
        <IonRow>
          <IonTextarea placeholder="Ingredient name" inputMode="text" onIonChange={x => setName(x.detail.value)} value={name}/>
        </IonRow>
        <IonRow>
          <IonText>Amount: </IonText>
        </IonRow>
        <IonRow>
          <IonTextarea inputMode="numeric" onIonChange={x => setAmount(parseInt(x.detail.value || "0"))} value={amount?.toString()} />
        </IonRow>
        <IonRow>
          <IonText>Type: </IonText>
        </IonRow>
        <IonRow>
          <IonTextarea disabled={true} value={type} />
        </IonRow>
        <IonRow>
          <IonButton onClick={save}>Add Ingredient</IonButton>
        </IonRow>
      </IonGrid>
    </IonItem>
  )

} 

export default IngredentForm
