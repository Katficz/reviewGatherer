<template>
  <div>
    <form @submit.prevent="emitSaveReview">
      <personal-data-form
        open
        v-model:name="newReview.personalData.name"
        v-model:surname="newReview.personalData.surname"
        v-model:pesel="newReview.personalData.pesel"
        v-model:address="newReview.personalData.address"
        v-model:city="newReview.personalData.city"
        v-model:zipCode="newReview.personalData.zipCode"
        v-model:phoneNum="newReview.personalData.phoneNum"
      ></personal-data-form>
      <questions-form
        open
        v-model:lastConsumption="newReview.answers.lastConsumption"
        v-model:consumptionFrequency="newReview.answers.consumptionFrequency"
        v-model:tasteSatisfaction="newReview.answers.tasteSatisfaction"
        v-model:priceEvaluation="newReview.answers.priceEvaluation"
        v-model:changeSuggestions="newReview.answers.changeSuggestions"
      >
      </questions-form>
      <accept-reject-buttons
        type="submit"
        @rejected="clearReview"
      ></accept-reject-buttons>
    </form>
  </div>
</template>

<script lang="ts">
//vue n ionic
import { defineComponent, ref, Ref } from 'vue'
//comps
import AcceptRejectButtons from '../molecules/AcceptRejectButtons.vue'
import PersonalDataForm from '@/components/design/organisms/PersonalDataForm.vue'
import QuestionsForm from '@/components/design/organisms/QuestionsForm.vue'
//store
import { emptyReview, Review } from '@/store/reviewStore'
//misc
import { validatePersonalInfo } from '@/hooks/validateFunctions'
import { presentAlertConfirm, presentAlertOk } from '@/hooks/ionicAlerts'

export default defineComponent({
  components: {
    PersonalDataForm,
    AcceptRejectButtons,
    QuestionsForm,
  },
  emits: ['saveNewReview'],
  setup(_, { emit }) {
    const newReview: Ref<Review> = ref(emptyReview())
    async function emitSaveReview() {
      const validationResult = validatePersonalInfo(
        newReview.value.personalData
      )
      if (typeof validationResult == 'string') {
        await presentAlertOk(
          'Niepoprawnie wypełniony formularz!',
          validationResult
        )
        return
      }
      emit('saveNewReview', newReview.value)
    }

    async function clearReview() {
      const alertChoice = await presentAlertConfirm(
        'Czy na pewno chcesz odrzucić ten formularz?',
        'Spowoduje to wyczyszczenie wszystkich pól w formularzu.'
      )
      if (!alertChoice) return
      newReview.value = emptyReview()
    }
    return {
      newReview,
      emitSaveReview,
      clearReview,
    }
  },
})
</script>
