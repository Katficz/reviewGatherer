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
    pesel: 0,
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
    async saveNewReview(review: Review): Promise<boolean> {
      if (Capacitor.getPlatform() == 'web') {
        // in browser capacitorNetwork is not working well
        const response = await fetchPost('backendUrlToSaveOne', review)
        if (response instanceof Error) {
          // error with backend - we dont want to store that one
          await presentAlertOk(
            'Whoops! Błąd bazy danych!.',
            'Serwer zwrócił błąd - ' + response.message
          )
          return false
        }
        if (response === false) {
          await presentAlertOk(
            'Whoops! Brak połączenia z internetem.',
            'Ankieta została zapisana w pamięci przeglądarki. Pobierz aplikację na telefon, by móc pracować bez ryzyka utraty danych.'
          )
          await storeNewReview(review)
          return true
        }
        this.$state.reviewList.push(review)
        return true
      }

      //app on android/ios
      const isConnected = await Network.getStatus()
      if (!isConnected.connected) {
        await presentAlertOk(
          'Whoops! Brak połączenia z internetem.',
          'Ankieta zostanie przechowana w pamięci i zostanie wysłana gdy ponownie połączysz się z internetem!'
        )
        await storeNewReview(review)
        return true
      }
      const response = await fetchPost('backendUrlToSaveOne', review)
      if (response instanceof Error) {
        // error with backend - we dont want to store that one
        await presentAlertOk(
          'Whoops! Błąd bazy danych!.',
          'Serwer zwrócił błąd - ' + response.message
        )
        return false
      }
      this.$state.reviewList.push(review)
      return true
    },
    async loadReviewList(filter: {
      name: string
      surname: string
      pesel: number | undefined
    }) {
      let query = '?'
      if (filter.name) query += `name=${filter.name}&`
      if (filter.surname) query += `surname=${filter.surname}&`
      if (filter.pesel) query += `pesel=${filter.pesel}`
      const reviewList: Review[] | false = await fetchGet(`getListUrl${query}`)

      if (reviewList === false) {
        this.reviewList = []
        return
      }
      if (reviewList instanceof Error) {
        await presentAlertOk(
          'Whoops! Błąd bazy danych!.',
          'Serwer zwrócił błąd - ' + reviewList.message
        )
        return false
      }
      this.reviewList = reviewList
    },
  },
})
