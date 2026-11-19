import { Link, useParams } from 'react-router-dom'
import Pagina from '../components/Pagina'
import { integrantes } from '../data/integrantes'

/** Rota com parâmetro: /integrantes/:rm */
export default function IntegranteDetalhe() {
  const { rm } = useParams<{ rm: string }>()
  const pessoa = integrantes.find((i) => i.rm.toLowerCase() === rm?.toLowerCase())

  if (!pessoa) {
    return (
      <Pagina titulo="Integrante não encontrado" subtitulo={`Não existe ninguém com o RM ${rm}.`}>
        <Link to="/integrantes" className="btn btn-primario">Voltar para os integrantes</Link>
      </Pagina>
    )
  }

  return (
    <Pagina titulo={pessoa.nome} subtitulo={`${pessoa.rm} · turma ${pessoa.turma}`}>
      <dl className="grid max-w-2xl gap-4">
        <div>
          <dt className="font-bold text-marinho">Responsabilidade</dt>
          <dd>{pessoa.papel}</dd>
        </div>
        <div>
          <dt className="font-bold text-marinho">O que fez</dt>
          <dd>{pessoa.resumo}</dd>
        </div>
        {pessoa.github && (
          <div>
            <dt className="font-bold text-marinho">GitHub</dt>
            <dd>
              <a className="underline" href={`https://github.com/${pessoa.github}`} target="_blank" rel="noreferrer">
                github.com/{pessoa.github}
              </a>
            </dd>
          </div>
        )}
      </dl>
      <Link to="/integrantes" className="btn btn-secundario mt-8">Voltar</Link>
    </Pagina>
  )
}
