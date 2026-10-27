// Formata o telefone conforme a pessoa digita:
// "11"          -> "(11"
// "119123"      -> "(11) 9123"
// "1191234567"  -> "(11) 9123-4567"   (fixo, 10 dígitos)
// "11912345678" -> "(11) 91234-5678"  (celular, 11 dígitos)
export function formatarTelefone(valor: string) {
  const digitos = valor.replace(/\D/g, "").slice(0, 11)

  if (digitos.length === 0) return ""
  if (digitos.length <= 2) return `(${digitos}`
  if (digitos.length <= 6) return `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`
  if (digitos.length <= 10) {
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 6)}-${digitos.slice(6)}`
  }
  return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`
}

// Formata a data conforme a pessoa digita:
// "25"       -> "25"
// "2512"     -> "25/12"
// "25122000" -> "25/12/2000"
export function formatarData(valor: string) {
  const digitos = valor.replace(/\D/g, "").slice(0, 8)

  if (digitos.length <= 2) return digitos
  if (digitos.length <= 4) return `${digitos.slice(0, 2)}/${digitos.slice(2)}`
  return `${digitos.slice(0, 2)}/${digitos.slice(2, 4)}/${digitos.slice(4)}`
}
