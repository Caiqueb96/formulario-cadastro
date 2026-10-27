import { Controller, useFormContext } from "react-hook-form"

import { ResumoDados } from "@/components/cadastro/resumo-dados"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import type { CadastroForm } from "@/schemas/cadastro"

export function EtapaConfirmacao() {
  const { control, getValues } = useFormContext<CadastroForm>()
  // getValues lê os valores sem "assinar" mudanças; aqui eles não mudam mais
  const dados = getValues()

  return (
    <FieldGroup>
      <ResumoDados dados={dados} senha={dados.senha} />

      <Controller
        name="aceitaTermos"
        control={control}
        render={({ field, fieldState }) => (
          <Field orientation="horizontal" data-invalid={fieldState.invalid}>
            <Checkbox
              id={field.name}
              checked={field.value}
              onCheckedChange={field.onChange}
              aria-invalid={fieldState.invalid}
            />
            <FieldLabel
              htmlFor={field.name}
              className="text-sm tracking-normal text-foreground normal-case"
            >
              Li e aceito os termos de uso
            </FieldLabel>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  )
}
