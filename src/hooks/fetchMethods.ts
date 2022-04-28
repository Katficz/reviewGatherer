// import { ToastOptions } from '@ionic/vue'
import { showLoadingToast } from './notifications'
import { useMiscStore } from '../store/misc'
import { Review } from '@/store/reviewStore'

/*
/// I WOULD USE THESE METHODS IN REAL WORLD SCENARIO
*/

// export const fetchPost = async (
//   // returns false for bad connection/unreachable backedn
//   //and error instance if backend error
//   backendUrl: string,
//   data: any,
//   resolveToastOptions: ToastOptions = {
//     message: 'Operacja zakończona sukcesem!',
//     duration: 2500,
//     color: 'success',
//   },
//   rejectToastOptions: ToastOptions = {
//     message: 'Błąd połączenia z serwerem',
//     duration: 2500,
//     color: 'danger',
//   }
// ): Promise<any> => {
//   useMiscStore().setLoading(true)
//   const response = await fetch('https://www.google.pl', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   }).catch(async function (err: any): Promise<any> {
//     //catches http errors
//     console.log(err)
//     console.log('Cannot reach backend/no internet connection')
//     const toastConnectionError = await showLoadingToast(rejectToastOptions)
//     toastConnectionError.removeAttribute('tabindex')
//     toastConnectionError.present()
//     return false
//   })
//   useMiscStore().setLoading(false)
//   if (response === false) return false // if backend is unreachable or
//   //we do not have internet we will get false
//   //https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
//   const responseData = await response.json()
//   if (!response.ok) {
//     // backend error will send full http response with .ok property
//     rejectToastOptions.message = responseData
//     const toastErr = await showLoadingToast(rejectToastOptions)
//     toastErr.removeAttribute('tabindex')
//     toastErr.present()
//     return new Error(responseData)
//   }
//   const toastSucc = await showLoadingToast(resolveToastOptions)
//   toastSucc.removeAttribute('tabindex')
//   toastSucc.present()
//   return responseData
// }

// export const fetchGet = async (backendUrl: string): Promise<any> => {
//   useMiscStore().setLoading(true)
//   const response = await fetch('https://www.google.pl').catch(async function (
//     err: any
//   ): Promise<any> {
//     const error = new Error('Backend unreachable: ' + err)
//     const toastConnectionError = await showLoadingToast({
//       message: 'Błąd połączenia z serwerem',
//       duration: 2500,
//       color: 'danger',
//     })
//     toastConnectionError.removeAttribute('tabindex')
//     toastConnectionError.present()
//     return error
//   })
//   useMiscStore().setLoading(false)
//   if (response instanceof Error) return false
//   const responseData = await response.json()
//   if (!response.ok) {
//     const toastBackendError = await showLoadingToast({
//       message: `Serwer zwrócił błąd ${responseData}`,
//       duration: 2500,
//       color: 'danger',
//     })
//     toastBackendError.removeAttribute('tabindex')
//     toastBackendError.present()

//     const error = new Error(responseData.message || 'Failed to Fetch!')
//     return error
//   }
//   return responseData
// }

//dummy post
//fake success or failure in sending data
export const fetchPost = async function (url: string, data: any) {
  const serverResponse = await new Promise((resolve, reject) => {
    useMiscStore().setLoading(true)
    setTimeout(async () => {
      const simulationSetting = useMiscStore().getSimulationSetting
      const toastSucc = await showLoadingToast({
        message: 'Operacja zakończona sukcesem!',
        duration: 2500,
        color: simulationSetting == 'ok' ? 'success' : 'warning',
        // color: 'danger',
      })
      toastSucc.removeAttribute('tabindex')
      toastSucc.present()
      useMiscStore().setLoading(false)
      if (simulationSetting == 'backendError') reject(Error('Błąd backendu'))
      if (simulationSetting == 'ok') resolve(data)
      if (simulationSetting == 'noInternet') resolve(false)
    }, 1000)
  }).catch((err) => {
    return err
  })
  return serverResponse
}

//dummy get
export const fetchGet = async function (
  url: string
): Promise<Review[] | false | Error> {
  const reviewList = await new Promise((resolve, reject) => {
    useMiscStore().setLoading(true)
    setTimeout(async () => {
      const simulationSetting = useMiscStore().getSimulationSetting

      const toastSucc = await showLoadingToast({
        message: 'Operacja zakończona sukcesem!',
        duration: 2500,
        color: simulationSetting == 'ok' ? 'success' : 'warning',
      })
      toastSucc.removeAttribute('tabindex')
      toastSucc.present()
      useMiscStore().setLoading(false)
      console.log(simulationSetting)
      if (simulationSetting == 'backendError') reject(Error('Błąd backendu'))
      if (simulationSetting == 'ok') resolve(dummyReviewList)
      if (simulationSetting == 'noInternet') resolve(false)
    }, 1000)
  }).catch((err) => {
    return err
  })

  return reviewList as Review[] | false | Error
}

const dummyReviewList = [
  {
    id: '7461',
    personalData: {
      name: 'Pawel',
      surname: 'Kotowicz',
      pesel: 12345678901,
      address: 'Chrobrego12',
      city: 'Poznań',
      zipCode: '12-123',
      phoneNum: '123123123',
    },
    answers: {
      lastConsumption: '2022-04-12T00:00:00.000Z',
      consumptionFrequency: 'Raz na miesiąc',
      tasteSatisfaction: true,
      priceEvaluation: 'Bardzo tanio',
      changeSuggestions:
        'Wszystko jest SUPER! Poza ceną oczywiście, ona mogłaby być niższa.',
    },
  },
  {
    id: '7462',
    personalData: {
      name: 'Losowa',
      surname: 'Osoba',
      pesel: 12345678901,
      address: 'Chrobrego15',
      city: 'Szczecin',
      zipCode: '12-123',
      phoneNum: '123123321',
    },
    answers: {
      lastConsumption: '2022-04-11T00:00:00.000Z',
      consumptionFrequency: 'Raz dziennie',
      tasteSatisfaction: false,
      priceEvaluation: 'Bardzo tanio',
      changeSuggestions: 'Niestety ceny są za wysokie',
    },
  },
]
