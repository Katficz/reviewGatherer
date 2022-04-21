import { fetchPost } from '@/hooks/fetchMethods'
import { defineStore } from 'pinia'
import { Network } from '@capacitor/network'
import { presentAlertOk } from '@/hooks/ionicAlerts'
import { storeNewReview } from '@/hooks/localStorageManagment'
import { Capacitor } from '@capacitor/core'

export type PriceEvaluation =
  | 'Drogo'
  | 'Akceptowalnie'
  | 'Przeciętny poziom'
  | 'Bardzo tanio'
export interface PersonalData {
  name: string
  surname: string
  address: string
  city: string
  zipCode: string // I assume zip codes are PL only, so the format is XX-XXX
  phoneNum: string // it may contain "+"
}
export interface answers {
  lastConsumption: Date
  consumptionFrequency: string
  tasteSatisfaction: boolean
  priceEvaluation: PriceEvaluation
  changeSuggestions: string
}
export interface Review {
  id: string
  personalData: PersonalData
  answers: answers
}

export const emptyReview = (): Review => ({
  id: String(Math.round(Math.random() * 10000)), // here I would create new ID based on the DB i am using
  personalData: {
    name: '',
    surname: '',
    address: '',
    city: '',
    zipCode: '',
    phoneNum: '',
  },
  answers: {
    lastConsumption: new Date(),
    consumptionFrequency: '',
    tasteSatisfaction: false,
    priceEvaluation: 'Bardzo tanio',
    changeSuggestions: '',
  },
})

interface State {
  reviewList: Array<Review>
}

export const useReviewStore = defineStore('ReviewStore', {
  state: (): State => ({
    reviewList: [],
  }),
  getters: {
    getReviewList: (state) => {
      return state.reviewList
    },
    getReviewById: (state) => {
      return (id: string) => {
        const foundReview = state.reviewList.find((review) => id == review.id)
        if (!foundReview) return null
        return foundReview
      }
    },
  },
  actions: {
    async saveNewReview(review: Review) {
      //https://developer.mozilla.org/en-US/docs/web/api/navigator/online <sad face>
      //managing if using app on browser
      if (Capacitor.getPlatform() == 'web' && !window.navigator.onLine) {
        // on webApp capacitorNetwork is not working well
        await presentAlertOk(
          'Whoops! Brak połączenia z internetem.',
          'Przywróć połączenie z internetem by zapisać ankietę, lub pobierz aplikację na telefon, by móc pracować offline.'
        )
        return
      }
      //app on android/ios
      const isConnected = await Network.getStatus()

      if (!isConnected.connected && Capacitor.getPlatform() != 'web') {
        await presentAlertOk(
          'Whoops! Brak połączenia z internetem.',
          'Ankieta zostanie przechowana w pamięci i zostanie wysłana gdy ponownie połączysz się z internetem!'
        )
        await storeNewReview(review)
        return
      }
      const response = await fetchPost('backendUrlToSaveOne', review)
      if (!response) return
      this.$state.reviewList.push(review)
    },
  },
})
