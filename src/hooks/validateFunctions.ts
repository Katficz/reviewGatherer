import { PersonalData } from '@/store/reviewStore'
import { isPossiblePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js'

export function validatePersonalInfo(personalData: PersonalData) {
  //return string if validation is not succesful
  if (!personalData.zipCode.match(/[0-9]{2}-[0-9]{3}/g))
    return 'Niepoprawny kod pocztowy! Podaj kod w formacie XX-XXX' // match regex for xx-xxx
  if (
    !isPossiblePhoneNumber(personalData.phoneNum, 'PL') ||
    !isValidPhoneNumber(personalData.phoneNum, 'PL')
  )
    return 'Niepoprawny numer telefonu!'
  if (
    !isNaN(personalData.pesel) &&
    !personalData.pesel.toString().match(/^[0-9]{11}$/g)
  )
    return 'Numer PESEL nieprawidłowy'
  return true
}
