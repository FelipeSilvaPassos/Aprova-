import { useState } from 'react'
import { Link } from 'react-router-dom'
import Cartao from '../components/Cartao'
import Estado from '../components/Estado'
import Pagina from '../components/Pagina'
import { useFetch } from '../hooks/useFetch'
import { listarAreas, listarLicoes, listarMaterias } from '../services/trilha'

/** Página da solução 1: trilha de lições (GET /areas, /materias e /licoes). */
export default function Trilha() {
  const { dados, carregando, erro, recarregar } = useFetch(
    () => Promise.all([listarAreas(), listarMaterias(), listarLicoes()]),
    [],
  )
  const [areaId, setAreaId] = useState<number | null>(null)

  const [areas, materias, licoes] = dados ?? [[], [], []]
  const areaAtual = areaId ?? areas[0]?.id ?? null
  const materiasDaArea = materias.filter((m) => m.areaId === areaAtual)

  return (
    <Pagina titulo="Trilha de estudos" subtitulo="Escolha uma área e conclua as lições para ganhar XP.">
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

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {materiasDaArea.length === 0 && <p className="text-marinho/80">Esta área ainda não tem matérias.</p>}
          {materiasDaArea.map((m) => {
            const doModulo = licoes.filter((l) => l.materiaId === m.id).sort((a, b) => a.ordem - b.ordem)
            return (
              <Cartao key={m.id} titulo={m.nome}>
                {doModulo.length === 0 ? (
                  <p className="text-marinho/80">Sem lições por enquanto.</p>
                ) : (
                  <ul className="flex flex-col gap-2">
                    {doModulo.map((l) => (
                      <li key={l.id}>
                        <Link to={`/trilhas/${l.id}`} className="flex items-center justify-between gap-3 rounded-xl bg-amarelo/30 px-4 py-2.5 hover:bg-amarelo/60">
                          <span>{l.ordem}. {l.nome}</span>
                          <span className="shrink-0 text-sm font-bold text-marinho">+{l.xpRecompensa} XP</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </Cartao>
            )
          })}
        </div>
      </Estado>
    </Pagina>
  )
}
