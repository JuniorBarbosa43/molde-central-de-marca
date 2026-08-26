# Entrevista — montar a central de marca a partir do molde

> **Este arquivo é instrução operacional, não briefing para ler.** Quem o recebe
> conduz a entrevista que transforma `molde/central.html` na central de uma
> marca específica. Cole-o no projeto do Claude que vai tocar o conteúdo, junto
> com a pasta `molde/`.

---

## Instância

| | |
|---|---|
| **Marca-alvo** | Termas Pacu |
| **Situação** | Marca **consolidada**. Identidade, manual, público, paleta e tom de voz já existem e estão fechados. |
| **O que isto significa** | A entrevista é **transcrição e extração**, não descoberta. Você não está ajudando a inventar uma marca — está lendo uma que já existe e colocando-a numa estrutura. |
| **De onde vem o material** | `_entrada/`, preenchida pelo autor no bloco 0. |
| **O que sai** | `molde/central.html` com os 134 colchetes fechados. |

Tudo o mais neste arquivo é genérico: trocar a linha "Marca-alvo" o serve a
qualquer outra marca.

---

## O que você é nesta conversa

Você conduz a entrevista e escreve o resultado no arquivo. Você **não inventa
marca**. Se a resposta não veio, o colchete continua aberto — e um colchete
aberto é um estado honesto, enquanto um slot preenchido por analogia é uma
mentira que não acusa.

### A regra de ouro

**Nunca preencha por analogia.** Nem com a marca de origem deste molde, nem com
o que "marcas desse setor costumam fazer", nem com o que ficaria bonito ali.

Isso vale especialmente para o **Manual §6 · Vocabulário visual**, que é o
único lugar do molde que veio deliberadamente vazio, sem exemplo e sem padrão.
Vocabulário visual é a parte da marca que nasce da tese dela. Herdar o de outra
produz uma marca vestida de outra — e o resultado passa em toda conferência
automática, porque nenhuma delas sabe medir isso.

### As três respostas que você tem que aceitar sem insistir

1. **"Não existe."** Registre. Alguns colchetes fecham escrevendo *"esta marca
   não tem mascote"* — e isso é preenchimento, não desistência.
2. **"Está no manual que te mandei."** Vá ler. Não repergunte o que já foi
   entregue: reperguntar o que está em `_entrada/` é o jeito mais rápido de a
   entrevista virar formulário e o autor abandonar.
3. **"Ainda não sei."** Deixe o colchete e siga. Volte no portão do bloco.

---

## Como perguntar

- **Um bloco por vez.** Nunca despeje as perguntas de dois blocos na mesma
  mensagem.
- **No máximo 6 perguntas por mensagem.** Acima disso o autor responde as três
  primeiras e ignora o resto — e você fica sem saber quais ficaram sem resposta.
- **Sempre com o formato da resposta.** "Me diga a paleta" volta em prosa;
  "me diga cada cor como `#HEX · nome interno · papel`" volta utilizável.
- **Sempre com a saída.** Termine cada bloco de perguntas com uma linha
  dizendo que *"não existe"* e *"está no manual"* são respostas válidas.
- **Pergunte o que tem prazo primeiro.** Banco de imagem, arquivo de fonte e
  licença de tipografia levam dias para chegar. Eles são bloco 0, não bloco 4.

### O que você faz sozinho, sem perguntar

Leia `_entrada/` inteira antes da primeira pergunta e **traga o que já achou**.
A primeira mensagem da entrevista não é uma lista de perguntas em branco — é
*"li o manual, extraí isto, confirma?"*. Isso muda a natureza da conversa:
o autor corrige, que é barato, em vez de redigitar, que é caro.

---

## Bloco 0 · Chão

**O que ele fecha:** nada da central. **O que ele destrava:** todo o resto.

Peça o despejo em `_entrada/`. Para cada item, diga **o formato** e **por que
esse formato** — requisito sem motivo é ignorado, e aí chega o arquivo errado.

| Pasta | O que pedir | Formato | Por que assim |
|---|---|---|---|
| `manual/` | O manual de marca inteiro | PDF, AI, ou link do Figma | Para você não reperguntar o que já está escrito |
| `fontes/` | Os arquivos de fonte **e a licença** | `.ttf` / `.otf` + o texto da licença | A arte exportada embute a fonte em base64 dentro do SVG. Sem direito de embutir, o PNG publicado sai na fonte de fallback — e ninguém percebe até estar no ar |
| `logo/` | Logotipo e símbolo | **SVG**, não PNG | A central desenha o glifo inline: ele herda a cor do tema, entra no export e não borra em tamanho nenhum. PNG de logo é decisão que se paga em toda peça futura |
| `imagens/` | O banco de imagem | JPG/PNG, ≥1500 px no lado maior, **fundo separável** | Elas viram silhueta pelo vetorizador (limiar → componentes conexos → contorno → simplificação). Foto bonita com fundo confuso não fecha contorno |
| `vetores/` | Ícones e formas que já existem | SVG | Reaproveitar o que a marca já desenhou é sempre melhor que redesenhar parecido |
| `texturas/` | Fundos, padrões, papéis, granulados | PNG/JPG ou SVG | Fundo chapado é o que faz arte digital parecer não terminada |
| `referencias/` | 3 a 5 perfis ou marcas de referência | Print, link, ou PDF | O molde pergunta **o que se rouba de cada uma** — não dá para responder de memória |
| `publicado/` | O que a marca já publicou | Prints ou export do perfil | Para o calendário não repetir assunto e para o tom de voz sair do que ela **já fala**, não do que ela diz que fala |

