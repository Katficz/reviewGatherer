import { PersonalData } from '@/store/reviewStore'
import { isPossiblePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js'

export function validatePersonalInfo(personalData: PersonalData) {
  //using patterns here instead of ion inputs, coz ion inputs sometimes
  //were acting kinda weird
  //return string if validation is not succesful
  console.log(personalData.pesel)
  if (
    !personalData.zipCode.match(/[0-9]{2}-[0-9]{3}/g) &&
    personalData.zipCode != ''
  )
    return 'Niepoprawny kod pocztowy! Podaj kod w formacie XX-XXX' // match regex for xx-xxx
  if (
    (!isPossiblePhoneNumber(personalData.phoneNum, 'PL') ||
      !isValidPhoneNumber(personalData.phoneNum, 'PL')) &&
    personalData.phoneNum != ''
  )
    return 'Niepoprawny numer telefonu!'
  if (
    personalData.pesel != 0 &&
    !personalData.pesel.toString().match(/^[0-9]{11}$/g)
  )
    return 'Numer PESEL nieprawidłowy'
  return true
}
