import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { cadastroSchema, type CadastroForm } from "@/schemas/cadastro"

// Um cadastro que passa em todas as regras; cada teste muda só o que quer testar
const valido: CadastroForm = {
  nome: "Maria da Silva",
  email: "maria@exemplo.com",
  dataNascimento: "15/05/1990",
  telefone: "(11) 91234-5678",
  estado: "SP",
  senha: "Senha123",
  confirmarSenha: "Senha123",
  aceitaTermos: true,
}

// Devolve as mensagens de erro de um campo (ou [] se não houver)
function errosDe(dados: CadastroForm, campo: keyof CadastroForm) {
  const resultado = cadastroSchema.safeParse(dados)
  if (resultado.success) return []
  return resultado.error.issues.filter((i) => i.path[0] === campo).map((i) => i.message)
}

describe("cadastroSchema", () => {
  // O schema usa "new Date()". Congelamos o relógio para o teste não depender do dia de hoje
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 9, 27))
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it("aceita um cadastro válido", () => {
    expect(cadastroSchema.safeParse(valido).success).toBe(true)
  })

  it("remove espaços extras do nome", () => {
    const resultado = cadastroSchema.parse({ ...valido, nome: "  Ana  " })
    expect(resultado.nome).toBe("Ana")
  })

  it("exige que as senhas sejam iguais", () => {
    const dados = { ...valido, confirmarSenha: "Outra123" }
    expect(errosDe(dados, "confirmarSenha")).toContain("As senhas não coincidem")
  })

  it("exige letra maiúscula na senha", () => {
    const dados = { ...valido, senha: "senha123", confirmarSenha: "senha123" }
    expect(errosDe(dados, "senha")).toContain("Inclua pelo menos uma letra maiúscula")
  })

  it("rejeita quem ainda não tem 18 anos", () => {
    const dados = { ...valido, dataNascimento: "28/10/2008" } // faz 18 amanhã
    expect(errosDe(dados, "dataNascimento")).toContain("Você precisa ter pelo menos 18 anos")
  })

  it("aceita quem faz 18 anos hoje", () => {
    const dados = { ...valido, dataNascimento: "27/10/2008" }
    expect(errosDe(dados, "dataNascimento")).toEqual([])
  })

  it("rejeita data no futuro", () => {
    const dados = { ...valido, dataNascimento: "01/01/2030" }
    expect(errosDe(dados, "dataNascimento")).toContain("Data inválida")
  })
})
