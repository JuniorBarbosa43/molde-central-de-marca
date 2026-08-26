/* ============================================================
   Conta os colchetes abertos da central, do lado de fora.

   POR QUE ISTO É UM ARQUIVO E NÃO UM COMANDO DE UMA LINHA.
   A central já conta a si mesma e mostra o número na página Início. Este
   script existe para o mesmo número estar disponível no terminal — e a
   primeira versão dele, escrita como one-liner num documento, devolveu 168
   contra os 134 do navegador. Três causas empilhadas:

     · colchetes dentro de <style> e <script>, que são comentário de código
       e não slot de conteúdo;
     · colchetes dentro de atributo (aria-label="[GLIFO DA MARCA]"), que o
       contador da página não vê porque ele anda em nós de TEXTO;
     · a sigla [SIGLA] na barra do topo e na espinha, que ficam FORA do
       <main id="conteudo"> e por isso não pertencem a página nenhuma.

   Duas fontes para um dado só divergem no primeiro ajuste. Este arquivo é
   a segunda fonte escrita para NÃO divergir: ele recorta exatamente o mesmo
   trecho que o contador da página percorre.

   Uso:  node conta-colchetes.js [caminho/da/central.html]
   ============================================================ */
const fs = require("fs");
const path = require("path");

const ALVO = process.argv[2] || path.join(__dirname, "molde", "central.html");
const PADRAO = /\[[A-ZÀ-ÖØ-Þ0-9][^\]\n]*\]/g;

let bruto;
try { bruto = fs.readFileSync(ALVO, "utf8"); }
catch(e){
  console.error("não consegui ler " + ALVO);
  process.exit(2);
}

/* mesma fronteira do contador da página: só o que está dentro do palco */
const ini = bruto.indexOf('<main class="palco" id="conteudo">');
const fim = bruto.indexOf("</main>");
if (ini < 0 || fim < 0){
  console.error("não achei <main class=\"palco\" id=\"conteudo\"> … </main> — " +
                "o casco mudou e este conferidor ficou para trás.");
  process.exit(2);
}
const palco = bruto.slice(ini, fim);

/* uma entrada por página, na ordem em que elas aparecem */
const paginas = [];
const abrePagina = /<div class="pagina" id="pg-([a-z]+)" data-titulo="([^"]*)">/g;
let m, anterior = null;
while ((m = abrePagina.exec(palco)) !== null){
  if (anterior) anterior.fim = m.index;
  anterior = { id: m[1], titulo: m[2], ini: m.index, fim: palco.length };
  paginas.push(anterior);
}

/* tira comentário e depois TAG INTEIRA — assim atributo não conta, que é o
   que o contador da página faz de graça por só andar em nós de texto */
const soTexto = s => s.replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]+>/g, " ");

let total = 0;
const linhas = paginas.map(p => {
  const achados = soTexto(palco.slice(p.ini, p.fim)).match(PADRAO) || [];
  total += achados.length;
  return { titulo: p.titulo, n: achados.length, achados };
});

const detalhe = process.argv.includes("--lista");
const larg = Math.max(...linhas.map(l => l.titulo.length));

console.log("");
linhas.forEach(l => {
  const selo = l.n === 0 ? "fechada" : String(l.n);
  console.log("  " + l.titulo.padEnd(larg + 2) + String(selo).padStart(7));
  if (detalhe && l.n) {
    const conta = {};
    l.achados.forEach(a => conta[a] = (conta[a] || 0) + 1);
    Object.keys(conta).sort().forEach(k =>
      console.log("      " + k + (conta[k] > 1 ? "  ×" + conta[k] : "")));
  }
});

const fechadas = linhas.filter(l => l.n === 0).length;
console.log("");
console.log("  " + total + " colchetes abertos · " +
            fechadas + " de " + linhas.length + " páginas fechadas");
if (!detalhe) console.log("  (--lista mostra quais)");
console.log("");

/* Não sai com erro por haver colchete: colchete aberto é o estado normal de
   uma central em construção, e conferidor que reprova o normal é ignorado
   em dois dias. Ele só falha se não conseguir contar. */
