import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { AlunoProvider } from './context/AlunoContext'
import Aluno from './pages/Aluno'
import Contato from './pages/Contato'
import Cursos from './pages/Cursos'
import Faq from './pages/Faq'
import Home from './pages/Home'
import IntegranteDetalhe from './pages/IntegranteDetalhe'
import Integrantes from './pages/Integrantes'
import Licao from './pages/Licao'
import NaoEncontrada from './pages/NaoEncontrada'
import Sobre from './pages/Sobre'
import Trilhas from './pages/Trilhas'

export default function App() {
  return (
    <AlunoProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/integrantes" element={<Integrantes />} />
          <Route path="/integrantes/:rm" element={<IntegranteDetalhe />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/trilhas" element={<Trilhas />} />
          <Route path="/trilhas/:licaoId" element={<Licao />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/entrar" element={<Aluno />} />
          <Route path="*" element={<NaoEncontrada />} />
        </Route>
      </Routes>
    </AlunoProvider>
  )
}
