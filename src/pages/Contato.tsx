import { useState, type FormEvent } from 'react'
import Campo from '../components/Campo'
import Pagina from '../components/Pagina'

interface Erros {
  nome?: string
  email?: string
  mensagem?: string
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Contato() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [erros, setErros] = useState<Erros>({})
  const [enviado, setEnviado] = useState(false)

  function validar(): Erros {
    const e: Erros = {}
    if (nome.trim().length < 3) e.nome = 'Informe seu nome com pelo menos 3 letras.'
    if (!EMAIL.test(email)) e.email = 'Informe um e-mail válido, como nome@email.com.'
    if (mensagem.trim().length < 10) e.mensagem = 'Escreva uma mensagem com pelo menos 10 caracteres.'
    return e
  }

  function enviar(ev: FormEvent) {
    ev.preventDefault()
    const e = validar()
    setErros(e)
    setEnviado(false)
    if (Object.keys(e).length === 0) {
      setEnviado(true)
      setNome('')
      setEmail('')
      setMensagem('')
    }
  }

  return (
    <Pagina titulo="Contato" subtitulo="Dúvidas, sugestões ou parcerias com cursinhos e ONGs.">
      <form onSubmit={enviar} noValidate className="flex max-w-xl flex-col gap-5">
        <Campo id="nome" rotulo="Nome" value={nome} onChange={(e) => setNome(e.target.value)} erro={erros.nome} autoComplete="name" />
        <Campo id="email" rotulo="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} erro={erros.email} autoComplete="email" />
        <Campo
          id="mensagem"
          rotulo="Mensagem"
          erro={erros.mensagem}
          filho={
            <textarea
              id="mensagem"
              rows={5}
              className={`input ${erros.mensagem ? 'input-erro' : ''}`}
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              aria-invalid={erros.mensagem ? true : undefined}
            />
          }
        />
        <button type="submit" className="btn btn-primario self-start">Enviar mensagem</button>
        {enviado && (
          <p role="status" className="rounded-xl border border-verde bg-verde/20 p-4 font-semibold text-marinho">
            Formulário válido. Nesta versão a mensagem ainda não é enviada a um servidor.
          </p>
        )}
      </form>
    </Pagina>
  )
}
