<template>
  <base-page>
    <h1 class="ion-text-center">Dodaj nową ankietę</h1>
    <review-template @saveNewReview="saveNewReview"></review-template>
  </base-page>
</template>

<script lang="ts">
//vue and ionic
import { defineComponent } from 'vue'
//comps
import BasePage from '@/components/base/BasePage.vue'
import ReviewTemplate from '@/components/design/templates/ReviewTemplate.vue'
//store
import { Review, useReviewStore } from '@/store/reviewStore'

export default defineComponent({
  name: 'NewReviewPage',
  components: {
    BasePage,
    ReviewTemplate,
  },
  setup() {
    const reviewStore = useReviewStore()
    function saveNewReview(review: Review) {
      reviewStore.saveNewReview(review)
    }
    return {
      saveNewReview,
    }
  },
})
</script>
