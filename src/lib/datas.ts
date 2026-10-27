// "25/12/2000" -> Date. Devolve null se a data não existir (ex: "31/02/2000")
export function converterData(texto: string): Date | null {
  const [dia, mes, ano] = texto.split("/").map(Number)

  // Atenção: no Date do JavaScript os meses começam em 0 (janeiro = 0, dezembro = 11)
  const data = new Date(ano, mes - 1, dia)

  // O Date "corrige" datas impossíveis sem avisar: 31/02/2000 vira 02/03/2000.
  // Se algum pedaço mudou na conversão, a data digitada não existe
  const existe =
    data.getFullYear() === ano && data.getMonth() === mes - 1 && data.getDate() === dia
  return existe ? data : null
}

// Idade em anos completos. "hoje" é um parâmetro para facilitar testes
export function calcularIdade(nascimento: Date, hoje = new Date()) {
  let idade = hoje.getFullYear() - nascimento.getFullYear()

  // Subtrair os anos não basta: se o aniversário deste ano ainda não chegou, tira 1
  const aindaNaoFezAniversario =
    hoje.getMonth() < nascimento.getMonth() ||
    (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() < nascimento.getDate())
  if (aindaNaoFezAniversario) idade--

  return idade
}
