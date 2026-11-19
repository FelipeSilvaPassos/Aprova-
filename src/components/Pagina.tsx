import type { ReactNode } from 'react'

interface PaginaProps {
  titulo: string
  subtitulo?: string
  children: ReactNode
}

/** Cabeçalho padrão das páginas internas. */
export default function Pagina({ titulo, subtitulo, children }: PaginaProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-extrabold sm:text-4xl">{titulo}</h1>
      {subtitulo && <p className="mt-2 max-w-2xl text-lg text-marinho/80">{subtitulo}</p>}
      <div className="mt-8">{children}</div>
    </section>
  )
}
