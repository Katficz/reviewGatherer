<template>
  <base-page>
    <h1 class="ion-text-center">Lista wypełnionych ankiet</h1>
    <review-list-filter></review-list-filter>
  </base-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BasePage from '../components/base/BasePage.vue'
import ReviewListFilter from '@/components/design/organisms/ReviewListFilter.vue'

export default defineComponent({
  name: 'ReviewList',
  components: {
    BasePage,
    ReviewListFilter,
  },
})
</script>

<style scoped></style>
