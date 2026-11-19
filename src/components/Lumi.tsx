interface LumiProps {
  tamanho?: number
  className?: string
}

/** Mascote do projeto: um vaga-lume. */
export default function Lumi({ tamanho = 96, className = '' }: LumiProps) {
  return (
    <img src="/lumi.svg" alt="Lumi, o vaga-lume mascote do Aprova+" width={tamanho} height={tamanho} className={className} />
  )
}
