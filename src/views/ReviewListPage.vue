<template>
  <base-page>
    <h1 class="ion-text-center">Lista wypełnionych ankiet</h1>
    <review-list-filter @filterChange="updateList"></review-list-filter>
    <review-list-template
      :reviewList="displayedReviewList"
    ></review-list-template>
  </base-page>
</template>

<script lang="ts">
//vue n ionic
import { defineComponent } from 'vue'
import { computed } from '@vue/reactivity'
//comps
import ReviewListTemplate from '@/components/design/templates/ReviewListTemplate.vue'
import BasePage from '../components/base/BasePage.vue'
import ReviewListFilter from '@/components/design/organisms/ReviewListFilter.vue'
//store
import { useReviewStore } from '@/store/reviewStore'

export default defineComponent({
  name: 'ReviewList',
  components: {
    BasePage,
    ReviewListFilter,
    ReviewListTemplate,
  },
  setup() {
    const reviewStore = useReviewStore()
    function updateList(filter: { name: ''; surname: ''; pesel: undefined }) {
      reviewStore.loadReviewList(filter)
    }
    return {
      updateList,
      displayedReviewList: computed(() => reviewStore.getReviewList),
    }
  },
})
</script>

<style scoped>
review-list-template {
  margin-top: 25px;
}
</style>
