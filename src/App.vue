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
            <ion-menu-toggle
              auto-hide="false"
              v-for="(p, i) in appPages"
              :key="i"
            >
              <ion-item
                @click="selectedIndex = i"
                router-direction="root"
                :router-link="p.url"
                lines="none"
                detail="false"
                class="hydrated"
                :class="{ selected: selectedIndex === i }"
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
} from '@ionic/vue'
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import { listOutline, addOutline } from 'ionicons/icons'
import { Network } from '@capacitor/network'
import { saveStoredReviews } from './hooks/localStorageManagment'

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
  },
  setup() {
    const selectedIndex = ref(0)
    Network.addListener('networkStatusChange', async (status) => {
      if (!status.connected) return
      await saveStoredReviews()
    })
    const appPages = [
      {
        title: 'Lista ankiet',
        url: '/reviewList',
        iosIcon: listOutline,
        mdIcon: listOutline,
      },
      {
        title: 'Dodaj ankietę',
        url: '/addReview',
        iosIcon: addOutline,
        mdIcon: addOutline,
      },
    ]
    const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders']

    const path = window.location.pathname.split('folder/')[1]
    if (path !== undefined) {
      selectedIndex.value = appPages.findIndex(
        (page) => page.title.toLowerCase() === path.toLowerCase()
      )
    }

    const route = useRoute()

    return {
      selectedIndex,
      appPages,
      labels,
      isSelected: (url: string) => (url === route.path ? 'selected' : ''),
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
