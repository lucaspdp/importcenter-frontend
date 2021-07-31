export const formatCurrency = (value) =>{
    return Intl.NumberFormat('pt-BR', {currency: 'BRL', minimumFractionDigits: 2}).format(value)
}