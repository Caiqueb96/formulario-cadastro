import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type Props = {
  titulos: string[]
  atual: number
}

export function IndicadorEtapas({ titulos, atual }: Props) {
  return (
    <ol className="flex items-center gap-2">
      {titulos.map((titulo, i) => {
        const concluida = i < atual
        const ativa = i === atual

        return (
          <li
            key={titulo}
            className="flex flex-1 items-center gap-2"
            aria-current={ativa ? "step" : undefined}
          >
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
                concluida && "border-primary bg-primary text-primary-foreground",
                ativa && "border-primary text-primary",
                !concluida && !ativa && "text-muted-foreground"
              )}
            >
              {concluida ? <CheckIcon className="size-3.5" /> : i + 1}
            </span>
            <span
              className={cn(
                "hidden text-xs sm:inline",
                ativa ? "font-medium" : "text-muted-foreground"
              )}
            >
              {titulo}
            </span>
            {/* Linha entre as etapas (menos depois da última) */}
            {i < titulos.length - 1 && (
              <span className={cn("h-px flex-1 bg-border", concluida && "bg-primary")} />
            )}
          </li>
        )
      })}
    </ol>
  )
}
