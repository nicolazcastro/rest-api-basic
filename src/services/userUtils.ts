import { Profile } from '../models/enums'
import validator from 'validator'
import { getNextUserId } from '../services/usersServices'

const parseName = (nameFromRequest: any): string => {
  if (!isString(nameFromRequest)) {
    throw new Error('Incorrect or missing name')
  }
  return nameFromRequest
}
const parsePassword = (passwordFromRequest: any): string => {
  if (!isString(passwordFromRequest) || !isPassword(passwordFromRequest)) {
    throw new Error('Incorrect or missing pasword')
  }
  return passwordFromRequest
}
const parseEmail = (emailFromRequest: any): string => {
  if (!isEmail(emailFromRequest) || !isString(emailFromRequest)) {
    throw new Error('Incorrect or missing email')
  }
  return emailFromRequest
}
const parseProfile = (emailFromRequest: any): string => {
  if (!isProfile(emailFromRequest) || !isString(emailFromRequest)) {
    throw new Error('Incorrect or missing profile')
  }
  return emailFromRequest
}

const isProfile = (param: any): boolean => {
  return Object.values(Profile).includes(param)
}

const isString = (string: string): boolean => {
  return typeof string === 'string'
}

const isPassword = (string: string): boolean => {
  const passOptions = {
    minLength: 4,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 0,
    minSymbols: 0,
    returnScore: false,
    pointsPerUnique: 1,
    pointsPerRepeat: 0.5,
    pointsForContainingLower: 10,
    pointsForContainingUpper: 10,
    pointsForContainingNumber: 10,
    pointsForContainingSymbol: 10
  }
  return typeof string === 'string' && validator.isStrongPassword(string, passOptions)
}

const isEmail = (email: string): boolean => {
  return validator.isEmail(email)
}
let newUserId: number = 0
const toNewUserEntry = async (object: any): Promise<any> => {
  return await getNextUserId().then((newId) => {
    newUserId = newId
    const newEntry = {
      name: parseName(object.name),
      userId: newUserId,
      email: parseEmail(object.email),
      profile: parseProfile(object.profile),
      enabled: true,
      password: parsePassword(object.password)
    }
    return newEntry
  }).catch((e: any) => {
    console.log(e)
    throw new Error(e)
  })
}

export default toNewUserEntry