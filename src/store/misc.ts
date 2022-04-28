import { defineStore } from 'pinia'
import { unsavedDataExists } from '@/hooks/localStorageManagment'
export type SimulationSetting = 'backendError' | 'noInternet' | 'ok'
interface State {
  isLoading: boolean
  unsavedDataExists: boolean
  simulationSetting: SimulationSetting
}

export const useMiscStore = defineStore('Misc', {
  state: (): State => ({
    isLoading: false,
    unsavedDataExists: false,
    simulationSetting: 'ok',
  }),

  getters: {
    getSimulationSetting: (state) => {
      return state.simulationSetting
    },
    getIsLoading: (state) => {
      return state.isLoading
    },
    getIsUnsavedData: (state) => {
      return state.unsavedDataExists
    },
  },
  actions: {
    setSimulationSetting(newSetting: SimulationSetting) {
      this.simulationSetting = newSetting
    },
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
