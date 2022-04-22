<template>
  <div>
    <list-item-collapsible color="primary" open>
      <template v-slot:titleStart>Filtruj listę</template>
      <template v-slot:content>
        <ion-item>
          <ion-label position="floating">Imię</ion-label>
          <ion-input v-model="filter.name"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Nazwisko</ion-label>
          <ion-input v-model="filter.surname"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Pesel</ion-label>
          <ion-input inputmode="numeric" v-model="filter.pesel"></ion-input>
        </ion-item>
        <accept-reject-buttons
          acceptTitle="Znajdź ankiety"
          rejectTitle="Wyczyść filtry"
          rejectColor="warning"
          @accepted="emitFilter"
          @rejected="clearFilter"
        >
        </accept-reject-buttons>
      </template>
    </list-item-collapsible>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import { IonItem, IonInput, IonLabel } from '@ionic/vue'
import ListItemCollapsible from '../molecules/ListItemCollapsible.vue'
import AcceptRejectButtons from '../molecules/AcceptRejectButtons.vue'

export default defineComponent({
  name: 'ReviewListFilter',
  components: {
    ListItemCollapsible,
    IonItem,
    IonInput,
    IonLabel,
    AcceptRejectButtons,
  },
  emits: ['filterChange'],
  setup(_, { emit }) {
    const filter: Ref<{
      name: string
      surname: string
      pesel: number | undefined
    }> = ref({
      name: '',
      surname: '',
      pesel: undefined,
    })

    function emitFilter() {
      if (!filter.value.pesel && !filter.value.toString().match(/^[0-9]{11}$/g))
        emit('filterChange', filter.value)
    }

    function clearFilter() {
      filter.value = {
        name: '',
        surname: '',
        pesel: undefined,
      }
    }
    return { filter, emitFilter, clearFilter }
  },
})
</script>
