<template>
  <list-item-collapsible color="primary">
    <template v-slot:titleStart>Dane osobowe</template>
    <template v-slot:content>
      <ion-item>
        <ion-label position="floating">Imię</ion-label>
        <ion-input
          required
          :value="name"
          @input="$emit('update:name', $event.target.value)"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Nazwisko</ion-label>
        <ion-input
          :value="surname"
          @input="$emit('update:surname', $event.target.value)"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Pesel</ion-label>
        <ion-input
          pattern="/^[0-9]{11}$/g"
          inputmode="numeric"
          type="number"
          :value="pesel"
          @input="$emit('update:pesel', Number($event.target.value))"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating"
          >Adres - ulica oraz numer domu/mieszkania</ion-label
        >
        <ion-input
          :value="address"
          @input="$emit('update:address', $event.target.value)"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Miasto</ion-label>
        <ion-input
          :value="city"
          @input="$emit('update:city', $event.target.value)"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Kod pocztowy</ion-label>
        <ion-input
          inputmode="tel"
          type="tel"
          :value="zipCode"
          @input="$emit('update:zipCode', $event.target.value)"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Numer telefonu</ion-label>
        <ion-input
          inputmode="tel"
          type="tel"
          :value="phoneNum"
          @input="$emit('update:phoneNum', $event.target.value)"
        ></ion-input>
      </ion-item>
    </template>
  </list-item-collapsible>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonItem, IonLabel, IonInput } from '@ionic/vue'
import ListItemCollapsible from '@/components/design/molecules/ListItemCollapsible.vue'

export default defineComponent({
  name: 'PersonalDataForm',
  props: {
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    pesel: {
      type: Number,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    phoneNum: {
      type: String,
    },
  },
  emits: [
    'update:name',
    'update:surname',
    'update:pesel',
    'update:address',
    'update:city',
    'update:zipCode',
    'update:phoneNum',
  ],
  components: { IonItem, IonLabel, IonInput, ListItemCollapsible },
  setup() {
    return {}
  },
})
</script>
