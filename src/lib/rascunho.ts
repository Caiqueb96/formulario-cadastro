import { z } from "zod"

import type { CadastroForm } from "@/schemas/cadastro"

const CHAVE = "cadastro:rascunho"

// Só guardamos campos sem dados sensíveis: senha NUNCA vai para o localStorage,
// porque qualquer script rodando na página consegue ler o que está lá.
// O schema aqui é "frouxo" de propósito: um rascunho pode estar incompleto
// (ex: "joao@"), então só conferimos se cada campo é texto.
const rascunhoSchema = z
  .object({
    nome: z.string(),
    email: z.string(),
    dataNascimento: z.string(),
    telefone: z.string(),
    estado: z.string(),
  })
  .partial()

export type Rascunho = z.infer<typeof rascunhoSchema>

export function carregarRascunho(): Rascunho {
  try {
    const texto = localStorage.getItem(CHAVE)
    if (!texto) return {}
    // safeParse não lança erro: devolve { success, data } ou { success, error }
    const resultado = rascunhoSchema.safeParse(JSON.parse(texto))
    return resultado.success ? resultado.data : {}
  } catch {
    // JSON corrompido ou localStorage bloqueado (ex: aba anônima): ignora
    return {}
  }
}

export function salvarRascunho(valores: Partial<CadastroForm>) {
  const { nome, email, dataNascimento, telefone, estado } = valores
  try {
    localStorage.setItem(CHAVE, JSON.stringify({ nome, email, dataNascimento, telefone, estado }))
  } catch {
    // Sem espaço ou sem permissão: o formulário continua funcionando sem rascunho
  }
}

export function limparRascunho() {
  try {
    localStorage.removeItem(CHAVE)
  } catch {
    // idem
  }
}

export function temConteudo(rascunho: Rascunho) {
  return Object.values(rascunho).some(Boolean)
}
