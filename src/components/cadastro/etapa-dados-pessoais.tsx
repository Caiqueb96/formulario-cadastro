import { Controller, useFormContext } from "react-hook-form"

import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { formatarData, formatarTelefone } from "@/lib/mascaras"
import { estados, type CadastroForm } from "@/schemas/cadastro"

export function EtapaDadosPessoais() {
  // Pega o "control" do formulário que está no <FormProvider> acima
  const { control } = useFormContext<CadastroForm>()

  return (
    <FieldGroup>
      {/* Controller liga o campo ao estado do react-hook-form */}
      <Controller
        name="nome"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Nome completo</FieldLabel>
            <Input
              {...field}
              id={field.name}
              placeholder="Maria da Silva"
              autoComplete="name"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>E-mail</FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="email"
              placeholder="maria@exemplo.com"
              autoComplete="email"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="dataNascimento"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Data de nascimento</FieldLabel>
            <Input
              {...field}
              id={field.name}
              onChange={(e) => field.onChange(formatarData(e.target.value))}
              inputMode="numeric"
              maxLength={10}
              placeholder="DD/MM/AAAA"
              autoComplete="bday"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="telefone"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Telefone</FieldLabel>
            <Input
              {...field}
              id={field.name}
              // A máscara é aplicada antes de o valor chegar ao react-hook-form
              onChange={(e) => field.onChange(formatarTelefone(e.target.value))}
              type="tel"
              inputMode="numeric"
              maxLength={15}
              placeholder="(11) 91234-5678"
              autoComplete="tel"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="estado"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Estado</FieldLabel>
            <Select
              items={estados}
              value={field.value || null}
              onValueChange={(valor) => field.onChange(valor ?? "")}
            >
              <SelectTrigger
                id={field.name}
                ref={field.ref}
                className="w-full"
                aria-invalid={fieldState.invalid}
                onBlur={field.onBlur}
              >
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                {estados.map((estado) => (
                  <SelectItem key={estado.value} value={estado.value}>
                    {estado.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  )
}
