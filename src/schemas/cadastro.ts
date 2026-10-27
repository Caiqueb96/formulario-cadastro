import { z } from "zod"

import { calcularIdade, converterData } from "@/lib/datas"
import { criteriosSenha } from "@/lib/forca-senha"

export const IDADE_MINIMA = 18

export const estados = [
  { label: "São Paulo", value: "SP" },
  { label: "Rio de Janeiro", value: "RJ" },
  { label: "Minas Gerais", value: "MG" },
  { label: "Paraná", value: "PR" },
  { label: "Bahia", value: "BA" },
  { label: "Outro", value: "OUTRO" },
]

// O schema descreve as regras de validação de cada campo.
// O zodResolver conecta essas regras ao react-hook-form.
export const cadastroSchema = z
  .object({
    nome: z
      .string()
      .trim()
      .min(3, { error: "O nome precisa ter pelo menos 3 caracteres" }),
    email: z.email({ error: "Informe um e-mail válido" }),
    dataNascimento: z
      .string()
      .regex(/^\d{2}\/\d{2}\/\d{4}$/, { error: "Use o formato DD/MM/AAAA" })
      // Cada refine recebe o texto e devolve true (ok) ou false (mostra o erro)
      .refine(
        (texto) => {
          const data = converterData(texto)
          // Existe, não está no futuro e não tem mais de 120 anos
          return data !== null && data <= new Date() && calcularIdade(data) <= 120
        },
        { error: "Data inválida" }
      )
      .refine(
        (texto) => {
          const data = converterData(texto)
          return data !== null && calcularIdade(data) >= IDADE_MINIMA
        },
        { error: `Você precisa ter pelo menos ${IDADE_MINIMA} anos` }
      ),
    telefone: z
      .string()
      // Com a máscara, o valor sempre chega formatado: fixo (10) ou celular (11 dígitos)
      .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, {
        error: "Telefone inválido. Ex: (11) 91234-5678",
      }),
    estado: z.string().min(1, { error: "Selecione um estado" }),
    // As regras vêm de criteriosSenha: cada critério obrigatório vira um .refine()
    senha: criteriosSenha.reduce(
      (schema, criterio) =>
        criterio.erro ? schema.refine(criterio.teste, { error: criterio.erro }) : schema,
      z.string()
    ),
    confirmarSenha: z.string(),
    aceitaTermos: z.boolean().refine((v) => v, {
      error: "Você precisa aceitar os termos",
    }),
  })
  // Validação que depende de mais de um campo
  .refine((dados) => dados.senha === dados.confirmarSenha, {
    error: "As senhas não coincidem",
    path: ["confirmarSenha"],
  })

// O tipo TypeScript é gerado automaticamente a partir do schema
export type CadastroForm = z.infer<typeof cadastroSchema>

// Só os campos que podem ser exibidos e guardados depois do envio (sem senha)
export type DadosPublicos = Pick<
  CadastroForm,
  "nome" | "email" | "dataNascimento" | "telefone" | "estado"
>
