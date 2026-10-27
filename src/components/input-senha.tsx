import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useState } from "react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"

// Aceita as mesmas props de um input, menos "type", que é controlado aqui dentro
type InputSenhaProps = Omit<React.ComponentProps<typeof InputGroupInput>, "type">

export function InputSenha(props: InputSenhaProps) {
  const [visivel, setVisivel] = useState(false)

  return (
    <InputGroup>
      <InputGroupInput {...props} type={visivel ? "text" : "password"} />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          size="icon-xs"
          onClick={() => setVisivel((v) => !v)}
          aria-label={visivel ? "Esconder senha" : "Mostrar senha"}
          aria-pressed={visivel}
        >
          {visivel ? <EyeOffIcon /> : <EyeIcon />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}
