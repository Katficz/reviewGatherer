<template>
  <section>
    <ion-item
      :style="{ 'background-color': bgColor }"
      class="lower-opacity"
      :color="color"
      @click="reactToSelection"
      :button="button"
    >
      <ion-label>
        <div>
          <slot name="mainText"></slot>
        </div>
      </ion-label>
      <ion-label color="secondary">
        <div>
          <slot name="description"></slot>
        </div>
      </ion-label>
      <ion-label>
        <div>{{ sideText }}</div>
      </ion-label>
      <slot name="icon"></slot>
    </ion-item>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonItem, IonLabel } from '@ionic/vue'

export default defineComponent({
  components: {
    IonItem,
    IonLabel,
  },
  props: {
    button: {
      type: Boolean,
      default: false,
    },
    sideText: {
      type: String,
      default: '',
    },
    emitId: { type: Boolean, default: false },
    id: { type: String, default: 'null' },
    color: {
      type: String,
      required: false,
    },
    card: {
      type: Boolean,
      default: false,
    },
    bgColor: {
      type: String,
      required: false,
    },
  },
  emits: ['itemClicked'],
  setup(props, context) {
    function reactToSelection() {
      context.emit('itemClicked', props.id)
      return
    }
    return {
      reactToSelection,
    }
  },
})
</script>

<style scoped>
h2,
p,
ion-label,
div {
  white-space: normal;
  height: auto;
  contain: content;
}
h2 {
  font-size: 18px;
}

ion-item {
  min-width: 100%;
}
.lower-opacity {
  --background-hover-opacity: 20%;
}
</style>
