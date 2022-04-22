<template>
  <ion-page>
    <loading-spinner v-if="isLoading" />
    <base-header> </base-header>
    <ion-content
      :fullscreen="true"
      class="main-content"
      :class="{ wide: isWide }"
    >
      <div class="main-card">
        <slot></slot>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import BaseHeader from './BaseHeader.vue'
import { defineComponent } from 'vue'
import { IonContent, IonPage } from '@ionic/vue'
import LoadingSpinner from '@/components/design/molecules/LoadingSpinner.vue'
import { useMiscStore } from '../../store/misc'
import { computed } from '@vue/reactivity'

export default defineComponent({
  components: {
    IonContent,
    IonPage,
    BaseHeader,
    LoadingSpinner,
  },
  props: { isWide: { type: Boolean, default: false } },
  setup() {
    const miscStore = useMiscStore()
    return {
      isLoading: computed(() => miscStore.getIsLoading),
    }
  },
})
</script>

<style scoped>
/* 290px menu + padding + 800px content + padding= 100vh */
.main-content {
  --padding-start: calc(50vw - 500px);
  --padding-end: calc(50vw - 500px);
  --background: var(--ion-color-light);
}
/* split pane opens */
@media only screen and (min-width: 992px) {
  .main-content {
    --padding-start: calc(50vw - 645px);
    --padding-end: calc(50vw - 645px);
  }
}
.main-card {
  background-color: rgba(1, 45, 87, 0.015);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  min-height: 100%;

  padding: 0;
  margin: 0;
  padding-bottom: 30px;
}
@media only screen and (min-width: 1332px) {
  .main-card {
    margin-top: 25px;
    margin-bottom: 200px;

    min-height: 80%;
    padding: 30px 55px 30px 55px;
  }
}

@media only screen and (min-width: 1600px) {
  .wide {
    --padding-start: 30px;
    --padding-end: 30px;
  }
}
</style>
