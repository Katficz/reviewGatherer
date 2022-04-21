<template>
  <ion-header :translucent="true">
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button color="primary"></ion-menu-button>
      </ion-buttons>
      <ion-title>
        <h3 class="capitalize">{{ routeName }}</h3>
      </ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: {
    IonButtons,
    IonHeader,
    IonMenuButton,
    IonTitle,
    IonToolbar,
  },
  setup() {
    return {
      routeName: useRoute().name,
    }
  },
})
</script>
<style scoped>
.logout-chip {
  margin-right: 15px;
}
</style>
