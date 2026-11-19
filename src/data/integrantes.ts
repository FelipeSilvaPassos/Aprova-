export interface Integrante {
  rm: string
  nome: string
  turma: string
  papel: string
  resumo: string
  github: string // preencha com o usuário do GitHub
}

export const integrantes: Integrante[] = [
  {
    rm: 'RM569411',
    nome: 'Felipe Passos',
    turma: '1TDSPO',
    papel: 'API Java, banco Oracle e integração',
    resumo: 'Construiu a API REST em Java com DAO em JDBC e conectou o front à API publicada no Render.',
    github: '',
  },
  {
    rm: 'RM570730',
    nome: 'Gabriel Canevari',
    turma: '1TDSPO',
    papel: 'Páginas, formulários e documentação',
    resumo: 'Construiu as páginas institucionais, o formulário de cadastro, a responsividade e o README.',
    github: '',
  },
]
