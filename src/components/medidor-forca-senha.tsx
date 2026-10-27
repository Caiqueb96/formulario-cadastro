import { CheckIcon, XIcon } from "lucide-react"

import { calcularForcaSenha, criteriosSenha, niveisForca } from "@/lib/forca-senha"
import { cn } from "@/lib/utils"

export function MedidorForcaSenha({ senha }: { senha: string }) {
  const pontos = calcularForcaSenha(senha)
  // 1 ponto -> nível 0 ("Muito fraca") ... 5 pontos -> nível 4 ("Forte")
  const nivel = niveisForca[Math.max(pontos - 1, 0)]

  return (
    <div className="flex flex-col gap-2">
      {/* Barra dividida em 5 partes; acende uma parte por ponto */}
      <div className="flex gap-1" aria-hidden>
        {niveisForca.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full bg-muted transition-colors",
              i < pontos && nivel.cor
            )}
          />
        ))}
      </div>

      {senha && (
        <p className="text-xs text-muted-foreground" aria-live="polite">
          Força da senha: <span className="font-medium text-foreground">{nivel.nome}</span>
        </p>
      )}

      <ul className="grid gap-1 text-xs">
        {criteriosSenha.map((criterio) => {
          const ok = criterio.teste(senha)
          return (
            <li
              key={criterio.texto}
              className={cn(
                "flex items-center gap-1.5",
                ok ? "text-green-600" : "text-muted-foreground"
              )}
            >
              {ok ? <CheckIcon className="size-3.5" /> : <XIcon className="size-3.5" />}
              {criterio.texto}
              {!criterio.erro && <span className="opacity-70">(opcional)</span>}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
