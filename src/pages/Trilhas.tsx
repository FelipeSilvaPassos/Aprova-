import { useState } from 'react'
import { Link } from 'react-router-dom'
import Estado from '../components/Estado'
import Pagina from '../components/Pagina'
import { useAluno } from '../context/AlunoContext'
import { useFetch } from '../hooks/useFetch'
import { listarProgressos } from '../services/alunos'
import { listarAreas, listarLicoes, listarMaterias } from '../services/trilha'
import type { Licao } from '../types/api'

// Deslocamento horizontal de cada lição, para o caminho fazer zigue-zague.
const DESLOCAMENTOS = [0, 44, 66, 44, 0, -44, -66, -44]

type Situacao = 'concluida' | 'atual' | 'bloqueada'

/** Página da solução 1: trilha em caminho (GET /areas, /materias, /licoes e /alunos/{id}/progressos). */
export default function Trilha() {
  const { aluno } = useAluno()
  const { dados, carregando, erro, recarregar } = useFetch(
    () =>
      Promise.all([
        listarAreas(),
        listarMaterias(),
        listarLicoes(),
        aluno ? listarProgressos(aluno.id) : Promise.resolve([]),
      ]),
    [aluno?.id, aluno?.xpTotal],
  )
  const [areaId, setAreaId] = useState<number | null>(null)

  const [areas, materias, licoes, progressos] = dados ?? [[], [], [], []]
  const concluidas = new Set(progressos.map((p) => p.licaoId))
  const areaAtual = areaId ?? areas[0]?.id ?? null
  const materiasDaArea = materias.filter((m) => m.areaId === areaAtual)

  function situacao(lista: Licao[], posicao: number): Situacao {
    if (concluidas.has(lista[posicao].id)) return 'concluida'
    if (posicao === 0 || concluidas.has(lista[posicao - 1].id)) return 'atual'
    return 'bloqueada'
  }

  return (
    <Pagina titulo="Trilha de estudos" subtitulo="Siga o caminho, resolva os exercícios de cada lição e ganhe XP para subir de nível.">
      {!aluno && (
        <p className="mb-6 rounded-xl border-2 border-marinho bg-white p-4">
          Você pode abrir as lições, mas só ganha XP se estiver com a sua conta.{' '}
          <Link to="/entrar" className="font-extrabold underline">Cadastrar ou entrar</Link>
        </p>
      )}

      <Estado carregando={carregando} erro={erro} vazio={areas.length === 0} mensagemVazio="Nenhuma área cadastrada ainda." aoTentarDeNovo={recarregar}>
        <div role="tablist" aria-label="Áreas do conhecimento" className="flex flex-wrap gap-2">
          {areas.map((a) => (
            <button
              key={a.id}
              role="tab"
              type="button"
              aria-selected={a.id === areaAtual}
              onClick={() => setAreaId(a.id)}
              className={`btn ${a.id === areaAtual ? 'btn-primario' : 'btn-secundario'}`}
            >
              {a.nome}
            </button>
          ))}
        </div>

        {materiasDaArea.length === 0 && <p className="mt-6 text-marinho/80">Esta área ainda não tem matérias.</p>}

        <div className="mx-auto mt-8 flex max-w-md flex-col gap-10">
          {materiasDaArea.map((m) => {
            const doModulo = licoes.filter((l) => l.materiaId === m.id).sort((a, b) => a.ordem - b.ordem)
            const feitas = doModulo.filter((l) => concluidas.has(l.id)).length
            return (
              <section key={m.id} aria-label={m.nome}>
                <div className="rounded-2xl border-2 border-b-4 border-marinho bg-verde px-5 py-3 text-marinho">
                  <h2 className="text-xl font-extrabold">{m.nome}</h2>
                  <p className="text-sm font-bold">{feitas} de {doModulo.length} lições concluídas</p>
                </div>

                {doModulo.length === 0 ? (
                  <p className="mt-4 text-center text-marinho/80">Sem lições por enquanto.</p>
                ) : (
                  <ol className="mt-6 flex flex-col items-center gap-6">
                    {doModulo.map((l, i) => {
                      const s = situacao(doModulo, i)
                      const deslocamento = DESLOCAMENTOS[i % DESLOCAMENTOS.length]
                      const cor =
                        s === 'concluida'
                          ? 'bg-verde border-marinho'
                          : s === 'atual'
                            ? 'bg-amarelo border-marinho'
                            : 'bg-gray-300 border-gray-500 text-gray-600'
                      const icone = s === 'concluida' ? '✓' : s === 'atual' ? '★' : '🔒'
                      const miolo = (
                        <>
                          <span
                            className={`relative grid h-20 w-20 place-items-center rounded-full border-2 border-b-8 text-3xl font-extrabold transition ${cor} ${s !== 'bloqueada' ? 'hover:-translate-y-0.5' : ''}`}
                            aria-hidden="true"
                          >
                            {s === 'atual' && <span className="absolute inset-0 animate-ping rounded-full bg-amarelo/60 motion-reduce:animate-none" />}
                            <span className="relative">{icone}</span>
                          </span>
                          <span className="mt-2 block max-w-40 text-center text-sm font-bold leading-tight">
                            {l.nome}
                            <span className="block font-semibold text-marinho/70">+{l.xpRecompensa} XP</span>
                          </span>
                        </>
                      )
                      return (
                        <li key={l.id} style={{ transform: `translateX(${deslocamento}px)` }} className="flex flex-col items-center">
                          {s === 'bloqueada' ? (
                            <div aria-label={`${l.nome}: bloqueada. Conclua a lição anterior.`} className="flex flex-col items-center opacity-80">
                              {miolo}
                            </div>
                          ) : (
                            <Link
                              to={`/trilhas/${l.id}`}
                              aria-label={`${l.nome}: ${s === 'concluida' ? 'concluída, toque para refazer' : 'começar'}`}
                              className="flex flex-col items-center rounded-xl"
                            >
                              {miolo}
                            </Link>
                          )}
                        </li>
                      )
                    })}
                  </ol>
                )}
              </section>
            )
          })}
        </div>
      </Estado>
    </Pagina>
  )
}
