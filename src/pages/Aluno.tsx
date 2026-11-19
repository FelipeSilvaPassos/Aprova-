import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import Campo from '../components/Campo'
import Cartao from '../components/Cartao'
import Estado from '../components/Estado'
import Pagina from '../components/Pagina'
import { useAluno } from '../context/AlunoContext'
import { useFetch } from '../hooks/useFetch'
import { buscarAlunoPorMatricula, cadastrarAluno, enviarCertificado, listarProgressos, removerProgresso } from '../services/alunos'
import { ApiError } from '../services/http'
import { listarParceiros } from '../services/trilha'

interface ErrosCadastro {
  nome?: string
  dataNascimento?: string
  parceiroId?: string
}

/** Página da solução 3: cadastro, entrada por matrícula e painel do aluno. */
export default function Aluno() {
  const { aluno } = useAluno()
  return (
    <Pagina titulo={aluno ? 'Meu painel' : 'Aluno'} subtitulo={aluno ? 'Seu nível, seu XP e as lições que você já concluiu.' : 'Cadastre-se ou entre com a sua matrícula.'}>
      {aluno ? <Painel /> : <Acesso />}
    </Pagina>
  )
}

function Acesso() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Cadastro />
      <Entrar />
    </div>
  )
}

function Cadastro() {
  const { entrar } = useAluno()
  const parceiros = useFetch(listarParceiros, [])
  const [nome, setNome] = useState('')
  const [nascimento, setNascimento] = useState('')
  const [parceiroId, setParceiroId] = useState('')
  const [erros, setErros] = useState<ErrosCadastro>({})
  const [enviando, setEnviando] = useState(false)
  const [falha, setFalha] = useState<string | null>(null)
  const [matricula, setMatricula] = useState<string | null>(null)

  function validar(): ErrosCadastro {
    const e: ErrosCadastro = {}
    if (nome.trim().length < 3) e.nome = 'Informe seu nome completo (pelo menos 3 letras).'
    if (!nascimento) e.dataNascimento = 'Informe a data de nascimento.'
    else if (new Date(nascimento) > new Date()) e.dataNascimento = 'A data de nascimento não pode estar no futuro.'
    if (!parceiroId) e.parceiroId = 'Escolha o seu cursinho ou programa.'
    return e
  }

  async function enviar(ev: FormEvent) {
    ev.preventDefault()
    setFalha(null)
    const e = validar()
    setErros(e)
    if (Object.keys(e).length > 0) return

    setEnviando(true)
    try {
      const novo = await cadastrarAluno({ nome: nome.trim(), dataNascimento: nascimento, parceiroId: Number(parceiroId) })
      setMatricula(novo.matricula)
      entrar(novo)
    } catch (err) {
      if (err instanceof ApiError) {
        setErros((antes) => ({ ...antes, ...err.campos }))
        setFalha(err.message)
      } else {
        setFalha('Erro inesperado ao cadastrar.')
      }
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section aria-labelledby="titulo-cadastro" className="rounded-2xl border border-marinho bg-white p-6">
      <h2 id="titulo-cadastro" className="text-2xl font-extrabold">Quero me cadastrar</h2>
      <Estado carregando={parceiros.carregando} erro={parceiros.erro} vazio={(parceiros.dados ?? []).length === 0} mensagemVazio="Nenhum parceiro cadastrado ainda." aoTentarDeNovo={parceiros.recarregar}>
        {matricula ? (
          <p role="status" className="mt-4 rounded-xl border border-verde bg-verde/20 p-4">
            Cadastro feito! Guarde a sua matrícula: <strong className="text-marinho">{matricula}</strong>
          </p>
        ) : (
          <form onSubmit={enviar} noValidate className="mt-4 flex flex-col gap-5">
            <Campo id="nome-aluno" rotulo="Nome completo" value={nome} onChange={(e) => setNome(e.target.value)} erro={erros.nome} autoComplete="name" />
            <Campo id="nascimento" rotulo="Data de nascimento" type="date" value={nascimento} onChange={(e) => setNascimento(e.target.value)} erro={erros.dataNascimento} />
            <Campo
              id="parceiro"
              rotulo="Cursinho ou programa"
              erro={erros.parceiroId}
              filho={
                <select id="parceiro" className={`input ${erros.parceiroId ? 'input-erro' : ''}`} value={parceiroId} onChange={(e) => setParceiroId(e.target.value)}>
                  <option value="">Selecione…</option>
                  {(parceiros.dados ?? []).map((p) => (
                    <option key={p.id} value={p.id}>{p.nome} ({p.cidade}/{p.estado})</option>
                  ))}
                </select>
              }
            />
            <button type="submit" className="btn btn-primario self-start" disabled={enviando}>
              {enviando ? 'Cadastrando…' : 'Cadastrar'}
            </button>
            {falha && <p role="alert" className="rounded-xl border border-red-600 bg-red-50 p-4 text-red-800">{falha}</p>}
          </form>
        )}
      </Estado>
    </section>
  )
}

function Entrar() {
  const { entrar } = useAluno()
  const [matricula, setMatricula] = useState('')
  const [erro, setErro] = useState<string | undefined>()
  const [falha, setFalha] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)

  async function enviar(ev: FormEvent) {
    ev.preventDefault()
    setFalha(null)
    const m = matricula.trim().toUpperCase()
    if (!/^MAT\d{4,}$/.test(m)) {
      setErro('A matrícula começa com MAT e tem números, como MAT2026101.')
      return
    }
    setErro(undefined)
    setEnviando(true)
    try {
      entrar(await buscarAlunoPorMatricula(m))
    } catch (err) {
      setFalha(err instanceof ApiError && err.status === 404 ? 'Não encontramos essa matrícula.' : err instanceof Error ? err.message : 'Erro inesperado.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section aria-labelledby="titulo-entrar" className="rounded-2xl border border-marinho bg-white p-6">
      <h2 id="titulo-entrar" className="text-2xl font-extrabold">Já tenho matrícula</h2>
      <form onSubmit={enviar} noValidate className="mt-4 flex flex-col gap-5">
        <Campo id="matricula" rotulo="Matrícula" value={matricula} onChange={(e) => setMatricula(e.target.value)} erro={erro} placeholder="MAT2026101" autoCapitalize="characters" />
        <button type="submit" className="btn btn-secundario self-start" disabled={enviando}>
          {enviando ? 'Procurando…' : 'Entrar'}
        </button>
        {falha && <p role="alert" className="rounded-xl border border-red-600 bg-red-50 p-4 text-red-800">{falha}</p>}
      </form>
    </section>
  )
}

function Painel() {
  const { aluno, atualizar, sair } = useAluno()
  const progressos = useFetch(() => listarProgressos(aluno!.id), [aluno?.id])
  const [aviso, setAviso] = useState<string | null>(null)
  const [ocupado, setOcupado] = useState(false)

  if (!aluno) return null

  async function acao(fazer: () => Promise<unknown>, sucesso: string) {
    setOcupado(true)
    setAviso(null)
    try {
      await fazer()
      await atualizar()
      progressos.recarregar()
      setAviso(sucesso)
    } catch (err) {
      setAviso(err instanceof Error ? err.message : 'Erro inesperado.')
    } finally {
      setOcupado(false)
    }
  }

  const lista = progressos.dados ?? []

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Cartao titulo="Nível" destaque><p className="text-2xl font-extrabold text-marinho">{aluno.nivel}</p></Cartao>
        <Cartao titulo="XP total"><p className="text-2xl font-extrabold">{aluno.xpTotal}</p></Cartao>
        <Cartao titulo="Sequência"><p className="text-2xl font-extrabold">{aluno.sequenciaDias} dia(s)</p></Cartao>
        <Cartao titulo="Certificado"><p className="text-2xl font-extrabold">{aluno.certificado}</p></Cartao>
      </div>

      <p className="text-marinho/80">{aluno.nome} · matrícula <strong>{aluno.matricula}</strong></p>

      <div className="flex flex-wrap gap-3">
        <Link to="/trilhas" className="btn btn-primario">Ir para a trilha</Link>
        <button type="button" className="btn btn-secundario" disabled={ocupado} onClick={() => acao(() => enviarCertificado(aluno.id), 'Certificado enviado. Um tutor vai validar.')}>
          Enviar certificado
        </button>
        <button type="button" className="btn btn-secundario" onClick={sair}>Sair</button>
      </div>

      {aviso && <p role="status" className="rounded-xl border border-marinho bg-white p-4">{aviso}</p>}

      <h2 className="text-2xl font-extrabold">Lições concluídas</h2>
      <Estado carregando={progressos.carregando} erro={progressos.erro} vazio={lista.length === 0} mensagemVazio="Você ainda não concluiu nenhuma lição. Comece pela trilha!" aoTentarDeNovo={progressos.recarregar}>
        <ul className="grid gap-3">
          {lista.map((p) => (
            <li key={p.licaoId} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-marinho bg-white px-4 py-3">
              <span>Lição {p.licaoId} · {p.acertos}/{p.questoes} · nota <strong>{p.nota.toFixed(1)}</strong> · {p.dataConclusao}</span>
              <button type="button" className="btn btn-secundario" disabled={ocupado} onClick={() => acao(() => removerProgresso(aluno.id, p.licaoId), 'Resultado removido. Você pode refazer a lição.')}>
                Remover resultado
              </button>
            </li>
          ))}
        </ul>
      </Estado>
    </div>
  )
}
