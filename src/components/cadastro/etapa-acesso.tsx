import { Controller, useFormContext } from "react-hook-form"

import { InputSenha } from "@/components/input-senha"
import { MedidorForcaSenha } from "@/components/medidor-forca-senha"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import type { CadastroForm } from "@/schemas/cadastro"

export function EtapaAcesso() {
  const { control } = useFormContext<CadastroForm>()

  return (
    <FieldGroup>
      <Controller
        name="senha"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Senha</FieldLabel>
            <InputSenha
              {...field}
              id={field.name}
              autoComplete="new-password"
              aria-invalid={fieldState.invalid}
            />
            {/* field.value é o valor atual: o medidor atualiza a cada tecla */}
            <MedidorForcaSenha senha={field.value} />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="confirmarSenha"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Confirmar senha</FieldLabel>
            <InputSenha
              {...field}
              id={field.name}
              autoComplete="new-password"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  )
}
