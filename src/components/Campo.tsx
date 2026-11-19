import type { InputHTMLAttributes, ReactNode } from 'react'

interface CampoProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  rotulo: string
  erro?: string
  ajuda?: string
  filho?: ReactNode
}

/** Campo de formulário com rótulo, ajuda e mensagem de erro ligados por acessibilidade. */
export default function Campo({ id, rotulo, erro, ajuda, filho, className = '', ...resto }: CampoProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-bold">
        {rotulo}
      </label>
      {filho ?? (
        <input
          id={id}
          className={`input ${erro ? 'input-erro' : ''} ${className}`}
          aria-invalid={erro ? true : undefined}
          aria-describedby={erro ? `${id}-erro` : ajuda ? `${id}-ajuda` : undefined}
          {...resto}
        />
      )}
      {ajuda && !erro && (
        <p id={`${id}-ajuda`} className="text-sm text-marinho/80">
          {ajuda}
        </p>
      )}
      {erro && (
        <p id={`${id}-erro`} role="alert" className="text-sm font-semibold text-red-700">
          {erro}
        </p>
      )}
    </div>
  )
}
