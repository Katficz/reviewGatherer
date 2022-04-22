<template>
  <div>
    <list-item-collapsible color="primary">
      <template v-slot:titleStart>Filtruj listę</template>
      <template v-slot:content>
        <ion-item>
          <ion-label position="floating">Imię</ion-label>
          <ion-input></ion-input>
        </ion-item>
      </template>
    </list-item-collapsible>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ListItemCollapsible from '../molecules/ListItemCollapsible.vue'
import { IonItem, IonInput, IonLabel } from '@ionic/vue'

export default defineComponent({
  name: 'ReviewListFilter',
  components: { ListItemCollapsible, IonItem, IonInput, IonLabel },
  emits: ['filterChange'],
  setup() {
    return {}
  },
})
</script>
