import type { Area, Curso, Licao, Materia, Parceiro } from '../types/api'
import { get } from './http'

export const listarAreas = () => get<Area[]>('/areas')
export const listarMaterias = () => get<Materia[]>('/materias')
export const listarLicoes = () => get<Licao[]>('/licoes')
export const buscarLicao = (id: number) => get<Licao>(`/licoes/${id}`)
export const listarCursos = () => get<Curso[]>('/cursos')
export const listarParceiros = () => get<Parceiro[]>('/parceiros')
