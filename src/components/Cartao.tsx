import type { ReactNode } from 'react'

interface CartaoProps {
  titulo: string
  children?: ReactNode
  rodape?: ReactNode
  destaque?: boolean
}

/** Bloco de conteúdo reutilizado em Home, Trilha, Cursos, Integrantes e Sobre. */
export default function Cartao({ titulo, children, rodape, destaque = false }: CartaoProps) {
  return (
    <article className={`flex flex-col gap-3 rounded-2xl border-2 p-5 ${destaque ? 'border-marinho bg-amarelo/30' : 'border-marinho bg-white'}`}>
      <h3 className="text-lg font-extrabold">{titulo}</h3>
      {children && <div className="flex-1 text-marinho">{children}</div>}
      {rodape && <div className="pt-1">{rodape}</div>}
    </article>
  )
}
