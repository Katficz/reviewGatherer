<template>
  <ion-header :translucent="true">
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button color="primary"></ion-menu-button>
      </ion-buttons>
      <ion-title>
        <h3 class="capitalize">{{ routeName }}</h3>
      </ion-title>
      <ion-label slot="end"> Wybierz tryb symulacji </ion-label>
      <ion-chip slot="end">
        <ion-select
          v-model="simulationSetting"
          @ionChange="updateSimulationSetting"
        >
          <ion-select-option value="backendError"
            >Błąd backendu</ion-select-option
          >
          <ion-select-option value="noInternet"
            >Brak internetu</ion-select-option
          >
          <ion-select-option value="ok">Wszystko działa</ion-select-option>
        </ion-select>
      </ion-chip>
    </ion-toolbar>
  </ion-header>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonChip,
} from '@ionic/vue'
import { useRoute } from 'vue-router'
import { useMiscStore, SimulationSetting } from '@/store/misc'

export default defineComponent({
  components: {
    IonChip,
    IonLabel,
    IonSelectOption,
    IonButtons,
    IonHeader,
    IonMenuButton,
    IonTitle,
    IonSelect,
    IonToolbar,
  },
  setup() {
    const simulationSetting: Ref<SimulationSetting> = ref('ok')
    function updateSimulationSetting() {
      console.log(simulationSetting.value)
      useMiscStore().setSimulationSetting(simulationSetting.value)
    }
    return {
      routeName: useRoute().name,
      simulationSetting,
      updateSimulationSetting,
    }
  },
})
</script>
<style scoped>
.logout-chip {
  margin-right: 15px;
}
</style>
