import { useState, type FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import Campo from '../components/Campo'
import Estado from '../components/Estado'
import Pagina from '../components/Pagina'
import { useAluno } from '../context/AlunoContext'
import { useFetch } from '../hooks/useFetch'
import { concluirLicao } from '../services/alunos'
import { ApiError } from '../services/http'
import { buscarLicao } from '../services/trilha'
import type { Conclusao } from '../types/api'

interface Erros {
  acertos?: string
  questoes?: string
}

/** Rota com parâmetro: /trilha/:licaoId. Conclui a lição (POST /alunos/{id}/progressos). */
export default function Licao() {
  const { licaoId } = useParams<{ licaoId: string }>()
  const id = Number(licaoId)
  const { aluno, atualizar } = useAluno()
  const { dados: licao, carregando, erro, recarregar } = useFetch(() => buscarLicao(id), [id])

  const [acertos, setAcertos] = useState('')
  const [questoes, setQuestoes] = useState('10')
  const [erros, setErros] = useState<Erros>({})
  const [enviando, setEnviando] = useState(false)
  const [falha, setFalha] = useState<string | null>(null)
  const [resultado, setResultado] = useState<Conclusao | null>(null)

  function validar(): Erros {
    const e: Erros = {}
    const q = Number(questoes)
    const a = Number(acertos)
    if (!Number.isInteger(q) || q < 1) e.questoes = 'Informe o total de questões (pelo menos 1).'
    if (acertos === '' || !Number.isInteger(a) || a < 0) e.acertos = 'Informe quantas você acertou (0 ou mais).'
    else if (Number.isInteger(q) && a > q) e.acertos = 'Os acertos não podem passar do total de questões.'
    return e
  }

  async function enviar(ev: FormEvent) {
    ev.preventDefault()
    setFalha(null)
    const e = validar()
    setErros(e)
    if (Object.keys(e).length > 0 || !aluno) return

    setEnviando(true)
    try {
      const r = await concluirLicao(aluno.id, { licaoId: id, acertos: Number(acertos), questoes: Number(questoes) })
      setResultado(r)
      await atualizar()
    } catch (err) {
      setFalha(err instanceof ApiError ? err.message : 'Erro inesperado ao registrar a lição.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <Pagina titulo={licao?.nome ?? 'Lição'} subtitulo="Resolva os exercícios e registre o seu resultado.">
      <Estado carregando={carregando} erro={erro} vazio={!licao} mensagemVazio="Lição não encontrada." aoTentarDeNovo={recarregar}>
        {licao && (
          <div className="grid max-w-xl gap-6">
            <p className="text-lg">Concluir esta lição vale <strong className="text-marinho">{licao.xpRecompensa} XP</strong>.</p>

            {!aluno ? (
              <div className="rounded-xl border border-marinho bg-white p-5">
                <p>Entre como aluno para registrar o resultado.</p>
                <Link to="/entrar" className="btn btn-primario mt-3">Cadastrar ou entrar</Link>
              </div>
            ) : resultado ? (
              <div role="status" className="rounded-xl border border-verde bg-verde/20 p-5">
                <p className="text-lg font-extrabold text-marinho">Lição concluída!</p>
                <ul className="mt-2 grid gap-1">
                  <li>Nota: <strong>{resultado.nota.toFixed(1)}</strong> ({resultado.acertos} de {resultado.questoes})</li>
                  <li>XP ganho: <strong>{resultado.xpGanho}</strong> · total: {resultado.xpTotal}</li>
                  <li>Nível: <strong>{resultado.nivel}</strong> · sequência: {resultado.sequenciaDias} dia(s)</li>
                </ul>
                <Link to="/trilhas" className="btn btn-primario mt-4">Voltar à trilha</Link>
              </div>
            ) : (
              <form onSubmit={enviar} noValidate className="flex flex-col gap-5">
                <Campo id="questoes" rotulo="Total de questões" type="number" min={1} inputMode="numeric" value={questoes} onChange={(e) => setQuestoes(e.target.value)} erro={erros.questoes} />
                <Campo id="acertos" rotulo="Quantas você acertou" type="number" min={0} inputMode="numeric" value={acertos} onChange={(e) => setAcertos(e.target.value)} erro={erros.acertos} />
                <button type="submit" className="btn btn-primario self-start" disabled={enviando}>
                  {enviando ? 'Enviando…' : 'Concluir lição'}
                </button>
                {falha && <p role="alert" className="rounded-xl border border-red-600 bg-red-50 p-4 text-red-800">{falha}</p>}
              </form>
            )}
          </div>
        )}
      </Estado>
    </Pagina>
  )
}
