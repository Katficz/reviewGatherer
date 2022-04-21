import { alertController } from '@ionic/vue'

export async function presentAlertConfirm(
  header: string,
  message?: string,
  subheader?: string,
  onConfirm: () => any = () => {
    // console.log('Alert Confirmed')
  },
  onCancel: () => any = () => {
    // console.log('Alert Canceled')
  }
) {
  const alert = await alertController.create({
    cssClass: 'my-custom-class',
    header: header,
    subHeader: subheader,
    message: message,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        id: 'cancel-button',
        handler: onCancel,
      },
      {
        text: 'Okay',
        role: 'confirm',
        id: 'confirm-button',
        handler: onConfirm,
      },
    ],
  })
  alert.present()
  const result = await alert.onDidDismiss()
  return result.role == 'confirm'
}

export async function presentAlertOk(
  header: string,
  message?: string,
  subheader?: string,
  onConfirm: () => any = () => {
    // console.log('Alert Confirmed')
  }
) {
  const alert = await alertController.create({
    cssClass: 'my-custom-class',
    header: header,
    subHeader: subheader,
    message: message,
    buttons: [
      {
        text: 'Ok',
        role: 'confirm',
        id: 'confirm-button',
        handler: onConfirm,
      },
    ],
  })
  alert.present()
  const result = await alert.onDidDismiss()
  return result.role == 'confirm'
}
