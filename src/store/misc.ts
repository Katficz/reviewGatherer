import { defineStore } from 'pinia'
import { unsavedDataExists } from '@/hooks/localStorageManagment'

interface State {
  isLoading: boolean
  unsavedDataExists: boolean
}

export const useMiscStore = defineStore('Misc', {
  state: (): State => ({
    isLoading: false,
    unsavedDataExists: false,
  }),

  getters: {
    getIsLoading: (state) => {
      return state.isLoading
    },
    getIsUnsavedData: (state) => {
      return state.unsavedDataExists
    },
  },
  actions: {
    async setLoading(isLoading: boolean) {
      this.isLoading = isLoading
    },
    async checkUnsavedDataExists() {
      this.unsavedDataExists = await unsavedDataExists()
    },
    clearMisc() {
      this.$reset()
    },
  },
})
