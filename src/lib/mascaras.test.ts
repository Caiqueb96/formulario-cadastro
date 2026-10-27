import { describe, expect, it } from "vitest"

import { formatarData, formatarTelefone } from "@/lib/mascaras"

describe("formatarTelefone", () => {
  // it.each roda o mesmo teste para cada linha da tabela
  it.each([
    ["", ""],
    ["11", "(11"],
    ["119123", "(11) 9123"],
    ["1191234567", "(11) 9123-4567"],
    ["11912345678", "(11) 91234-5678"],
  ])("formata %j como %j", (entrada, esperado) => {
    expect(formatarTelefone(entrada)).toBe(esperado)
  })

  it("ignora letras e corta o que passar de 11 dígitos", () => {
    expect(formatarTelefone("a11b912345678999")).toBe("(11) 91234-5678")
  })
})

describe("formatarData", () => {
  it.each([
    ["25", "25"],
    ["2512", "25/12"],
    ["25122000", "25/12/2000"],
    ["25/12/2000", "25/12/2000"],
    ["2512200099", "25/12/2000"],
  ])("formata %j como %j", (entrada, esperado) => {
    expect(formatarData(entrada)).toBe(esperado)
  })
})
