import type { ReactNode } from 'react'

interface EstadoProps {
  carregando: boolean
  erro: string | null
  vazio?: boolean
  mensagemVazio?: string
  aoTentarDeNovo?: () => void
  children: ReactNode
}

/** Mostra loading, erro de requisição ou ausência de dados; só então exibe o conteúdo. */
export default function Estado({ carregando, erro, vazio = false, mensagemVazio = 'Nada por aqui ainda.', aoTentarDeNovo, children }: EstadoProps) {
  if (carregando) {
    return (
      <p role="status" className="flex items-center gap-3 rounded-xl bg-white p-6 text-marinho">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-marinho border-t-transparent" aria-hidden="true" />
        Carregando… a primeira chamada pode levar alguns segundos.
      </p>
    )
  }
  if (erro) {
    return (
      <div role="alert" className="rounded-xl border border-red-600 bg-red-50 p-6">
        <p className="font-bold text-red-800">Não foi possível carregar.</p>
        <p className="mt-1 text-red-800">{erro}</p>
        {aoTentarDeNovo && (
          <button type="button" onClick={aoTentarDeNovo} className="btn btn-secundario mt-4">
            Tentar de novo
          </button>
        )}
      </div>
    )
  }
  if (vazio) {
    return <p className="rounded-xl bg-white p-6 text-marinho/80">{mensagemVazio}</p>
  }
  return <>{children}</>
}
