import { CircleCheckIcon, RotateCcwIcon } from "lucide-react"
import { useEffect, useRef } from "react"

import { ResumoDados } from "@/components/cadastro/resumo-dados"
import { Button } from "@/components/ui/button"
import type { DadosPublicos } from "@/schemas/cadastro"

export function TelaSucesso({
  dados,
  onNovoCadastro,
}: {
  dados: DadosPublicos
  onNovoCadastro: () => void
}) {
  // useRef guarda uma referência ao elemento <h2> de verdade (o do DOM)
  const tituloRef = useRef<HTMLHeadingElement>(null)

  // O botão que tinha o foco sumiu da tela; movemos o foco para o título,
  // assim leitores de tela anunciam o sucesso e o Tab continua daqui
  useEffect(() => {
    tituloRef.current?.focus()
  }, [])

  const primeiroNome = dados.nome.split(" ")[0]

  return (
    // zoom-in-95: começa em 95% do tamanho e cresce até 100%, dando um "pop" suave
    <div className="flex w-full animate-in flex-col gap-10 duration-500 fade-in zoom-in-95 motion-reduce:animate-none">
      <header className="flex flex-col gap-4">
        <CircleCheckIcon className="size-10 text-emerald-400" aria-hidden />
        <div className="flex flex-col gap-1">
          <h2
            ref={tituloRef}
            // tabIndex -1: dá para focar via código, mas o Tab não para aqui
            tabIndex={-1}
            className="text-2xl font-light tracking-tight outline-none"
          >
            Conta criada!
          </h2>
          <p className="text-sm text-muted-foreground">
            Bem-vindo(a), {primeiroNome}. Estes são os dados cadastrados.
          </p>
        </div>
      </header>

      <ResumoDados dados={dados} />

      <footer className="flex justify-end">
        <Button type="button" variant="ghost" onClick={onNovoCadastro} className="h-11 rounded-full px-5">
          <RotateCcwIcon data-icon="inline-start" />
          Fazer novo cadastro
        </Button>
      </footer>
    </div>
  )
}
