import { ToastOptions } from '@ionic/vue'
import { showLoadingToast } from './notifications'
import { useMiscStore } from '../store/misc'

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
export const fetchPost = async function (url: string, data: any) {
  return new Promise((resolve, reject) => {
    useMiscStore().setLoading(true)
    setTimeout(async () => {
      console.log(data, url)
      resolve('yay')
      const toastSucc = await showLoadingToast({
        message: 'Operacja zakończona sukcesem!',
        duration: 2500,
        color: 'success',
      })
      toastSucc.removeAttribute('tabindex')
      toastSucc.present()
      useMiscStore().setLoading(false)
    }, 1000)
  })
}