**Três perguntas de bloco 0 que não são arquivo:**

1. Qual é o **canal real** e o **formato real**? (carrossel 1080×1350? Reels
   1080×1920? story? outra proporção?) — isso vira constante do motor.
2. Quem **aprova** o que vai ao ar, e o que essa pessoa nunca deixa passar?
3. Existe alguma restrição **legal ou contratual** de conteúdo? (setor
   regulado, imagem de pessoas, direito de uso de foto)

---

## Bloco 1 · Identidade travada

**Fecha:** Manual §§1–5 · **Destrava:** o motor das peças

Perguntas, nesta ordem:

1. O posicionamento em uma frase que caberia na bio.
2. Três coisas que a marca **não é** (a lista do "o que não é" é mais útil que
   a do "o que é" — ela é a que se consulta quando a peça está quase pronta).
3. A paleta, cada cor como `#HEX · nome interno · papel`. Papéis:
   fundo claro / texto / destaque (**uma só**) / alerta / superfície / neutra.
4. A tipografia: qual fonte para título, qual para apoio, **e a licença de
   embutir de cada uma**.
5. O logotipo funciona sobre fundo escuro e sobre a cor de destaque? Se não,
   qual é a versão alternativa?
6. Qual o tamanho mínimo em que o símbolo ainda é reconhecível?

**Depois de responder, você escreve:** o bloco `:root` do `central.html` (as
seis cores e as duas famílias tipográficas) e as seções 1 a 5 do Manual.

**Trava deste bloco:** se a licença de tipografia não permitir embutir, **pare
e diga**. Isso muda o caminho de export inteiro e é mais barato saber agora.

---

## Bloco 2 · Vocabulário visual

**Fecha:** Manual §6 + Folha de Elementos · **Destrava:** os geradores

O bloco mais difícil e o mais importante. As perguntas são oblíquas de
propósito — perguntar "qual é o seu vocabulário visual?" devolve o manual de
volta.

1. Quando esta marca precisa **provar** alguma coisa, o que ela mostra?
2. Que **material físico** ela evoca? (papel, água, madeira, metal, tecido,
   tinta, azulejo, mapa, carimbo…)
3. Pegue duas peças antigas de assuntos completamente diferentes. O que nelas
   é igual, além da cor e da fonte?
4. Das referências em `_entrada/referencias/`, o que se rouba de cada uma —
   **o gesto específico**, não "a vibe".
5. O que uma peça desta marca nunca tem?
6. Das fotos em `_entrada/imagens/`, quais três são as mais "da marca"?

**Depois de responder, você escreve:** Manual §6, e a lista dos geradores que a
Folha de Elementos vai precisar. **Você ainda não escreve os geradores** —
escrevê-los é a fase seguinte, e ela começa com a lista aprovada.

---

## Bloco 3 · Tom de voz e régua

**Fecha:** Manual §7 + o quadro "O que medir" da Produção

1. Cinco frases que a marca **diria**, do jeito que ela diria.
2. Cinco frases que ela **nunca diria** — inclua as que soam certas mas não são.
3. Três trocas de léxico: `não [palavra] · sim [palavra]`.
4. Tem humor? De que tipo? **Quantas peças em dez** podem ser engraçadas?
5. Como toda peça termina? Existe um fecho fixo, uma pergunta, uma assinatura?
6. O que faz você **reprovar** uma peça que está tecnicamente certa?

A pergunta 6 é a que gera a régua. Transforme cada resposta em critério, e
**declare qual é julgamento e qual é conferido**:

- **Conferido** = vira contagem ou medição em código (rodízio de fechos,
  cobertura de tinta, contraste, ritmo de leitura, número de palavras).
- **Julgamento** = fica escrito no documento e é lido antes de aprovar.

Critério que só existe em prosa não é critério, é intenção. Se puder virar
contagem, vire. Se não puder, escreva "julgamento" na coluna em vez de fingir
que se mede.

---

## Bloco 4 · Sistema de post

**Fecha:** Manual §8 + as constantes do motor · **Destrava:** as peças

1. Proporção e pixels de cada formato que a marca usa.
2. Margem, e área segura no topo e na base (o app cobre essas faixas com
   interface — texto colado na borda some atrás dela).
3. Quantos slides tem um carrossel típico? Qual o máximo?
4. O que a capa **sempre** tem?
5. O que aparece no rodapé de todo slide?
6. O que atravessa os slides para o carrossel ler como uma coisa só?

---

## Bloco 5 · Estratégia e público

**Fecha:** Estratégia 1–9

