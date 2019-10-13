// import _ from 'lodash'

const clientId = 2
const clientSecret = '8yiUBY3TnipJ6myyhopbYbmGxkXiKqe9NUOuVZtg'
const scope = '*'
const grantType = 'password'

// const clientId = 4
// const clientSecret = 'SCb8Y1oVFyVKJnAFnTYqKSS06ScNN6OCfZYEvNnY'
// const scope = '*'
// const grantType = 'password'

const mask = () => {
  window.$('#cpf').mask('000.000.000-00')
  window.$('#phone').mask('(00) 0000-0000')
  window.$('#cellphone').mask('(00) 00000-0000')
  window.$('#birthday').mask('00/00/0000')
  window.$('#date').mask('00/00/0000')
  window.$('#birthdate').mask('00/00/0000')
  window.$('#cep').mask('00000-000')
  window.$('#number').mask('####0')
  window.$('#month').mask('00')
  window.$('#year').mask('0000')
  window.$('#cvv').mask('#000')
  window.$('#cardNumber').mask('0000 0000 0000 0000')
}

const UFS = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'TO', label: 'Tocantins' },
]

function formatNumberToCurrency(amount, decimalCount = 2, decimal = '.', thousands = '.') {
  try {
    decimalCount = Math.abs(decimalCount)
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount

    const negativeSign = amount < 0 ? '-' : ''

    const i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString()
    const j = (i.length > 3) ? i.length % 3 : 0

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${thousands}`) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : '')
  } catch (e) {
    console.log(e)
  }
}

const formatCurrencyToNumber = valor => (isNaN(valor) === false ? parseFloat(valor) : parseFloat(valor.replace('R$', '').replace('.', '').replace(',', '.')))


export default {
  clientId,
  clientSecret,
  scope,
  grantType,
  UFS,
  mask,
  formatNumberToCurrency,
  formatCurrencyToNumber,
}
