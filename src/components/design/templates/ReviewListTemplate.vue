<template>
  <div>
    <ion-item-divider color="medium"
      ><h3>Znalezione ankiety</h3></ion-item-divider
    >
    <list-item
      @itemClicked="openDetailsModal"
      v-for="review in reviewList"
      :key="review.id"
      :id="review.id"
      card
      button
      :sideText="
        !!review?.personalData.pesel
          ? String(review?.personalData.pesel)
          : 'Brak PESELu'
      "
    >
      <template v-slot:mainText
        ><h2>{{ review.personalData.name }}</h2></template
      >
      <template v-slot:description
        ><p>{{ review.personalData.surname }}</p></template
      >
    </list-item>
    <ion-modal :is-open="isDetailsModalOpen" @didDismiss="closeDetailsModal">
      <ion-content>
        <review-details-preview
          :review="selectedReview"
        ></review-details-preview>
        <ion-button @click="closeDetailsModal" expand="block"
          >Zamknij okno</ion-button
        >
      </ion-content>
    </ion-modal>
  </div>
</template>

<script lang="ts">
//vue and ionic
import { defineComponent, PropType, ref } from 'vue'
import { IonItemDivider, IonModal, IonContent, IonButton } from '@ionic/vue'
//comps
import ReviewDetailsPreview from '@/components/design/organisms/ReviewDetailsPreview.vue'
import ListItem from '../molecules/ListItem.vue'
//store
import { Review } from '@/store/reviewStore'

export default defineComponent({
  components: {
    ListItem,
    IonItemDivider,
    IonModal,
    IonContent,
    ReviewDetailsPreview,
    IonButton,
  },
  props: {
    reviewList: {
      type: Array as PropType<Array<Review>>,
    },
  },
  setup(props) {
    const isDetailsModalOpen = ref(false)
    const selectedReview = ref()
    function openDetailsModal(selectedReviewId: string) {
      selectedReview.value = props.reviewList?.find(
        (review: Review) => selectedReviewId == review.id
      )
      isDetailsModalOpen.value = true
    }
    function closeDetailsModal() {
      isDetailsModalOpen.value = false
    }
    return {
      isDetailsModalOpen,
      selectedReview,
      openDetailsModal,
      closeDetailsModal,
    }
  },
})
</script>
