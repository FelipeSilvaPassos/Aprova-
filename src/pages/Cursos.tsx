import { useState } from 'react'
import Cartao from '../components/Cartao'
import Estado from '../components/Estado'
import Pagina from '../components/Pagina'
import { useFetch } from '../hooks/useFetch'
import { listarAreas, listarCursos } from '../services/trilha'

/** Página da solução 2: cursos gratuitos (GET /cursos e /areas). */
export default function Cursos() {
  const { dados, carregando, erro, recarregar } = useFetch(() => Promise.all([listarCursos(), listarAreas()]), [])
  const [areaId, setAreaId] = useState('')
  const [busca, setBusca] = useState('')

  const [cursos, areas] = dados ?? [[], []]
  const nomeDaArea = (id: number) => areas.find((a) => a.id === id)?.nome ?? 'Geral'
  const filtrados = cursos.filter(
    (c) => (areaId === '' || c.areaId === Number(areaId)) && c.nome.toLowerCase().includes(busca.trim().toLowerCase()),
  )

  return (
    <Pagina titulo="Cursos gratuitos" subtitulo="Indicações para aprofundar o estudo, sem pagar nada.">
      <Estado carregando={carregando} erro={erro} vazio={cursos.length === 0} mensagemVazio="Nenhum curso indicado ainda." aoTentarDeNovo={recarregar}>
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:max-w-2xl">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="busca" className="font-bold">Buscar por nome</label>
            <input id="busca" className="input" value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Ex.: Matemática" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="area" className="font-bold">Área</label>
            <select id="area" className="input" value={areaId} onChange={(e) => setAreaId(e.target.value)}>
              <option value="">Todas</option>
              {areas.map((a) => (
                <option key={a.id} value={a.id}>{a.nome}</option>
              ))}
            </select>
          </div>
        </div>

        {filtrados.length === 0 ? (
          <p className="rounded-xl bg-white p-6 text-marinho/80">Nenhum curso encontrado com esse filtro.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtrados.map((c) => (
              <Cartao
                key={c.id}
                titulo={c.nome}
                rodape={
                  <a href={c.link} target="_blank" rel="noreferrer" className="btn btn-secundario">Abrir curso</a>
                }
              >
                <p>{nomeDaArea(c.areaId)} · {c.tipo}</p>
                <p className="mt-1 font-bold text-marinho">{c.gratuito ? 'Gratuito' : 'Pago'}</p>
              </Cartao>
            ))}
          </div>
        )}
      </Estado>
    </Pagina>
  )
}
