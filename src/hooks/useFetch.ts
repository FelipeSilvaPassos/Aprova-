import { useCallback, useEffect, useState } from 'react'

export interface EstadoFetch<T> {
  dados: T | null
  carregando: boolean
  erro: string | null
  recarregar: () => void
}

/** Executa uma consulta e devolve dados, loading e erro. Refaz quando as dependências mudam. */
export function useFetch<T>(consulta: () => Promise<T>, dependencias: unknown[] = []): EstadoFetch<T> {
  const [dados, setDados] = useState<T | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  const [tentativa, setTentativa] = useState(0)

  useEffect(() => {
    let ativo = true
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCarregando(true)
    setErro(null)
    consulta()
      .then((resultado) => {
        if (ativo) setDados(resultado)
      })
      .catch((e: unknown) => {
        if (ativo) setErro(e instanceof Error ? e.message : 'Erro inesperado.')
      })
      .finally(() => {
        if (ativo) setCarregando(false)
      })
    return () => {
      ativo = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencias, tentativa])

  const recarregar = useCallback(() => setTentativa((n) => n + 1), [])
  return { dados, carregando, erro, recarregar }
}
