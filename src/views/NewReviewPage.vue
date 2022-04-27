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
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'NewReviewPage',
  components: {
    BasePage,
    ReviewTemplate,
  },
  setup() {
    const reviewStore = useReviewStore()
    const router = useRouter()
    async function saveNewReview(review: Review) {
      const isSavedProperly = await reviewStore.saveNewReview(review)
      if (!isSavedProperly) return
      router.push('/reviewList')
    }
    return {
      saveNewReview,
    }
  },
})
</script>
