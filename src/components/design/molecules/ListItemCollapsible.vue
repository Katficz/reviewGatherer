<template>
  <div>
    <ion-accordion-group :value="open">
      <ion-accordion id="accordion" ref="card" class="card" :value="true">
        <ion-item
          @click="scrollToOpened($event)"
          slot="header"
          class="item-summary"
          detail="true"
          :color="color"
          lines="none"
        >
          <ion-label class="start-title-wrapper" slot="start">
            <slot name="titleStart"></slot>
          </ion-label>

          <ion-label class="end-title-wrapper" slot="end">
            <slot name="titleEnd"></slot>
          </ion-label>

          <ion-item
            class="icon-wrapper"
            v-if="icon"
            lines="none"
            size="large"
            :color="iconBgColor"
            slot="end"
          >
            <ion-icon class="icon" :icon="icon"></ion-icon>
          </ion-item>
        </ion-item>
        <ion-list slot="content">
          <slot name="content"></slot>
        </ion-list>
      </ion-accordion>
    </ion-accordion-group>
  </div>
</template>

<script lang="ts">
//use section in template to place things under each other, and ion-labels for 1 row
import { computed, defineComponent, ref } from 'vue'
import {
  IonLabel,
  IonItem,
  IonIcon,
  IonAccordion,
  IonList,
  IonAccordionGroup,
} from '@ionic/vue'
export default defineComponent({
  components: {
    IonLabel,
    IonItem,
    IonIcon,
    IonList,
    IonAccordion,
    IonAccordionGroup,
  },
  props: {
    iconBgColor: {
      type: String,
      required: false,
    },
    color: {
      type: String,
      required: false,
      default: 'none',
    },
    icon: {
      type: String,
      required: false,
    },
    open: {
      type: Boolean,
      default: false,
    },
    scrollToView: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const card = ref(null)
    const isOpen = ref(props.open)
    const hoverClass = computed(() => {
      if (props.color == 'none') {
        return {
          nonColor: {
            cursor: 'pointer',
          },
        }
      } else {
        return {
          withColor: {
            cursor: 'pointer',
          },
        }
      }
    })

    function scrollToOpened(action: any) {
      setTimeout(() => {
        if (props.scrollToView && isOpen.value == true)
          action.target.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          })
      }, 150)
      isOpen.value = !isOpen.value
    }

    return {
      card,
      hoverClass,
      scrollToOpened,
    }
  },
})
</script>

<style scoped>
.icon-wrapper {
  border-radius: 15px;
  margin: 4px;
}
.card .item-summary {
  /* --border-radius: 5px; */
  /* box-shadow: 0 8px 6px -6px var(--ion-color-light-shade); */
  margin-top: 1px;
  /* border: 1.5px solid rgba(44, 44, 44, 0.2); */
  border-radius: 2px;
}

#accordion {
  border-bottom: 1px solid rgba(0, 0, 0, 0.192);
}
</style>
