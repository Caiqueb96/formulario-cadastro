// Adiciona verificações para o DOM, como expect(el).toBeInTheDocument()
import "@testing-library/jest-dom/vitest"
import { cleanup } from "@testing-library/react"
import { afterEach } from "vitest"

// Depois de cada teste: tira da tela o que foi renderizado e apaga o localStorage,
// para um teste nunca influenciar o outro
afterEach(() => {
  cleanup()
  localStorage.clear()
})
