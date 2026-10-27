import { describe, expect, it } from "vitest"

import { calcularIdade, converterData } from "@/lib/datas"

// describe agrupa testes relacionados; it descreve UM comportamento esperado
describe("converterData", () => {
  it("converte uma data válida", () => {
    const data = converterData("25/12/2000")
    expect(data).toEqual(new Date(2000, 11, 25))
  })

  it("rejeita dia que não existe no mês", () => {
    expect(converterData("31/02/2000")).toBeNull()
  })

  it("aceita 29/02 em ano bissexto e rejeita nos outros", () => {
    expect(converterData("29/02/2000")).not.toBeNull()
    expect(converterData("29/02/2001")).toBeNull()
  })

  it("rejeita mês 13 e dia 00", () => {
    expect(converterData("15/13/2000")).toBeNull()
    expect(converterData("00/01/2000")).toBeNull()
  })
})

describe("calcularIdade", () => {
  // "Hoje" fixo: o resultado não muda conforme o dia em que o teste roda
  const hoje = new Date(2026, 9, 27) // 27/10/2026

  it("conta o ano quando o aniversário é hoje", () => {
    expect(calcularIdade(new Date(2008, 9, 27), hoje)).toBe(18)
  })

  it("não conta o ano quando o aniversário é amanhã", () => {
    expect(calcularIdade(new Date(2008, 9, 28), hoje)).toBe(17)
  })

  it("não conta o ano quando o aniversário é num mês que ainda não chegou", () => {
    expect(calcularIdade(new Date(2000, 11, 1), hoje)).toBe(25)
  })
})
