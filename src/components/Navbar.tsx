import { NavLink } from 'react-router-dom'

const links = [
  { to: '/trilhas', texto: 'Trilhas' },
  { to: '/cursos', texto: 'Cursos' },
]

export default function Navbar() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 px-6 py-5 md:px-20">
      <NavLink to="/" className="text-3xl font-bold tracking-tight">
        Aprova<span className="text-verde">+</span>
      </NavLink>
      <nav className="flex flex-wrap items-center gap-6 font-bold">
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} className="hover:text-verde">
            {l.texto}
          </NavLink>
        ))}
        <NavLink to="/entrar" className="rounded-full bg-amarelo px-6 py-3">Entrar</NavLink>
      </nav>
    </header>
  )
}