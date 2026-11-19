// Tipos das respostas da API Java (Aprova+ API). Datas chegam como "AAAA-MM-DD".

export interface Parceiro {
  id: number
  nome: string
  cidade: string
  estado: string
  tipo: string
}

export interface Area {
  id: number
  nome: string
}

export interface Materia {
  id: number
  areaId: number
  nome: string
}

export interface Licao {
  id: number
  materiaId: number
  nome: string
  ordem: number
  xpRecompensa: number
}

export interface Curso {
  id: number
  areaId: number
  nome: string
  tipo: string
  link: string
  gratuito: boolean
}

export type Nivel = 'BRONZE' | 'PRATA' | 'OURO' | 'DIAMANTE' | 'PLATINA'

export interface Aluno {
  id: number
  parceiroId: number
  nome: string
  matricula: string
  dataNascimento: string
  nivel: Nivel | string
  xpTotal: number
  sequenciaDias: number
  certificado: string
  ultimoAcesso: string | null
}

export interface AlunoNovo {
  parceiroId: number
  nome: string
  dataNascimento: string
}

export interface Progresso {
  alunoId: number
  licaoId: number
  dataConclusao: string
  acertos: number
  questoes: number
  nota: number
}

export interface ProgressoNovo {
  licaoId: number
  acertos: number
  questoes: number
}

export interface Conclusao {
  alunoId: number
  licaoId: number
  acertos: number
  questoes: number
  nota: number
  xpGanho: number
  xpTotal: number
  nivel: string
  sequenciaDias: number
}

export interface CampoInvalido {
  campo: string
  mensagem: string
}

/** Formato único de erro devolvido pela API. */
export interface ErroApi {
  status: number
  erro: string
  mensagem: string
  campos?: CampoInvalido[]
}
