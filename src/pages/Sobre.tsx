import Cartao from '../components/Cartao'
import Pagina from '../components/Pagina'

export default function Sobre() {
  return (
    <Pagina titulo="Sobre o Aprova+" subtitulo="Um reforço escolar pensado para quem tem pouco tempo e pouca conexão.">
      <div className="grid gap-4 md:grid-cols-2">
        <Cartao titulo="O problema">
          Muita gente quer fazer o ENEM ou o ENCCEJA, mas não encontra material gratuito, organizado e fácil de acompanhar.
        </Cartao>
        <Cartao titulo="A nossa solução">
          Uma plataforma gratuita com trilhas de lições, níveis de Bronze a Platina, uma página de cursos gratuitos e uma IA que estima a chance de o aluno atingir a nota mínima.
        </Cartao>
        <Cartao titulo="Como a tecnologia entra">
          Front-end em React, Vite, TypeScript e Tailwind. API REST em Java com Spring Boot, DAO em JDBC e banco Oracle. Tudo publicado na internet.
        </Cartao>
        <Cartao titulo="Global Solution 2026/2" destaque>
          Projeto do tema CitizenTech da FIAP: tecnologia com o cidadão no centro da inovação.
        </Cartao>
      </div>
    </Pagina>
  )
}
