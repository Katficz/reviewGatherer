<template>
    <teleport to="body">
        <ion-spinner  name="circles"></ion-spinner>
    </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {IonSpinner} from '@ionic/vue'
export default defineComponent({
    name: 'LoadingSpinner',
    components: {
        IonSpinner
    }
})
</script>

<style scoped>
    ion-spinner {
        position: absolute;
        top: 80vh;
        left: 50vw;
    }
</style>

