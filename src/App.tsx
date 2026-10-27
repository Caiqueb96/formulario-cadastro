import { FormularioCadastro } from "@/components/cadastro/formulario-cadastro"
import { FundoDecorativo } from "@/components/fundo-decorativo"
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <>
      <FundoDecorativo />

      <main className="mx-auto grid min-h-svh w-full max-w-6xl items-center gap-16 px-6 py-16 lg:grid-cols-2 lg:gap-24">
        {/* Coluna da esquerda: apresentação */}
        <section className="flex flex-col gap-6">
          <span className="text-xs tracking-widest text-muted-foreground uppercase">
            — Cadastro
          </span>
          <h1 className="text-5xl leading-[1.05] font-light tracking-tight text-balance sm:text-6xl">
            Crie sua conta em poucos passos.
          </h1>
          <p className="max-w-sm text-muted-foreground">
            Leva menos de um minuto. Seus dados ficam seguros e você pode alterá-los
            quando quiser.
          </p>
        </section>

        {/* Coluna da direita: o formulário */}
        <section className="w-full max-w-md lg:justify-self-end">
          <FormularioCadastro />
        </section>

        {/* Onde os toasts são desenhados; basta um no app inteiro */}
        <Toaster position="top-center" richColors theme="dark" />
      </main>
    </>
  )
}

export default App
