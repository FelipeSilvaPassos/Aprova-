# Aprova+

> Estude de graça. Aprove com Lumi.

Plataforma gratuita de estudos para quem prepara o **ENEM** e o **ENCCEJA** e quer conquistar o certificado do ensino médio. Projeto da **Global Solution 2026/2 (FIAP), tema CitizenTech**.

## O problema

Muitas pessoas não concluíram o ensino médio e precisam de um caminho gratuito, acessível e organizado para estudar e conseguir o certificado.

## A solução

- **Trilhas de estudo** em 4 áreas: Ciências da Natureza, Ciências Humanas, Português e Matemática.
- **Exercícios gamificados** com XP, sequência de dias e níveis: Bronze, Prata, Ouro, Diamante e Platina (certificado validado por um tutor).
- **Lumi**, a mascote vaga-lume que dá dicas e feedback.
- **IA** que estima a chance de o aluno atingir a nota mínima em cada área.
- **Diagnóstico inicial** e **plano de estudos** semanal.
- **Revisão de erros** e **simulados** de ENEM e ENCCEJA.
- **Cursos gratuitos**, com destaque para o CPOP (Rede Nacional de Cursinhos Populares do MEC).

> A chance de atingir a nota mínima é uma estimativa baseada no desempenho registrado, não uma garantia de aprovação.

## Tecnologias

- React + Vite + TypeScript
- Tailwind CSS
- React Router
- Fetch API
- Deploy na Vercel

## Como rodar

Requisitos: Node 20 ou superior.

```bash
git clone URL_DO_REPOSITORIO
cd Aprova-
npm install
cp .env.example .env
npm run dev
```

O site abre em `http://localhost:5173`.

### Variáveis de ambiente

| Variável | Para que serve |
| --- | --- |
| `VITE_API_URL` | Endereço da API Java (Spring Boot) |
| `VITE_IA_URL` | Endereço da API de IA (Flask) |

## Estrutura

```
src/
  components/   peças reutilizáveis (Navbar, Footer, Lumi...)
  pages/        uma página por rota
  services/     chamadas às APIs (fetch)
  types/        tipos TypeScript
  data/         perguntas dos exercícios e textos
  hooks/        hooks personalizados (useFetch)
```

## Integrantes

| Nome | RM | Turma | GitHub | LinkedIn |
| --- | --- | --- | --- | --- |
| [Nome] | [RM] | [Turma] | [link] | [link] |

## Links

- Site: [link da Vercel]
- API Java: [link do Render]
- Vídeo de apresentação: [link]