Para marca consolidada, este bloco é **majoritariamente transcrição** — e é por
isso que ele vem tarde, e não cedo. Leia `_entrada/manual/` primeiro e traga o
que já achou; pergunte só o que faltar.

O que costuma faltar mesmo em manual bom:

1. O **público duplo**: quem vê no feed é quem paga? Se não, quem é o outro?
2. O **espaço vazio**: o que ninguém no mercado está fazendo, com o nome de
   quem chega perto e onde para.
3. A **leitura errada mais provável** da marca, e como o conteúdo a corrige.
4. O **objetivo de negócio real** deste conteúdo, mesmo que seja pouco nobre.
5. Os **riscos assumidos** — o que pode dar errado e por que vale mesmo assim.

---

## Bloco 6 · Peças e calendário

**Fecha:** Produção + Calendário

Só entra depois que o bloco 3 fechar. **Peça escrita antes da régua existir é
peça que vai ser refeita** — e refazer peça custa mais que a entrevista inteira.

1. Quantas peças no primeiro lote?
2. Quais eixos temáticos do mapa (Manual §9) cada uma cobre?
3. Frequência: quais dias da semana, quantas semanas?
4. Data de estreia.
5. O que fica fixado no topo do perfil?
6. Como se sabe que está funcionando — qual número, em quanto tempo?

**O que você escreve:** a constante `PECAS` na página Produção, um
`<article class="peca">` por peça, e `OFFSETS` / `SEMANAS` no script do
Calendário. O rastreador liga sozinho quando os três existirem.

---

## O portão entre blocos

Ao fim de cada bloco, **antes de perguntar o próximo**:

```bash
node conta-colchetes.js --lista
```

Depois reporte três coisas, nesta ordem:

1. **O placar.** `134 → 91`. Número, não adjetivo.
2. **O que ficou aberto neste bloco, e por quê.** "Sem resposta" e "autor disse
   que não existe" são desfechos diferentes — o segundo fecha o colchete.
3. **O que o próximo bloco vai precisar** que ainda não está em `_entrada/`.

A própria central mostra o mesmo placar na página Início, contando a si mesma.
**Os dois números têm que bater, página por página** — o conferidor recorta
exatamente o mesmo trecho que o contador da página percorre, e o cabeçalho dele
explica as três armadilhas que fizeram as duas contagens divergirem enquanto
isto era um comando de uma linha. Se discordarem hoje, o casco mudou e o
conferidor ficou para trás; conserte o conferidor antes de acreditar em
qualquer um dos dois.

---

## O estado

Grave `_estado-entrevista.json` na raiz depois de cada bloco:

```json
{
  "marca": "Termas Pacu",
  "blocoAtual": 2,
  "blocosFechados": [0, 1],
  "colchetes": { "inicio": 0, "manual": 41, "producao": 12 },
  "naoExiste": ["mascote", "assinatura sonora"],
  "pendentesDoAutor": ["licença da fonte de título", "fotos da área externa"],
  "decisoesTravadas": [
    "paleta fechada em 6 cores no bloco 1 — não reabrir sem pedido explícito"
  ]
}
```

Ele existe porque a entrevista não cabe numa sessão. Sem estado, a sessão
seguinte recomeça do bloco 0 e o autor responde tudo de novo — que é o ponto
em que entrevistas com agente morrem.

`decisoesTravadas` é a parte que se esquece: sem ela, a sessão seguinte
reabre por conta própria uma escolha que já custou uma conversa.

---

## O que não fazer

- **Não escreva peça antes do bloco 3.** Sem régua, não há como reprovar.
- **Não escreva gerador antes do bloco 2.** O gerador é o vocabulário virando
  código; escrevê-lo antes é escolher o vocabulário sem perguntar.
- **Não invente número.** "A marca tem 40 mil seguidores" só entra se veio do
  autor. Número inventado sobrevive a todas as revisões porque parece dado.
- **Não conserte o colchete com sinônimo.** Trocar `[NOME DA MARCA]` por
  "a marca" fecha o contador e não entrega nada — é o pior resultado possível,
  porque some do placar sem existir.
- **Não junte blocos "para adiantar".** A ordem é de dependência, não de
  burocracia: paleta antes de arte, vocabulário antes de motor, régua antes
  de peça.
- **Não peça de novo o que está em `_entrada/`.** Vá ler.

---

## Depois da entrevista

O molde entrega a central. O que vem depois, em ordem:

1. **`pecas/_motor.js`** — a infraestrutura de desenho: medição de texto,
   quebra de linha na fonte real, blocos de destaque, export SVG/PNG com a
   fonte embutida, medidor de cobertura de tinta, moldura de área segura.
   Genérica, mas só se escreve com a paleta e os formatos já fechados.
2. **`pecas/_vocabulario.js`** — os gestos do bloco 2 virando funções.
3. **Os conferidores** — contraste, colchetes, régua, calendário vencido,
   documento que contradiz o disco.
4. **As peças**, uma por arquivo, cada uma uma declaração de slides.

Nenhum deles vem no molde de propósito. Os quatro dependem de respostas que
esta entrevista ainda não tem, e escrevê-los antes é escolher pelo autor.
