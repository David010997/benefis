 export const required = value => value ? undefined : 'required'
export const maxLength = (min,max) => value =>
  value && value.length > max ? `Must be ${min}-${max} characters` : undefined
 export const maxLength15 = maxLength(3,15)
  export const minLength = (min,max) => value =>
  value && value.length < min ? `Must be ${min}-${max} characters` : undefined
  export const minLength3 = minLength(3,15)

 export const email = value =>
   value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
   'Invalid Email Address' : undefined

   export const passwordsMustMatch = (value, allValues) => 
  value !== allValues.password ? 
    'password doesn`t match' :
     undefined
