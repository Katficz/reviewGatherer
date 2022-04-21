<template>
  <div>
    <ion-button
      :disabled="rejectDisabled"
      class="button"
      :color="rejectColor"
      @click="$emit('rejected')"
      >{{ rejectTitle }}</ion-button
    >
    <ion-button
      :disabled="acceptDisabled"
      :type="type"
      class="button"
      :color="acceptColor"
      @click="$emit('accepted')"
      >{{ acceptTitle }}</ion-button
    >
  </div>
</template>

script
<script lang="ts">
import { defineComponent } from 'vue'
import { IonButton } from '@ionic/vue'

export default defineComponent({
  components: { IonButton },
  props: {
    acceptTitle: {
      type: String,
      default: 'Zapisz',
    },
    rejectTitle: {
      type: String,
      default: 'Odrzuć',
    },
    confirmTitle: {
      type: String,
      default: 'Potwierdź',
    },
    acceptColor: {
      type: String,
      default: 'success',
    },
    rejectColor: {
      type: String,
      default: 'danger',
    },
    confirmColor: {
      type: String,
      default: 'secondary',
    },
    type: { type: String, default: 'button' },
    rejectDisabled: { type: Boolean, default: false },
    acceptDisabled: { type: Boolean, default: false },
  },
  emits: ['accepted', 'rejected'],
  setup() {
    return {}
  },
})
</script>

<style scoped>
div {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 10px;
  padding-bottom: 50px;
}
.button {
  min-width: 96px;
}
</style>
