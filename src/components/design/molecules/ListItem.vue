<template>
  <ion-item
    class="lower-opacity"
    :color="color"
    @click="reactToSelection"
    :button="button"
    :class="{ card: card }"
    :lines="card ? 'none' : ''"
  >
    <ion-label>
      <slot name="mainContent"></slot>
      <slot name="description"></slot>
      <p class="ion-text-end">
        <b>{{ sideText }}</b>
      </p>
    </ion-label>
    <slot name="icon"></slot>
  </ion-item>
  <span class="inline-span"></span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonItem, IonLabel } from '@ionic/vue'
import { useRouter } from 'vue-router'

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
    inline: {
      //if true text will be displayed in a single row next to each other
      type: Boolean,
      default: false,
    },
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
      if (props.emitId) {
        context.emit('itemClicked', props.id)
        return
      }
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
.card {
  --border-width: 1px;
  --border-radius: 5px;
  box-shadow: 0 8px 6px -6px var(--ion-color-light-shade);
  margin-top: 8px;
}
</style>
