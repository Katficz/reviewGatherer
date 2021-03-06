<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay">
        <ion-header>
          <ion-toolbar>
            <ion-title size="large" class="ion-text-center">ACME</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-list id="inbox-list">
            <ion-item color="warning" lines="none" v-if="unsavedDataExists">
              <ion-label>Niezapisane dane!</ion-label>
              <ion-button @click="saveStoredData">Spróbuj zapisać</ion-button>
            </ion-item>
            <ion-menu-toggle
              auto-hide="false"
              v-for="(p, i) in appPages"
              :key="i"
            >
              <ion-item
                router-direction="root"
                :router-link="p.url"
                lines="none"
                detail="false"
                class="hydrated"
                :class="{
                  selected: p.aliases.includes(String($route.name)),
                }"
              >
                <ion-icon
                  slot="start"
                  :ios="p.iosIcon"
                  :md="p.mdIcon"
                ></ion-icon>
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>
        </ion-content>
      </ion-menu>
      <ion-router-outlet :animated="true" id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script lang="ts">
import {
  IonApp,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonRouterOutlet,
  IonSplitPane,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonButton,
} from '@ionic/vue'
import { computed, defineComponent } from 'vue'
import { listOutline, addOutline } from 'ionicons/icons'
import { Network } from '@capacitor/network'
import { saveStoredReviews } from './hooks/localStorageManagment'
import { useMiscStore } from './store/misc'
import { Capacitor } from '@capacitor/core'

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonMenuToggle,
    IonRouterOutlet,
    IonSplitPane,
    IonButton,
  },
  setup() {
    const usedPlatform = Capacitor.getPlatform()
    if (usedPlatform == 'ios' || usedPlatform == 'android') {
      Network.addListener('networkStatusChange', async (status) => {
        if (!status.connected) return
        await saveStoredReviews()
      })
    }
    if (navigator.connection && usedPlatform == 'web') {
      // check if browser supports navigator.connection
      Object.assign(navigator.connection, {
        onchange: async () => {
          // console.log(navigator.connection)
          // console.log(navigator.onLine)
          // as there is no better way to detect if we can reach backend or not then sending request there,
          // it may be a good idea to do it on every network connection change as there can be moments
          // where we for example swap from closed wifi to an open internet
          console.log('change detected')
          await saveStoredReviews()
        },
      })
    }

    useMiscStore().checkUnsavedDataExists()
    async function saveStoredData() {
      await saveStoredReviews()
    }
    const appPages = [
      {
        title: 'Lista ankiet',
        url: '/reviewList',
        aliases: ['Lista ankiet'],
        iosIcon: listOutline,
        mdIcon: listOutline,
      },
      {
        title: 'Dodaj ankietę',
        url: '/addReview',
        aliases: ['Dodaj ankietę'],
        iosIcon: addOutline,
        mdIcon: addOutline,
      },
    ]
    const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders']

    return {
      appPages,
      labels,
      unsavedDataExists: computed(() => useMiscStore().getIsUnsavedData),
      saveStoredData,
    }
  },
})
</script>

<style scoped>
ion-menu ion-content {
  --background: var(--ion-item-background, var(--ion-background-color, #fff));
}

ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-note {
  display: inline-block;
  font-size: 16px;

  color: var(--ion-color-medium-shade);
}

ion-item.selected {
  --color: var(--ion-color-primary);
}
</style>
