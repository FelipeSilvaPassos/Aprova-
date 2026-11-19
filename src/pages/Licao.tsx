import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Estado from '../components/Estado'
import Lumi from '../components/Lumi'
import { useAluno } from '../context/AlunoContext'
import { questoesPorLicao } from '../data/questoes'
import { useFetch } from '../hooks/useFetch'
import { concluirLicao } from '../services/alunos'
import { ApiError } from '../services/http'
import { buscarLicao } from '../services/trilha'
import type { Conclusao } from '../types/api'

/** Rota com parâmetro: /trilhas/:licaoId. Exercícios um a um; ao final registra o resultado (POST /alunos/{id}/progressos). */
export default function Licao() {
  const { licaoId } = useParams<{ licaoId: string }>()
  const id = Number(licaoId)
  const { aluno, atualizar } = useAluno()
  const { dados: licao, carregando, erro, recarregar } = useFetch(() => buscarLicao(id), [id])
  const questoes = questoesPorLicao[id] ?? []

  const [indice, setIndice] = useState(0)
  const [escolhida, setEscolhida] = useState<number | null>(null)
  const [verificada, setVerificada] = useState(false)
  const [acertos, setAcertos] = useState(0)
  const [fim, setFim] = useState(false)

  const [enviando, setEnviando] = useState(false)
  const [falha, setFalha] = useState<string | null>(null)
  const [resultado, setResultado] = useState<Conclusao | null>(null)

  const questao = questoes[indice]
  const acertou = verificada && escolhida === questao?.correta

  function verificar() {
    if (escolhida === null) return
    setVerificada(true)
    if (escolhida === questao.correta) setAcertos((n) => n + 1)
  }

  function continuar() {
    if (indice + 1 >= questoes.length) {
      setFim(true)
      return
    }
    setIndice((n) => n + 1)
    setEscolhida(null)
    setVerificada(false)
  }

  function refazer() {
    setIndice(0)
    setEscolhida(null)
    setVerificada(false)
    setAcertos(0)
    setFim(false)
    setResultado(null)
    setFalha(null)
  }

  async function registrar() {
    if (!aluno) return
    setFalha(null)
    setEnviando(true)
    try {
      const r = await concluirLicao(aluno.id, { licaoId: id, acertos, questoes: questoes.length })
      setResultado(r)
      await atualizar()
    } catch (err) {
      setFalha(err instanceof ApiError ? err.message : 'Erro inesperado ao registrar a lição.')
    } finally {
      setEnviando(false)
    }
  }

  const porcentagem = fim ? 100 : questoes.length ? Math.round((indice / questoes.length) * 100) : 0

  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6">
      <div className="flex items-center gap-4">
        <Link to="/trilhas" aria-label="Sair da lição e voltar à trilha" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-marinho bg-white text-xl font-extrabold hover:bg-amarelo/30">
          ×
        </Link>
        <div
          className="h-4 flex-1 overflow-hidden rounded-full border-2 border-marinho bg-white"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={porcentagem}
          aria-label="Progresso da lição"
        >
          <div className="h-full bg-verde transition-all" style={{ width: `${porcentagem}%` }} />
        </div>
      </div>

      <Estado carregando={carregando} erro={erro} vazio={!licao} mensagemVazio="Lição não encontrada." aoTentarDeNovo={recarregar}>
        {licao && questoes.length === 0 && (
          <div className="mt-8 rounded-xl bg-white p-6">
            <h1 className="text-2xl font-extrabold">{licao.nome}</h1>
            <p className="mt-2">Esta lição ainda não tem exercícios cadastrados.</p>
            <Link to="/trilhas" className="btn btn-primario mt-4">Voltar à trilha</Link>
          </div>
        )}

        {licao && questao && !fim && (
          <div className="mt-8">
            <p className="font-bold text-marinho/70">{licao.nome} · questão {indice + 1} de {questoes.length}</p>
            <h1 className="mt-2 text-2xl font-extrabold leading-snug sm:text-3xl">{questao.enunciado}</h1>

            <div className="mt-6 grid gap-3" role="radiogroup" aria-label="Alternativas">
              {questao.opcoes.map((texto, i) => {
                const marcada = escolhida === i
                let estilo = 'border-marinho bg-white hover:bg-amarelo/30'
                if (marcada && !verificada) estilo = 'border-marinho bg-amarelo'
                if (verificada && i === questao.correta) estilo = 'border-verde bg-verde/25'
                if (verificada && marcada && i !== questao.correta) estilo = 'border-red-600 bg-red-50'
                return (
                  <button
                    key={texto}
                    type="button"
                    role="radio"
                    aria-checked={marcada}
                    disabled={verificada}
                    onClick={() => setEscolhida(i)}
                    className={`flex items-center gap-3 rounded-2xl border-2 border-b-4 px-4 py-3 text-left text-lg font-semibold transition ${estilo}`}
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-marinho bg-white text-sm font-extrabold">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {texto}
                  </button>
                )
              })}
            </div>

            {verificada ? (
              <div role="status" className={`mt-6 rounded-2xl border-2 p-5 ${acertou ? 'border-verde bg-verde/20' : 'border-red-600 bg-red-50'}`}>
                <p className={`text-xl font-extrabold ${acertou ? 'text-marinho' : 'text-red-800'}`}>
                  {acertou ? 'Isso aí, você acertou!' : 'Quase! A resposta certa está em verde.'}
                </p>
                <p className="mt-1">{questao.explicacao}</p>
                <button type="button" onClick={continuar} className="btn btn-primario mt-4 w-full sm:w-auto">
                  {indice + 1 >= questoes.length ? 'Ver resultado' : 'Continuar'}
                </button>
              </div>
            ) : (
              <button type="button" onClick={verificar} disabled={escolhida === null} className="btn btn-primario mt-6 w-full sm:w-auto">
                Verificar
              </button>
            )}
          </div>
        )}

        {licao && fim && (
          <div className="mt-8 flex flex-col items-center text-center">
            <Lumi tamanho={120} />
            <h1 className="mt-4 text-3xl font-extrabold">Lição concluída!</h1>
            <p className="mt-2 text-xl">
              Você acertou <strong>{acertos}</strong> de <strong>{questoes.length}</strong>.
            </p>

            {resultado ? (
              <div role="status" className="mt-6 w-full rounded-2xl border-2 border-verde bg-verde/20 p-5 text-left">
                <ul className="grid gap-1">
                  <li>Nota: <strong>{resultado.nota.toFixed(1)}</strong></li>
                  <li>XP ganho: <strong>+{resultado.xpGanho}</strong> · total: {resultado.xpTotal}</li>
                  <li>Nível: <strong>{resultado.nivel}</strong> · sequência: {resultado.sequenciaDias} dia(s)</li>
                </ul>
                <Link to="/trilhas" className="btn btn-primario mt-4">Voltar à trilha</Link>
              </div>
            ) : !aluno ? (
              <div className="mt-6 w-full rounded-2xl border-2 border-marinho bg-white p-5 text-left">
                <p>Entre como aluno para ganhar {licao.xpRecompensa} XP por esta lição.</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <Link to="/entrar" className="btn btn-primario">Cadastrar ou entrar</Link>
                  <button type="button" onClick={refazer} className="btn btn-secundario">Refazer</button>
                </div>
              </div>
            ) : (
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button type="button" onClick={registrar} disabled={enviando} className="btn btn-primario">
                  {enviando ? 'Salvando…' : `Salvar e ganhar ${licao.xpRecompensa} XP`}
                </button>
                <button type="button" onClick={refazer} className="btn btn-secundario">Refazer</button>
              </div>
            )}
            {falha && <p role="alert" className="mt-4 w-full rounded-xl border border-red-600 bg-red-50 p-4 text-left text-red-800">{falha}</p>}
          </div>
        )}
      </Estado>
    </section>
  )
}
