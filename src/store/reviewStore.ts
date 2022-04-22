import { fetchGet, fetchPost } from '@/hooks/fetchMethods'
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
  pesel: number
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
    pesel: NaN,
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
      if (Capacitor.getPlatform() == 'web') {
        // in browser capacitorNetwork is not working well
        const response = await fetchPost('backendUrlToSaveOne', review)
        if (!response) {
          await presentAlertOk(
            'Whoops! Brak połączenia z internetem.',
            'Ankieta została zapisana w pamięci przeglądarki. Pobierz aplikację na telefon, by móc pracować bez ryzyka utraty danych.'
          )
          await storeNewReview(review)
          return
        }
        this.$state.reviewList.push(review)
        return
      }
      //app on android/ios
      const isConnected = await Network.getStatus()

      if (!isConnected.connected) {
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
    async loadReviewList(filter: {
      name: string
      surname: string
      pesel: number | undefined
    }) {
      const reviewList: Review[] = await fetchGet(
        `getListUrl?name=${filter.name}&surname=${filter.surname}&pesel=${filter.pesel}`
      )
      this.reviewList = reviewList
    },
  },
})
