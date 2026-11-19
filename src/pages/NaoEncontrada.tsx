import { Link } from 'react-router-dom'
import Pagina from '../components/Pagina'

export default function NaoEncontrada() {
  return (
    <Pagina titulo="Página não encontrada" subtitulo="O endereço não existe. Volte para o início.">
      <Link to="/" className="btn btn-primario">Ir para o início</Link>
    </Pagina>
  )
}
