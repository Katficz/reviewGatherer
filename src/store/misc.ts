import { defineStore } from 'pinia'

interface State {
  isLoading: boolean
}

export const useMiscStore = defineStore('Misc', {
  state: (): State => ({
    isLoading: false,
  }),

  getters: {
    getIsLoading: (state) => {
      return state.isLoading
    },
  },
  actions: {
    async setLoading(isLoading: boolean) {
      this.isLoading = isLoading
    },
    clearMisc() {
      this.$reset()
    },
  },
})
