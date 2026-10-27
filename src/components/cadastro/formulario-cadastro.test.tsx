import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { FormularioCadastro } from "@/components/cadastro/formulario-cadastro"

// Testes de componente: interagimos como uma pessoa faria (clicar, digitar)
// e conferimos o que aparece na tela, sem olhar o código por dentro
describe("FormularioCadastro", () => {
  it("mostra os erros ao tentar avançar com os campos vazios", async () => {
    const usuario = userEvent.setup()
    render(<FormularioCadastro />)

    await usuario.click(screen.getByRole("button", { name: /próximo/i }))

    // findBy espera o elemento aparecer (a validação é assíncrona)
    expect(await screen.findByText("O nome precisa ter pelo menos 3 caracteres")).toBeInTheDocument()
    expect(screen.getByText("Informe um e-mail válido")).toBeInTheDocument()
    // Continua na primeira etapa
    expect(screen.getByRole("heading", { name: "Dados pessoais" })).toBeInTheDocument()
  })

  it("aplica a máscara enquanto a pessoa digita", async () => {
    const usuario = userEvent.setup()
    render(<FormularioCadastro />)

    const telefone = screen.getByLabelText("Telefone")
    await usuario.type(telefone, "11912345678")

    expect(telefone).toHaveValue("(11) 91234-5678")
  })

  it("salva o rascunho no localStorage", async () => {
    const usuario = userEvent.setup()
    render(<FormularioCadastro />)

    await usuario.type(screen.getByLabelText("Nome completo"), "Ana")

    const salvo = JSON.parse(localStorage.getItem("cadastro:rascunho") ?? "{}")
    expect(salvo.nome).toBe("Ana")
  })

  it("recupera o rascunho ao abrir de novo", () => {
    localStorage.setItem("cadastro:rascunho", JSON.stringify({ nome: "Ana", email: "ana@x.com" }))
    render(<FormularioCadastro />)

    expect(screen.getByLabelText("Nome completo")).toHaveValue("Ana")
    expect(screen.getByLabelText("E-mail")).toHaveValue("ana@x.com")
  })
})
