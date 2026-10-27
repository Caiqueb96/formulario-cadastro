import { estados, type DadosPublicos } from "@/schemas/cadastro"

// Lista de "rótulo: valor" usada na confirmação e na tela de sucesso
export function ResumoDados({ dados, senha }: { dados: DadosPublicos; senha?: string }) {
  const resumo = [
    { rotulo: "Nome", valor: dados.nome },
    { rotulo: "E-mail", valor: dados.email },
    { rotulo: "Nascimento", valor: dados.dataNascimento },
    { rotulo: "Telefone", valor: dados.telefone },
    { rotulo: "Estado", valor: estados.find((e) => e.value === dados.estado)?.label },
  ]
  // A senha é opcional: só a confirmação mostra (mascarada)
  if (senha !== undefined) resumo.push({ rotulo: "Senha", valor: "•".repeat(senha.length) })

  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 border-y py-5 text-sm">
      {resumo.map((item) => (
        <div key={item.rotulo} className="contents">
          <dt className="text-xs tracking-widest text-muted-foreground uppercase">{item.rotulo}</dt>
          <dd className="truncate">{item.valor}</dd>
        </div>
      ))}
    </dl>
  )
}
