/** Banco de exercícios das lições. A chave é o id da lição na API (GET /licoes). */
export interface Questao {
  enunciado: string
  opcoes: string[]
  correta: number
  explicacao: string
}

export const questoesPorLicao: Record<number, Questao[]> = {
  // 1 - Células e seres vivos
  1: [
    { enunciado: 'Qual organela é a principal responsável pela respiração celular?', opcoes: ['Ribossomo', 'Mitocôndria', 'Lisossomo', 'Complexo de Golgi'], correta: 1, explicacao: 'Nas mitocôndrias a glicose é usada para produzir energia (ATP).' },
    { enunciado: 'Qual destes seres é formado por células procariontes, sem núcleo delimitado?', opcoes: ['Bactéria', 'Cogumelo', 'Samambaia', 'Cachorro'], correta: 0, explicacao: 'Bactérias são procariontes: o material genético fica solto no citoplasma.' },
    { enunciado: 'Onde acontece a fotossíntese na célula vegetal?', opcoes: ['Núcleo', 'Mitocôndria', 'Cloroplasto', 'Vacúolo'], correta: 2, explicacao: 'Os cloroplastos têm clorofila, que capta a luz do sol.' },
    { enunciado: 'Qual é a principal função da membrana plasmática?', opcoes: ['Produzir proteínas', 'Controlar o que entra e sai da célula', 'Guardar o DNA', 'Digerir alimentos'], correta: 1, explicacao: 'Ela é seletiva: regula a passagem de substâncias.' },
    { enunciado: 'Os seres autótrofos são aqueles que:', opcoes: ['Dependem de outros seres para se alimentar', 'Produzem o próprio alimento', 'Vivem apenas na água', 'Não têm células'], correta: 1, explicacao: 'Plantas e algas produzem alimento pela fotossíntese.' },
  ],
  // 2 - Ecologia e cadeias alimentares
  2: [
    { enunciado: 'Na cadeia alimentar, quem são os produtores?', opcoes: ['Os animais carnívoros', 'Os fungos', 'As plantas e as algas', 'Os herbívoros'], correta: 2, explicacao: 'Produtores fazem fotossíntese e abastecem de energia toda a cadeia.' },
    { enunciado: 'Qual grupo tem a função de decompor matéria orgânica morta?', opcoes: ['Fungos e bactérias', 'Plantas', 'Aves de rapina', 'Insetos polinizadores'], correta: 0, explicacao: 'Decompositores devolvem nutrientes ao solo.' },
    { enunciado: 'Na cadeia grama → gafanhoto → sapo → cobra, o sapo é consumidor:', opcoes: ['Primário', 'Secundário', 'Terciário', 'Produtor'], correta: 1, explicacao: 'O gafanhoto é o primário; o sapo, que come o gafanhoto, é o secundário.' },
    { enunciado: 'O que acontece com a energia disponível a cada nível da cadeia alimentar?', opcoes: ['Aumenta', 'Fica igual', 'Diminui', 'Some de repente'], correta: 2, explicacao: 'Parte da energia se perde como calor em cada nível trófico.' },
    { enunciado: 'Como se chama o conjunto de indivíduos da mesma espécie que vivem na mesma área?', opcoes: ['Comunidade', 'População', 'Ecossistema', 'Bioma'], correta: 1, explicacao: 'Várias populações juntas formam uma comunidade.' },
  ],
  // 3 - Velocidade e movimento
  3: [
    { enunciado: 'Um carro percorre 150 km em 2 horas. Qual é a velocidade média?', opcoes: ['50 km/h', '75 km/h', '100 km/h', '300 km/h'], correta: 1, explicacao: 'v = distância ÷ tempo = 150 ÷ 2 = 75 km/h.' },
    { enunciado: 'Quanto vale 72 km/h em metros por segundo?', opcoes: ['10 m/s', '15 m/s', '20 m/s', '25 m/s'], correta: 2, explicacao: 'Divida por 3,6: 72 ÷ 3,6 = 20 m/s.' },
    { enunciado: 'No movimento retilíneo uniforme (MRU), a velocidade:', opcoes: ['Aumenta sempre', 'Diminui sempre', 'É constante', 'É sempre zero'], correta: 2, explicacao: 'No MRU não há aceleração: a velocidade não muda.' },
    { enunciado: 'Quanto tempo leva um veículo a 100 km/h para percorrer 300 km?', opcoes: ['2 h', '3 h', '4 h', '30 h'], correta: 1, explicacao: 'tempo = distância ÷ velocidade = 300 ÷ 100 = 3 h.' },
    { enunciado: 'Um corpo vai de 0 a 20 m/s em 4 s. Qual é a aceleração média?', opcoes: ['4 m/s²', '5 m/s²', '16 m/s²', '80 m/s²'], correta: 1, explicacao: 'a = variação da velocidade ÷ tempo = 20 ÷ 4 = 5 m/s².' },
  ],
  // 4 - Misturas e substâncias
  4: [
    { enunciado: 'Água com areia forma que tipo de mistura?', opcoes: ['Homogênea', 'Heterogênea', 'Substância pura', 'Solução'], correta: 1, explicacao: 'Dá para ver as duas fases separadas: é heterogênea.' },
    { enunciado: 'Qual destes é uma substância pura?', opcoes: ['Ar atmosférico', 'Água do mar', 'Água destilada', 'Leite'], correta: 2, explicacao: 'A água destilada tem só H₂O; os demais são misturas.' },
    { enunciado: 'Qual processo separa o sal da água do mar?', opcoes: ['Filtração', 'Evaporação', 'Catação', 'Peneiração'], correta: 1, explicacao: 'A água evapora e o sal fica no recipiente.' },
    { enunciado: 'Qual processo separa areia de água?', opcoes: ['Filtração', 'Destilação', 'Imantação', 'Levigação'], correta: 0, explicacao: 'O filtro retém a areia e deixa a água passar.' },
    { enunciado: 'Açúcar totalmente dissolvido em água forma uma mistura:', opcoes: ['Heterogênea', 'Homogênea', 'Impossível', 'Sólida'], correta: 1, explicacao: 'Só se vê uma fase: é homogênea (uma solução).' },
  ],
  // 5 - Brasil Colônia
  5: [
    { enunciado: 'Em que ano os portugueses chegaram ao Brasil?', opcoes: ['1492', '1500', '1530', '1549'], correta: 1, explicacao: 'A esquadra de Cabral chegou em 1500.' },
    { enunciado: 'Como era chamada a divisão do território em grandes faixas entregues a donatários?', opcoes: ['Capitanias hereditárias', 'Províncias', 'Estados', 'Sesmarias urbanas'], correta: 0, explicacao: 'O sistema de capitanias começou em 1534.' },
    { enunciado: 'Qual foi o principal produto da economia colonial no início?', opcoes: ['Café', 'Ouro', 'Cana-de-açúcar', 'Borracha'], correta: 2, explicacao: 'O açúcar dos engenhos do Nordeste sustentou a colônia.' },
    { enunciado: 'Quem trabalhava nos engenhos de açúcar?', opcoes: ['Operários assalariados', 'Pessoas africanas escravizadas', 'Imigrantes italianos', 'Funcionários da Coroa'], correta: 1, explicacao: 'O tráfico trouxe milhões de africanos à força para o Brasil.' },
    { enunciado: 'Quem foi o primeiro governador-geral do Brasil?', opcoes: ['Pedro Álvares Cabral', 'Tomé de Sousa', 'Martim Afonso de Sousa', 'Dom João VI'], correta: 1, explicacao: 'Tomé de Sousa assumiu em 1549 e fundou Salvador.' },
  ],
  // 6 - Clima e vegetação do Brasil
  6: [
    { enunciado: 'Qual bioma brasileiro tem a maior floresta tropical do mundo?', opcoes: ['Mata Atlântica', 'Amazônia', 'Caatinga', 'Pampa'], correta: 1, explicacao: 'A Floresta Amazônica cobre boa parte do Norte do país.' },
    { enunciado: 'A Caatinga predomina em qual clima?', opcoes: ['Equatorial', 'Subtropical', 'Semiárido', 'Temperado'], correta: 2, explicacao: 'Chove pouco e de forma irregular no sertão nordestino.' },
    { enunciado: 'O Cerrado é conhecido como:', opcoes: ['Floresta de araucárias', 'Savana brasileira', 'Deserto', 'Manguezal'], correta: 1, explicacao: 'Árvores esparsas de troncos retorcidos e gramíneas.' },
    { enunciado: 'Qual é o clima predominante no território brasileiro?', opcoes: ['Tropical', 'Polar', 'Desértico', 'Mediterrâneo'], correta: 0, explicacao: 'A maior parte do país fica entre os trópicos.' },
    { enunciado: 'Qual bioma é uma grande planície que alaga em parte do ano?', opcoes: ['Pantanal', 'Cerrado', 'Pampa', 'Caatinga'], correta: 0, explicacao: 'O Pantanal, no Mato Grosso e no Mato Grosso do Sul, tem cheias periódicas.' },
  ],
  // 7 - Interpretação de texto
  7: [
    { enunciado: 'A ideia central de um texto é:', opcoes: ['O primeiro parágrafo', 'A ideia principal que o autor desenvolve', 'O título, sempre', 'A última frase'], correta: 1, explicacao: 'É o assunto principal e o que o autor diz sobre ele.' },
    { enunciado: 'Fazer uma inferência é:', opcoes: ['Copiar um trecho', 'Concluir algo que o texto sugere sem dizer', 'Corrigir erros', 'Resumir em uma linha'], correta: 1, explicacao: 'A inferência nasce das pistas dadas pelo texto.' },
    { enunciado: 'O sentido denotativo de uma palavra é o sentido:', opcoes: ['Figurado', 'Literal, de dicionário', 'Irônico', 'Oculto'], correta: 1, explicacao: 'Denotar é dizer exatamente o que a palavra significa.' },
    { enunciado: 'Em "Ele tem um coração de ouro", a expressão quer dizer que ele é:', opcoes: ['Rico', 'Bondoso', 'Doente', 'Egoísta'], correta: 1, explicacao: 'É sentido conotativo (figurado): bondade.' },
    { enunciado: 'Um texto que informa dados e fatos com objetividade usa predominantemente a função:', opcoes: ['Poética', 'Referencial', 'Emotiva', 'Fática'], correta: 1, explicacao: 'A função referencial foca no assunto, como notícias e relatórios.' },
  ],
  // 8 - Pontuação e acentuação
  8: [
    { enunciado: 'Qual frase usa a vírgula corretamente para chamar alguém?', opcoes: ['Maria venha cá.', 'Maria, venha cá.', 'Maria venha, cá.', 'Maria venha cá,'], correta: 1, explicacao: 'O vocativo (quem é chamado) vem separado por vírgula.' },
    { enunciado: 'Qual palavra leva acento por ser oxítona terminada em "a"?', opcoes: ['Casa', 'Sofá', 'Mesa', 'Porta'], correta: 1, explicacao: 'Oxítonas terminadas em a, e, o (com ou sem s) são acentuadas.' },
    { enunciado: 'Qual destas é paroxítona e leva acento?', opcoes: ['Caderno', 'Livro', 'Lápis', 'Janela'], correta: 2, explicacao: 'Paroxítonas terminadas em "is" são acentuadas.' },
    { enunciado: 'Qual destas palavras é proparoxítona?', opcoes: ['Amigo', 'Café', 'Médico', 'Lápis'], correta: 2, explicacao: 'Proparoxítonas têm a antepenúltima sílaba tônica e sempre são acentuadas.' },
    { enunciado: 'O ponto de interrogação é usado em:', opcoes: ['Pergunta direta', 'Ordem', 'Exclamação', 'Fim de parágrafo'], correta: 0, explicacao: 'Ele encerra perguntas diretas: "Você estudou hoje?".' },
  ],
  // 9 - Estrutura da redação dissertativa
  9: [
    { enunciado: 'Qual é a estrutura básica de uma redação dissertativa?', opcoes: ['Início, meio e fim de uma história', 'Introdução, desenvolvimento e conclusão', 'Só desenvolvimento', 'Título e assinatura'], correta: 1, explicacao: 'Apresenta o tema, argumenta e fecha o raciocínio.' },
    { enunciado: 'Onde costuma aparecer a tese, o ponto de vista do autor?', opcoes: ['Na introdução', 'Na assinatura', 'Só no título', 'Depois da conclusão'], correta: 0, explicacao: 'A tese abre o texto e guia os argumentos.' },
    { enunciado: 'Na redação do ENEM, onde fica a proposta de intervenção?', opcoes: ['Na introdução', 'No primeiro parágrafo de desenvolvimento', 'Na conclusão', 'Em nota de rodapé'], correta: 2, explicacao: 'A proposta fecha o texto e deve ter agente, ação, meio, finalidade e detalhamento.' },
    { enunciado: 'Qual é o tipo textual cobrado na redação do ENEM?', opcoes: ['Narrativo', 'Poema', 'Dissertativo-argumentativo', 'Carta pessoal'], correta: 2, explicacao: 'Você defende uma tese usando argumentos.' },
    { enunciado: 'Quantas competências são avaliadas na redação do ENEM?', opcoes: ['3', '4', '5', '10'], correta: 2, explicacao: 'São 5 competências, de 0 a 200 pontos cada, somando até 1000.' },
  ],
  // 10 - Porcentagem no dia a dia
  10: [
    { enunciado: 'Quanto é 10% de 200?', opcoes: ['10', '20', '25', '2'], correta: 1, explicacao: '200 × 0,10 = 20.' },
    { enunciado: 'Um produto de R$ 150 tem desconto de 20%. Quanto você paga?', opcoes: ['R$ 100', 'R$ 120', 'R$ 130', 'R$ 170'], correta: 1, explicacao: '20% de 150 = 30; 150 − 30 = 120.' },
    { enunciado: 'Um item de R$ 80 sofre aumento de 10%. Qual o novo preço?', opcoes: ['R$ 82', 'R$ 88', 'R$ 90', 'R$ 98'], correta: 1, explicacao: '10% de 80 = 8; 80 + 8 = 88.' },
    { enunciado: 'Quanto é 25% de 40?', opcoes: ['4', '8', '10', '25'], correta: 2, explicacao: '25% é um quarto: 40 ÷ 4 = 10.' },
    { enunciado: '30 é qual porcentagem de 120?', opcoes: ['20%', '25%', '30%', '40%'], correta: 1, explicacao: '30 ÷ 120 = 0,25 = 25%.' },
  ],
  // 11 - Função do primeiro grau
  11: [
    { enunciado: 'Se f(x) = 2x + 3, quanto vale f(4)?', opcoes: ['9', '10', '11', '12'], correta: 2, explicacao: '2·4 + 3 = 11.' },
    { enunciado: 'Qual é o coeficiente angular de y = 3x − 5?', opcoes: ['−5', '3', '5', '−3'], correta: 1, explicacao: 'Em y = ax + b, o coeficiente angular é a = 3.' },
    { enunciado: 'Qual é a raiz de f(x) = x − 7?', opcoes: ['−7', '0', '7', '14'], correta: 2, explicacao: 'A raiz é o x que zera a função: x − 7 = 0, logo x = 7.' },
    { enunciado: 'O gráfico de uma função do 1º grau é:', opcoes: ['Uma parábola', 'Uma reta', 'Uma circunferência', 'Um ponto'], correta: 1, explicacao: 'Função afim sempre gera uma reta.' },
    { enunciado: 'Em f(x) = −2x + 6, em que ponto a reta corta o eixo y?', opcoes: ['y = −2', 'y = 3', 'y = 6', 'y = 0'], correta: 2, explicacao: 'O coeficiente linear b = 6 é onde x = 0.' },
  ],
  // 12 - Probabilidade básica
  12: [
    { enunciado: 'Ao lançar um dado comum, qual a probabilidade de sair o número 4?', opcoes: ['1/2', '1/4', '1/6', '4/6'], correta: 2, explicacao: 'Há 1 caso favorável em 6 possíveis.' },
    { enunciado: 'Ao lançar uma moeda, qual a probabilidade de dar cara?', opcoes: ['1/2', '1/3', '1/4', '1'], correta: 0, explicacao: 'Dois resultados igualmente prováveis.' },
    { enunciado: 'Uma urna tem 3 bolas vermelhas e 2 azuis. Qual a chance de sortear uma azul?', opcoes: ['3/5', '2/3', '2/5', '1/2'], correta: 2, explicacao: '2 azuis em 5 bolas: 2/5.' },
    { enunciado: 'Qual é a probabilidade de um evento impossível?', opcoes: ['0', '1/2', '1', '100'], correta: 0, explicacao: 'Evento impossível tem probabilidade 0; evento certo tem 1.' },
    { enunciado: 'Sorteando um número de 1 a 10, qual a probabilidade de ser par?', opcoes: ['1/10', '1/5', '1/2', '2/3'], correta: 2, explicacao: 'Há 5 pares em 10 números: 5/10 = 1/2.' },
  ],
}
