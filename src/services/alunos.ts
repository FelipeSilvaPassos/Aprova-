import type { Aluno, AlunoNovo, Conclusao, Progresso, ProgressoNovo } from '../types/api'
import { enviar, get, remover } from './http'

export const cadastrarAluno = (dados: AlunoNovo) => enviar<Aluno>('POST', '/alunos', dados)

export const buscarAluno = (id: number) => get<Aluno>(`/alunos/${id}`)

export const buscarAlunoPorMatricula = (matricula: string) =>
  get<Aluno>(`/alunos/matricula/${encodeURIComponent(matricula)}`)

export const enviarCertificado = (id: number) => enviar<Aluno>('PUT', `/alunos/${id}/certificado`)

export const listarProgressos = (alunoId: number) => get<Progresso[]>(`/alunos/${alunoId}/progressos`)

export const concluirLicao = (alunoId: number, dados: ProgressoNovo) =>
  enviar<Conclusao>('POST', `/alunos/${alunoId}/progressos`, dados)

export const removerProgresso = (alunoId: number, licaoId: number) =>
  remover(`/alunos/${alunoId}/progressos/${licaoId}`)
