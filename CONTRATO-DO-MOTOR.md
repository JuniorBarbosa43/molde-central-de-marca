# Contrato do motor

> **O motor fica em aberto. O contrato, não.**
>
> Quem for construir o motor de peças escolhe linguagem, arquitetura e stack
> livremente. Este documento não descreve implementação — descreve os cinco
> defeitos que já foram pagos uma vez, e o que cada um exige para não voltar.
>
> Motor construído sem isto reconstrói os cinco. Todos passaram em conferência
> automática enquanto existiam, e todos custaram entrega publicada.

---

## Por que este documento existe

Os cinco defeitos abaixo têm uma coisa em comum: **nenhum deles é visível na
tela**. Todos aparecem depois — no arquivo exportado, no app do celular, ou em
cima do vídeo. Uma suíte de conferência inteira ficou verde enquanto os cinco
estavam ativos, porque toda ela media o SVG na tela, e a tela sempre esteve
certa.

> **Quando a entrega passa por uma conversão, conferir a fonte não é conferir
> a entrega.**

---

## 1 · O tamanho do export sai do quadro, não de constante do módulo

**O defeito.** O módulo de vídeo montava cartões em 1080 × 1920 e chamava o
`baixarPNG` do motor estático, que dimensionava a tela com as constantes DELE:
1080 × 1350. Os cartões saíam **achatados** — proporção 0,800 no lugar de
0,563.

Duas peças entregaram arquivo deformado desde o dia em que foram montadas.

**Por que ninguém pegou.** Nenhum conferidor olhava o export. Todos mediam o
SVG na tela, que sempre esteve em 1080 × 1920.

**O contrato.**

- A função de export lê a dimensão do `viewBox` do elemento que recebe, nunca
  de constante do próprio módulo.
- A conferência mede o **arquivo exportado**, não o nó na tela: abre o PNG,
  lê largura e altura do cabeçalho, compara com o esperado.
- Se houver mais de um formato, cada um tem um caso de teste com a proporção
  esperada escrita como número.

---

## 2 · A fonte vai embutida dentro do SVG

**O defeito.** O export de PNG desenha a partir de um blob, e imagem carregada
assim **não enxerga o `@font-face` do documento**. Sem a fonte embutida, o
arquivo publicado sai na fonte de fallback — e isso não aparece na tela, só no
arquivo.

**O contrato.**

- A fonte vai em base64 num `<style>` **dentro do SVG serializado**, não só no
  CSS da página.
- A licença da fonte precisa permitir embutir. Confira isso **antes** de fechar
  a tipografia: sem esse direito, o caminho de export inteiro muda (rasterizar
  no servidor, ou assumir fallback).
- Fonte que só é usada em texto de apoio pode ficar de fora se a substituta for
  metricamente próxima — mas isso é uma decisão declarada, não um esquecimento.

**Custo real.** Uma fonte de display embutida pesa ~120 KB por arquivo. Uma
monoespaçada cuja substituta do sistema é próxima não vale 135 KB. Decida caso
a caso e escreva o motivo.

---

## 3 · A área segura é declarada em pixels

**O defeito.** Reels, Stories e TikTok cobrem faixas do topo e da base com
interface própria. Texto colado na borda **some atrás dela** — e some no
celular de quem vê, não na tela de quem produz.

**O contrato.**

- Cada formato declara `areaSeguraTopo` e `areaSeguraBase` em px.
- A moldura da área segura aparece na tela para conferência e **não sai no
  arquivo**. O jeito de garantir isso é marcá-la com um atributo (`data-preview`
  ou equivalente) que o serializador remove.
- Qualquer coisa que exista para o editor e não para o público segue a mesma
  regra. Uma tarja de tempo ("0–3s") sem essa marcação sobreviveu ao
  serializador, e ainda por cima morava *acima* da área segura: sumia do preview
  e ficava no arquivo entregue.

---

## 4 · Quem tem imagem atrás declara, e sai sem fundo

**O defeito.** Cartões feitos para serem queimados por cima de uma gravação
saíam com fundo opaco — alfa 255, medido no arquivo. Sobrepostos ao vídeo,
**apagavam o vídeo**.

A informação existia: estava em prosa, num campo de nota de cada cartão. O
código não sabia.

**Por que ninguém pegou.** O sinalizador foi criado para o **medidor de
cobertura** e a implicação não foi seguida até o export. Um sinalizador que
muda o que se mede quase sempre muda o que se desenha.

**O contrato.**

- O cartão declara `sobreImagem: true`.
- Isso governa **três** coisas, não uma: o medidor de cobertura cobra só quem é
  o quadro inteiro; o desenho não pinta fundo nem textura; e a legibilidade
  passa a ser resolvida por tarja **por linha**, não por quadro — senão a
  correção tapa a gravação que o cartão existe para deixar aparecer.
- Na tela, o cartão transparente ganha xadrez de transparência com a mesma
  marcação de preview do item 3.

**Como conferir.** Por **composição, não por inspeção**: monte uma gravação
falsa em faixas coloridas, ponha o PNG por cima, confira que as faixas
aparecem. Nenhuma leitura do SVG mostra este defeito.

---

## 5 · A cobertura de tinta se mede no pixel, não na chamada de função

**O defeito.** O critério "nenhum slide vazio" foi conferido do jeito errado por
quatro sprints: ele **contava chamadas a uma função de desenho**. Slide com
muitas chamadas passava; slide com poucas reprovava.

Isso aprovou justamente as duas peças mais vazias do estoque — porque um slide
pode chamar dez funções e cobrir 4% do quadro.

**O contrato.**

- A cobertura é medida **rasterizando** e contando pixel pintado sobre o total.
- O piso é um número declarado (por exemplo 12%), e a medição aparece na
  legenda de cada slide, na tela, o tempo todo.
- O piso **não vale para todo cartão**: quem declara `sobreImagem` tem o vídeo
  atrás, e medir só o texto é medir a coisa errada.

---

## Duas regras que valem para tudo o que vier depois

**Correção que vale para as outras não pode morar num comentário.** Um conserto
descoberto numa peça e escrito num comentário do próprio arquivo ficou lá: seis
sprints depois, duas peças ainda tinham o defeito e três tinham reimplementado o
mesmo cálculo à mão. **Ou vira função, ou vira linha na régua — de preferência
as duas.**

**Duas fontes para um dado só divergem no primeiro ajuste.** Ficha de peça em
JavaScript e a mesma peça escrita à mão no HTML precisaram de um conferidor
dedicado só para não discordarem. Derive uma da outra, ou aceite escrever o
conferidor.

---

## Lista de conferência mínima

Antes de considerar o motor pronto, estes cinco casos precisam existir e passar
— e nenhum deles se satisfaz olhando a tela:

| # | O que se mede | Onde se mede |
|---|---|---|
| 1 | Largura × altura de cada formato | cabeçalho do PNG exportado |
| 2 | A fonte de display está no arquivo | string base64 dentro do SVG serializado |
| 3 | Marcação de preview não sobreviveu | busca no SVG serializado |
| 4 | Cartão `sobreImagem` tem alfa 0 no fundo | pixel do PNG, composto sobre faixas |
| 5 | Cobertura ≥ piso declarado | rasterização, pixel a pixel |
