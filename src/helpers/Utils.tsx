import { InputType } from '../types/form'

export function getRules (type: InputType,
  label: string,
  minValue?: string,
  maxValue?: string): [] {
  const min = minValue
    ? {
        min: minValue,
        message: `${label} must be minimum ${minValue} characters.`
      }
    : null

  const max = maxValue
    ? {
        max: maxValue,
        message: `${label} must be maximum ${maxValue} characters.`
      }
    : null

  const rule = {
    required: true,
    message: `Please enter a valid ${label}!`,
    type: type === InputType.Email ? 'email' : 'string'
  }

  const rules: any = []

  // switch (type) {
  //   case InputType.Password: {
  //     rules.push(passwordRules)
  //     break
  //   }
  //   case InputType.Email: {
  //     rules.push([])
  //     break
  //   }
  //   default: {
  //     rules.push(rule)
  //   }
  // }

  rules.push(rule)

  if (min) {
    rules.push(min)
  }

  if (max) {
    rules.push(max)
  }

  // const rules = type === InputType.Password ? passwordRules : type === InputType.Email ? emailRules : defaultRules

  return rules
}
