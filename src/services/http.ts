import type { ErroApi } from '../types/api'

const BASE = (import.meta.env.VITE_API_URL ?? 'http://localhost:8080').replace(/\/$/, '')

/** Erro lançado quando a API responde com status fora de 2xx ou fica fora do ar. */
export class ApiError extends Error {
  status: number
  campos: Record<string, string>

  constructor(mensagem: string, status = 0, campos: Record<string, string> = {}) {
    super(mensagem)
    this.name = 'ApiError'
    this.status = status
    this.campos = campos
  }
}

/** Única porta de saída para a API: usa somente a Fetch API. */
export async function http<T>(caminho: string, init: RequestInit = {}): Promise<T> {
  let resposta: Response
  try {
    resposta = await fetch(`${BASE}${caminho}`, {
      ...init,
      headers: { 'Content-Type': 'application/json', ...init.headers },
    })
  } catch {
    throw new ApiError('Não foi possível falar com o servidor. Verifique a internet e tente de novo.')
  }

  if (resposta.status === 204) return undefined as T

  const texto = await resposta.text()
  let corpo: unknown
  try {
    corpo = texto ? JSON.parse(texto) : null
  } catch {
    corpo = null
  }

  if (!resposta.ok) {
    const erro = corpo as Partial<ErroApi> | null
    const campos: Record<string, string> = {}
    erro?.campos?.forEach((c) => {
      campos[c.campo] = c.mensagem
    })
    throw new ApiError(erro?.mensagem ?? `Erro ${resposta.status} ao falar com o servidor.`, resposta.status, campos)
  }
  return corpo as T
}

export const get = <T>(caminho: string) => http<T>(caminho)

export const enviar = <T>(metodo: 'POST' | 'PUT' | 'PATCH', caminho: string, dados?: unknown) =>
  http<T>(caminho, { method: metodo, body: dados === undefined ? undefined : JSON.stringify(dados) })

export const remover = (caminho: string) => http<void>(caminho, { method: 'DELETE' })

export const API_URL = BASE
