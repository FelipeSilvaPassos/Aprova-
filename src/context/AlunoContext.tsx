import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { buscarAluno } from '../services/alunos'
import type { Aluno } from '../types/api'

interface AlunoContextoValor {
  aluno: Aluno | null
  entrar: (aluno: Aluno) => void
  sair: () => void
  atualizar: () => Promise<void>
}

const CHAVE = 'aprova.alunoId'
const AlunoContexto = createContext<AlunoContextoValor | null>(null)

function lerIdSalvo(): number | null {
  try {
    const bruto = localStorage.getItem(CHAVE)
    return bruto ? Number(bruto) : null
  } catch {
    return null
  }
}

/** Guarda quem está estudando: só o id fica no navegador, o resto vem da API. */
export function AlunoProvider({ children }: { children: ReactNode }) {
  const [aluno, setAluno] = useState<Aluno | null>(null)

  useEffect(() => {
    const id = lerIdSalvo()
    if (id) buscarAluno(id).then(setAluno).catch(() => setAluno(null))
  }, [])

  const entrar = useCallback((novo: Aluno) => {
    setAluno(novo)
    try {
      localStorage.setItem(CHAVE, String(novo.id))
    } catch {
      /* sem armazenamento: segue só em memória */
    }
  }, [])

  const sair = useCallback(() => {
    setAluno(null)
    try {
      localStorage.removeItem(CHAVE)
    } catch {
      /* ignora */
    }
  }, [])

  const atualizar = useCallback(async () => {
    if (aluno) setAluno(await buscarAluno(aluno.id))
  }, [aluno])

  const valor = useMemo(() => ({ aluno, entrar, sair, atualizar }), [aluno, entrar, sair, atualizar])
  return <AlunoContexto.Provider value={valor}>{children}</AlunoContexto.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAluno(): AlunoContextoValor {
  const ctx = useContext(AlunoContexto)
  if (!ctx) throw new Error('useAluno precisa estar dentro de AlunoProvider')
  return ctx
}
