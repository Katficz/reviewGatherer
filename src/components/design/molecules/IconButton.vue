<template>
  <ion-button
    :disabled="disabled"
    :slot="ionicSlot"
    :color="color"
    :title="title"
    :shape="shape"
    size="large"
    :style="{ fontSize: fontSize + 'px' }"
  >
    <ion-icon style="padding: 8px" slot="icon-only" :icon="icon"></ion-icon>
  </ion-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonButton, IonIcon } from '@ionic/vue'

export default defineComponent({
  name: 'IconButton',
  components: {
    IonButton,
    IonIcon,
  },
  props: {
    icon: { type: String, required: true },
    color: { type: String, required: false },
    title: { type: String, required: false },
    fontSize: { type: String, default: '16' },
    disabled: { type: Boolean, default: false },
    ionicSlot: { type: String, default: '' },
    shape: { type: String, default: '' },
  },
})
</script>
