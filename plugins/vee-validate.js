// https://github.com/logaretm/vee-validate
import { extend, localize } from 'vee-validate'
import { required, integer } from 'vee-validate/dist/rules'

// Add a basic rules
// https://logaretm.github.io/vee-validate/guide/rules.html
extend('required', required)

extend('integer', integer)

// https://logaretm.github.io/vee-validate/guide/basics.html#rule-arguments
extend('minmax', {
  validate(value, { min, max }) {
    return +value >= min && +value <= max
  },
  params: ['min', 'max']
})

// https://logaretm.github.io/vee-validate/guide/localization.html#using-the-default-i18n
localize({
  es: {
    messages: {
      required: 'Campo requerido',
      integer: 'Debe de ser un número entero',
      minmax: (_, { min, max }) => `Debe de ser un número entre ${min} y ${max}`
    }
  }
})

localize('es')
