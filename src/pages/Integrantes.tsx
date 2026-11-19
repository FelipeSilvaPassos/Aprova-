import { Link } from 'react-router-dom'
import Cartao from '../components/Cartao'
import Pagina from '../components/Pagina'
import { integrantes } from '../data/integrantes'

export default function Integrantes() {
  return (
    <Pagina titulo="Integrantes" subtitulo="Turma 1TDSPO · FIAP Análise e Desenvolvimento de Sistemas">
      <div className="grid gap-4 sm:grid-cols-2">
        {integrantes.map((i) => (
          <Cartao
            key={i.rm}
            titulo={i.nome}
            rodape={<Link to={`/integrantes/${i.rm}`} className="btn btn-secundario">Ver perfil</Link>}
          >
            <p className="font-bold text-marinho">{i.rm}</p>
            <p>{i.papel}</p>
          </Cartao>
        ))}
      </div>
    </Pagina>
  )
}
