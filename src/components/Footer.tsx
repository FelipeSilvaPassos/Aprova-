import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t-2 border-marinho px-6 py-8 md:px-20">
      <p className="font-bold">Aprova<span className="text-verde">+</span></p>
      <p className="text-sm">Estude de graça. Aprove com Lumi.</p>
      <p className="mt-2 text-sm">
        Global Solution 2026/2 · FIAP · turma 1TDSPO · feito por{' '}
        <Link to="/integrantes" className="font-bold underline">Felipe Passos e Gabriel Canevari</Link>
      </p>
    </footer>
  )
}
