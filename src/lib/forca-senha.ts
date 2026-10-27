type CriterioSenha = {
  texto: string
  teste: (senha: string) => boolean
  // Critérios com "erro" são obrigatórios: o schema do Zod usa essa mensagem.
  // Sem "erro", o critério só conta pontos no medidor.
  erro?: string
}

// Fonte única das regras de senha: usada pelo medidor e pelo schema do Zod
export const criteriosSenha: CriterioSenha[] = [
  {
    texto: "Pelo menos 8 caracteres",
    teste: (s) => s.length >= 8,
    erro: "A senha precisa ter pelo menos 8 caracteres",
  },
  {
    texto: "Uma letra maiúscula",
    teste: (s) => /[A-Z]/.test(s),
    erro: "Inclua pelo menos uma letra maiúscula",
  },
  {
    texto: "Um número",
    teste: (s) => /\d/.test(s),
    erro: "Inclua pelo menos um número",
  },
  { texto: "Uma letra minúscula", teste: (s) => /[a-z]/.test(s) },
  { texto: "Um caractere especial (!@#...)", teste: (s) => /[^A-Za-z0-9]/.test(s) },
]

export const niveisForca = [
  { nome: "Muito fraca", cor: "bg-red-500" },
  { nome: "Fraca", cor: "bg-orange-500" },
  { nome: "Média", cor: "bg-yellow-500" },
  { nome: "Boa", cor: "bg-lime-500" },
  { nome: "Forte", cor: "bg-green-600" },
]

// Pontuação de 0 a 5: um ponto para cada critério atendido
export function calcularForcaSenha(senha: string) {
  return criteriosSenha.filter((c) => c.teste(senha)).length
}
