import { Link } from 'react-router-dom'
import Cartao from '../components/Cartao'
import Lumi from '../components/Lumi'

const niveis = ['Bronze', 'Prata', 'Ouro', 'Diamante', 'Platina']

export default function Home() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.3fr_1fr]">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
            Estude para o ENEM e o ENCCEJA de graça, no seu ritmo.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-marinho/80">
            Faça lições curtas, ganhe XP, suba de nível e veja a sua chance de atingir a nota mínima. A Lumi acompanha você.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/trilhas" className="btn btn-primario">Começar a trilha</Link>
            <Link to="/entrar" className="btn btn-secundario">Cadastrar ou entrar</Link>
          </div>
        </div>
        <div className="flex justify-center">
          <Lumi tamanho={220} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <h2 className="text-2xl font-extrabold">Como funciona</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Cartao titulo="Trilha por área">Ciências da Natureza, Ciências Humanas, Português e Matemática em lições curtas.</Cartao>
          <Cartao titulo="XP e níveis">Cada lição concluída dá XP. Sua sequência de dias de estudo também é contada.</Cartao>
          <Cartao titulo="Cursos gratuitos">Indicamos cursos de graça para aprofundar, inclusive cursinhos populares.</Cartao>
        </div>
      </section>

      <section className="border-y border-marinho bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <h2 className="text-2xl font-extrabold">Seu caminho de níveis</h2>
          <ol className="mt-4 flex flex-wrap gap-3">
            {niveis.map((n) => (
              <li key={n} className="rounded-full border-2 border-marinho bg-amarelo px-4 py-1.5 font-bold">{n}</li>
            ))}
          </ol>
          <p className="mt-3 text-marinho/80">A Platina é para quem entrega o certificado e ele é validado por um tutor.</p>
        </div>
      </section>
    </>
  )
}
