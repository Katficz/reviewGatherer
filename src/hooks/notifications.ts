import { toastController, ToastOptions } from '@ionic/vue';
// https://ionicframework.com/docs/api/toast

export async function showLoadingToast(toastOptions: ToastOptions) {
  const toast = await toastController.create({
    position: 'bottom',
    duration: 2500,
    color: 'medium',
    ...toastOptions,
  }); //all default options will be overwritten by spread operator
  return toast;
}
