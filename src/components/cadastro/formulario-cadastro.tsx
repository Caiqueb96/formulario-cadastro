import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { toast } from "sonner"

import { EtapaAcesso } from "@/components/cadastro/etapa-acesso"
import { EtapaConfirmacao } from "@/components/cadastro/etapa-confirmacao"
import { EtapaDadosPessoais } from "@/components/cadastro/etapa-dados-pessoais"
import { IndicadorEtapas } from "@/components/cadastro/indicador-etapas"
import { TelaSucesso } from "@/components/cadastro/tela-sucesso"
import { Button } from "@/components/ui/button"
import {
  carregarRascunho,
  limparRascunho,
  salvarRascunho,
  temConteudo,
} from "@/lib/rascunho"
import { cn } from "@/lib/utils"
import { cadastroSchema, type CadastroForm, type DadosPublicos } from "@/schemas/cadastro"

// Cada etapa diz quais campos ela valida antes de avançar
const etapas: {
  titulo: string
  descricao: string
  campos: (keyof CadastroForm)[]
  Componente: () => React.ReactNode
}[] = [
  {
    titulo: "Dados pessoais",
    descricao: "Conte um pouco sobre você.",
    campos: ["nome", "email", "dataNascimento", "telefone", "estado"],
    Componente: EtapaDadosPessoais,
  },
  {
    titulo: "Acesso",
    descricao: "Crie uma senha para entrar na sua conta.",
    campos: ["senha", "confirmarSenha"],
    Componente: EtapaAcesso,
  },
  {
    titulo: "Confirmação",
    descricao: "Confira seus dados antes de finalizar.",
    campos: ["aceitaTermos"],
    Componente: EtapaConfirmacao,
  },
]

const valoresIniciais: CadastroForm = {
  nome: "",
  email: "",
  dataNascimento: "",
  telefone: "",
  estado: "",
  senha: "",
  confirmarSenha: "",
  aceitaTermos: false,
}

export function FormularioCadastro() {
  const [etapaAtual, setEtapaAtual] = useState(0)
  // Guarda para que lado a animação deve deslizar
  const [direcao, setDirecao] = useState<"avancar" | "voltar">("avancar")
  const etapa = etapas[etapaAtual]
  const ultimaEtapa = etapaAtual === etapas.length - 1
  // null = ainda não cadastrou; com dados = mostra a tela de sucesso
  const [concluido, setConcluido] = useState<DadosPublicos | null>(null)

  // Passando uma função, o useState só a executa na primeira renderização,
  // em vez de ler o localStorage de novo a cada render
  const [rascunho] = useState(carregarRascunho)

  const form = useForm<CadastroForm>({
    resolver: zodResolver(cadastroSchema),
    // O rascunho sobrescreve os valores iniciais dos campos que ele tiver
    defaultValues: { ...valoresIniciais, ...rascunho },
    // Valida ao sair do campo e, depois disso, a cada tecla
    mode: "onTouched",
  })

  // Salva o rascunho sempre que algum campo muda
  useEffect(() => {
    // subscribe devolve uma função que cancela a inscrição. Retornando ela,
    // o React a chama como "limpeza" quando o componente sai da tela
    return form.subscribe({
      formState: { values: true },
      callback: ({ values }) => salvarRascunho(values),
    })
  }, [form])

  // Avisa uma vez que o rascunho foi recuperado, com opção de descartar
  useEffect(() => {
    if (!temConteudo(rascunho)) return
    toast.info("Rascunho recuperado", {
      // Um id fixo evita toast duplicado (o StrictMode roda efeitos 2x em dev)
      id: "rascunho",
      description: "Continuamos de onde você parou.",
      action: {
        label: "Descartar",
        onClick: () => {
          form.reset(valoresIniciais)
          limparRascunho()
        },
      },
    })
  }, [rascunho, form])

  async function avancar() {
    // Valida só os campos desta etapa; foca o primeiro com erro
    const valido = await form.trigger(etapa.campos, { shouldFocus: true })
    if (!valido) return
    setDirecao("avancar")
    setEtapaAtual((e) => e + 1)
  }

  function voltar() {
    setDirecao("voltar")
    setEtapaAtual((e) => e - 1)
  }

  // Avançando, o conteúdo entra pela direita; voltando, pela esquerda.
  // motion-reduce: desliga a animação para quem pediu "reduzir movimento" no sistema
  const animacaoEtapa = cn(
    "animate-in duration-300 ease-out fade-in motion-reduce:animate-none",
    direcao === "avancar" ? "slide-in-from-right-8" : "slide-in-from-left-8"
  )

  // Só é chamado quando todos os campos passam na validação do Zod
  async function onSubmit(dados: CadastroForm) {
    await new Promise((r) => setTimeout(r, 800)) // simula uma chamada à API
    // Guardamos só o que a tela de sucesso mostra; a senha fica de fora
    const { nome, email, dataNascimento, telefone, estado } = dados
    setConcluido({ nome, email, dataNascimento, telefone, estado })
    form.reset(valoresIniciais)
    // Depois do reset: ele avisa o subscribe, que salvaria os campos vazios
    limparRascunho()
    setEtapaAtual(0)
  }

  // Enter ou o botão principal: nas etapas iniciais avança, na última envia
  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (!ultimaEtapa) {
      e.preventDefault()
      avancar()
      return
    }
    form.handleSubmit(onSubmit)(e)
  }

  // Renderização condicional: depois do envio, mostra a tela de sucesso.
  // Este if fica DEPOIS de todos os hooks (useState, useForm, useEffect):
  // o React exige que os hooks rodem sempre, na mesma ordem, em todo render
  if (concluido) {
    return <TelaSucesso dados={concluido} onNovoCadastro={() => setConcluido(null)} />
  }

  return (
    <div className="flex w-full flex-col gap-10">
      <header className="flex flex-col gap-6">
        <IndicadorEtapas titulos={etapas.map((e) => e.titulo)} atual={etapaAtual} />
        {/* key muda a cada etapa: o React recria o elemento e a animação toca de novo */}
        <div key={etapaAtual} className={cn("flex flex-col gap-1", animacaoEtapa)}>
          <h2 className="text-2xl font-light tracking-tight">{etapa.titulo}</h2>
          <p className="text-sm text-muted-foreground">{etapa.descricao}</p>
        </div>
      </header>

      {/* FormProvider deixa o formulário disponível para as etapas via useFormContext */}
      <FormProvider {...form}>
        <form id="form-cadastro" noValidate onSubmit={handleFormSubmit}>
          <div key={etapaAtual} className={animacaoEtapa}>
            <etapa.Componente />
          </div>
        </form>
      </FormProvider>

      <footer className="flex items-center justify-between gap-4">
        <Button
          type="button"
          variant="ghost"
          onClick={voltar}
          // invisible mantém o espaço do botão, para o "Próximo" não pular de lugar
          className={cn(
            "h-11 rounded-full px-5 text-muted-foreground",
            etapaAtual === 0 && "invisible"
          )}
          disabled={form.formState.isSubmitting}
        >
          <ArrowLeftIcon data-icon="inline-start" />
          Voltar
        </Button>
        <Button
          type="submit"
          form="form-cadastro"
          className="h-11 rounded-full px-6"
          disabled={form.formState.isSubmitting}
        >
          {ultimaEtapa
            ? form.formState.isSubmitting
              ? "Enviando..."
              : "Cadastrar"
            : "Próximo"}
          <ArrowRightIcon data-icon="inline-end" />
        </Button>
      </footer>
    </div>
  )
}
