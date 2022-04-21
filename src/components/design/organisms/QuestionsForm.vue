<template>
  <list-item-collapsible color="primary">
    <template v-slot:titleStart>Pytania ankiety</template>
    <template v-slot:content>
      <ion-item>
        <ion-label>Data ostatniego spożycia produktu</ion-label>
        <input
          class="datetime"
          :value="new Date(lastConsumption).toISOString().slice(0, 10)"
          @change="emitDateChange($event.target as HTMLInputElement)"
          type="date"
          required
        />
      </ion-item>
      <ion-item>
        <ion-label position="floating"
          >Jak często spożywasz produkty?</ion-label
        >
        <ion-input
          :value="consumptionFrequency"
          @input="$emit('update:consumptionFrequency', $event.target.value)"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Czy jesteś zadowolony ze smaku produktów?</ion-label>
        <ion-toggle
          slot="end"
          color="success"
          :modelValue="tasteSatisfaction"
          @update:modelValue="$emit('update:tasteSatisfaction', !!$event)"
        ></ion-toggle>
      </ion-item>
      <ion-item>
        <ion-label>Co sądzisz o obecnych cenach produktów?</ion-label>
        <ion-select
          :value="priceEvaluation"
          @input="$emit('update:priceEvaluation', $event.target.value)"
        >
          <ion-select-option
            v-for="option in priceSatisfactionOptions"
            :key="option"
            :value="option"
            >{{ option }}</ion-select-option
          >
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Co zmieniłbyś z ofecie firmy?</ion-label>
        <ion-textarea
          type="tel"
          :value="changeSuggestions"
          @input="$emit('update:changeSuggestions', $event.target.value)"
        ></ion-textarea>
      </ion-item>
    </template>
  </list-item-collapsible>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import {
  IonItem,
  IonLabel,
  IonInput,
  IonToggle,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from '@ionic/vue'
import ListItemCollapsible from '@/components/design/molecules/ListItemCollapsible.vue'
import { PriceEvaluation } from '@/store/reviewStore'

export default defineComponent({
  name: 'QuestionsForm',
  props: {
    lastConsumption: {
      type: Date,
    },
    consumptionFrequency: {
      type: String,
    },
    tasteSatisfaction: {
      type: Boolean,
    },
    priceEvaluation: {
      type: String as PropType<PriceEvaluation>,
    },
    changeSuggestions: {
      type: String,
    },
  },
  emits: [
    'update:lastConsumption',
    'update:consumptionFrequency',
    'update:tasteSatisfaction',
    'update:changeSuggestions',
    'update:priceEvaluation',
  ],
  components: {
    IonItem,
    IonLabel,
    IonInput,
    ListItemCollapsible,
    IonToggle,
    IonSelect,
    IonSelectOption,
    IonTextarea,
  },
  setup(_, { emit }) {
    function emitDateChange(ev: HTMLInputElement) {
      emit('update:lastConsumption', new Date(ev.value))
    }
    function check(ev: any) {
      console.log(ev)
    }
    const priceSatisfactionOptions = [
      'Drogo',
      'Akceptowalnie',
      'Przeciętny poziom',
      'Bardzo tanio',
    ]
    return {
      emitDateChange,
      check,
      priceSatisfactionOptions,
    }
  },
})
</script>

<style scoped>
.datetime {
  padding: 3px;
  border-radius: 5px;
}
</style>
