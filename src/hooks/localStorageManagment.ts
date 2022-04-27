import { useMiscStore } from '@/store/misc'
import { Review } from '@/store/reviewStore'
import { Network } from '@capacitor/network'
import { Storage } from '@capacitor/storage'
import { fetchPost } from './fetchMethods'
import { showLoadingToast } from './notifications'

export async function storeNewReview(review: Review) {
  let reviewsToBeStored = []
  const { value } = await Storage.get({ key: 'storedReviews' })
  if (value) {
    const storedReviewsParsed = await JSON.parse(value)
    reviewsToBeStored = [...storedReviewsParsed, review]
  } else reviewsToBeStored = [review]
  const jsonReviewsToStore = JSON.stringify(reviewsToBeStored)
  console.log(reviewsToBeStored)
  await Storage.set({
    key: 'storedReviews',
    value: jsonReviewsToStore,
  })
  await useMiscStore().checkUnsavedDataExists()
}

export async function saveStoredReviews() {
  const { value } = await Storage.get({ key: 'storedReviews' })
  const isConnected = await Network.getStatus()
  if (value && isConnected) {
    const storedReviewsParsed = await JSON.parse(value)
    const response = await fetchPost(
      'backendUrlToSaveMultiple',
      storedReviewsParsed
    )
    //THIS WOULD NEED BETTER ERROR HANDLING HERE
    if (response === false || response instanceof Error) return false
    await Storage.remove({ key: 'storedReviews' })
    await useMiscStore().checkUnsavedDataExists()
    const toastStoreReviewsSaved = await showLoadingToast({
      message: `Przywrócono połączenie z internete i zapisano zapisane ankiety`,
      duration: 2500,
      color: 'success',
    })
    toastStoreReviewsSaved.removeAttribute('tabindex')
    toastStoreReviewsSaved.present()
    return true
  } else return false
}

export async function unsavedDataExists() {
  const { value } = await Storage.get({ key: 'storedReviews' })
  return !!value
}
