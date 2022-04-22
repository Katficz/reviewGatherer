import { ToastOptions } from '@ionic/vue'
import { showLoadingToast } from './notifications'
import { useMiscStore } from '../store/misc'
import { Review } from '@/store/reviewStore'

/*
/// I WOULD USE THESE METHODS IN REAL WORLD SCENARIO
*/

// export const fetchPost = async (
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
//   const response = await fetch(backendUrl, {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   }).catch(async function (err: any): Promise<any> {
//     console.log(err)
//     const error = new Error('Backend unreachable: ' + err)
//     const toastConnectionError = await showLoadingToast(rejectToastOptions)
//     toastConnectionError.removeAttribute('tabindex')
//     toastConnectionError.present()
//     return error
//   })
//   useMiscStore().setLoading(false)
//   const responseData = await response.json()
//   if (!response.ok) {
//     rejectToastOptions.message = responseData
//     const toastErr = await showLoadingToast(rejectToastOptions)
//     toastErr.removeAttribute('tabindex')
//     toastErr.present()
//     return responseData
//   }
//   const toastSucc = await showLoadingToast(resolveToastOptions)
//   toastSucc.removeAttribute('tabindex')
//   toastSucc.present()
//   return responseData
// }

// export const fetchGet = async (backendUrl: string): Promise<any> => {
//   useMiscStore().setLoading(true)
//   const response = await fetch(backendUrl).catch(async function (
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
//   const responseData = await response.json()
//   if (!response.ok) {
//     const error = new Error(responseData.message || 'Failed to Fetch!')
//     throw error
//   }
//   return responseData
// }

//dummy post
//fake success or failure in sending data
export const fetchPost = async function (url: string, data: any) {
  const serverResponse = await new Promise((resolve, reject) => {
    useMiscStore().setLoading(true)
    setTimeout(async () => {
      //swap betweend reject/resolve to fake success or failure of fetch
      // reject('Błąd połączenia z serwerem.')
      resolve(data)
      const toastSucc = await showLoadingToast({
        message: 'Operacja zakończona sukcesem!',
        duration: 2500,
        color: 'success',
        // color: 'danger',
      })
      toastSucc.removeAttribute('tabindex')
      toastSucc.present()
      useMiscStore().setLoading(false)
    }, 1000)
  }).catch(() => {
    return false // here there is a problem with sending the request
  })
  return serverResponse // for dummy post purporse server will always
  // return 200 with serverResponse.ok as true if connection is good
}

//dummy get
export const fetchGet = async function (url: string) {
  const reviewList = await new Promise((resolve, reject) => {
    useMiscStore().setLoading(true)
    setTimeout(async () => {
      resolve(dummyReviewList)
      const toastSucc = await showLoadingToast({
        message: 'Operacja zakończona sukcesem!',
        duration: 2500,
        color: 'success',
      })
      toastSucc.removeAttribute('tabindex')
      toastSucc.present()
      useMiscStore().setLoading(false)
    }, 1000)
  }).catch(() => {
    return []
  })
  return reviewList as Review[]
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
