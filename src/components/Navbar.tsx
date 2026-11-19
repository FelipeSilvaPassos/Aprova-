import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAluno } from '../context/AlunoContext'

const links = [
  { to: '/trilhas', texto: 'Trilhas' },
  { to: '/cursos', texto: 'Cursos' },
  { to: '/sobre', texto: 'Sobre' },
  { to: '/integrantes', texto: 'Integrantes' },
  { to: '/faq', texto: 'FAQ' },
  { to: '/contato', texto: 'Contato' },
]

export default function Navbar() {
  const [aberto, setAberto] = useState(false)
  const { aluno } = useAluno()
  const fechar = () => setAberto(false)
  const estilo = ({ isActive }: { isActive: boolean }) => `hover:text-verde ${isActive ? 'underline decoration-4 decoration-amarelo underline-offset-8' : ''}`

  return (
    <header className="px-6 py-5 md:px-20">
      <div className="flex items-center justify-between gap-4">
        <NavLink to="/" onClick={fechar} className="text-3xl font-bold tracking-tight">
          Aprova<span className="text-verde">+</span>
        </NavLink>

        <nav aria-label="Principal" className="hidden items-center gap-6 font-bold lg:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={estilo}>{l.texto}</NavLink>
          ))}
          <NavLink to="/entrar" className="rounded-full bg-amarelo px-6 py-3">{aluno ? `Olá, ${aluno.nome.split(' ')[0]}` : 'Entrar'}</NavLink>
        </nav>

        <button
          type="button"
          className="btn btn-secundario lg:hidden"
          aria-expanded={aberto}
          aria-controls="menu-mobile"
          onClick={() => setAberto((v) => !v)}
        >
          {aberto ? 'Fechar' : 'Menu'}
        </button>
      </div>

      {aberto && (
        <nav id="menu-mobile" aria-label="Menu mobile" className="mt-4 flex flex-col gap-4 border-t-2 border-marinho pt-4 font-bold lg:hidden">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} onClick={fechar} className={estilo}>{l.texto}</NavLink>
          ))}
          <NavLink to="/entrar" onClick={fechar} className="self-start rounded-full bg-amarelo px-6 py-3">{aluno ? `Olá, ${aluno.nome.split(' ')[0]}` : 'Entrar'}</NavLink>
        </nav>
      )}
    </header>
  )
}
