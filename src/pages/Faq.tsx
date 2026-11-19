import { useState } from 'react'
import Pagina from '../components/Pagina'
import { perguntas } from '../data/faq'

export default function Faq() {
  const [aberta, setAberta] = useState<number | null>(0)

  return (
    <Pagina titulo="Perguntas frequentes">
      <ul className="flex max-w-3xl flex-col gap-3">
        {perguntas.map((p, i) => {
          const ativa = aberta === i
          return (
            <li key={p.pergunta} className="rounded-2xl border border-marinho bg-white">
              <h2>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-lg font-bold"
                  aria-expanded={ativa}
                  aria-controls={`resp-${i}`}
                  onClick={() => setAberta(ativa ? null : i)}
                >
                  {p.pergunta}
                  <span aria-hidden="true" className="text-marinho">{ativa ? '−' : '+'}</span>
                </button>
              </h2>
              {ativa && (
                <p id={`resp-${i}`} className="px-5 pb-5 text-marinho">{p.resposta}</p>
              )}
            </li>
          )
        })}
      </ul>
    </Pagina>
  )
}
