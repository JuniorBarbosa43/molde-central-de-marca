/* ============================================================
   CONFERE-MOLDE-VAZIO — o molde generico precisa continuar VAZIO.

   POR QUE ISTO EXISTE.
   Em 02/09/2026 uma instancia preenchida foi mergeada na main deste
   repositorio. Foi fast-forward limpo, sem conflito, e nenhum conferidor
   reclamou — porque nenhum conferidor perguntava isso. O molde nao foi
   corrompido: ele foi USADO. E nao parece erro, porque preencher um molde
   e literalmente o que se faz com um molde.

   O molde e a marca feita a partir dele sao o MESMO ARQUIVO, com obrigacoes
   inversas:
     · o generico  precisa continuar vazio PARA SEMPRE;
     · a instancia existe para ser preenchida UMA VEZ.

   POR QUE ELE NAO CONFERE UM TOTAL.
   O instinto era "reprova com menos de 166 colchetes". Mas total escrito em
   arquivo e o defeito que este projeto ja pagou quatro vezes — o «54», os
   «cinco meses», os «sete criterios», os dois numeros do beta. Um piso de 166
   apodreceria no primeiro colchete que o molde ganhasse, e reprovaria uma
   melhoria legitima.

   ENTAO ELE PERGUNTA OUTRA COISA, e ela nao envelhece:

     nenhuma pagina pode estar FECHADA.

   Um molde generico tem as sete paginas com colchete aberto. Uma instancia
   tem pagina fechada. A pergunta e sobre ESPECIE, e nao sobre quantidade —
   mesma familia da fronteira por especie de no, e da pergunta "em que pasta
   voce esta" que sobreviveu onde "voce lembrou da excecao" apodreceu.

   Uso:  node confere-molde-vazio.js [caminho/da/central.html]
   Sai com 1 se alguma pagina estiver fechada.
   ============================================================ */
const fs = require("fs");
const path = require("path");

const ARGS = process.argv.slice(2).filter(a => !a.startsWith("--"));
const ALVO = ARGS[0] || path.join(__dirname, "molde", "central.html");
const PADRAO = /\[[A-ZÀ-ÖØ-Þ0-9][^\]\n]*\]/g;

let bruto;
try { bruto = fs.readFileSync(ALVO, "utf8"); }
catch (e) {
  console.error("não consegui ler " + ALVO);
  process.exit(2);
}

/* MESMA FRONTEIRA E MESMO PADRAO do conta-colchetes.js, de proposito.
   Duas fontes para um dado so divergem no primeiro ajuste — e aqui a
   duplicacao e barata e visivel, enquanto extrair um modulo obrigaria os
   dois arquivos a existirem juntos para qualquer um rodar. Se o casco
   mudar, os dois quebram no mesmo dia, e e isso que se quer. */
const ini = bruto.indexOf('<main class="palco" id="conteudo">');
const fim = bruto.indexOf("</main>");
if (ini < 0 || fim < 0) {
  console.error("não achei o palco — o casco mudou e este conferidor ficou para trás.");
  process.exit(2);
}
const palco = bruto.slice(ini, fim);
const soTexto = s => s.replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]+>/g, " ");

const paginas = [];
const abrePagina = /<div class="pagina" id="pg-([a-z]+)" data-titulo="([^"]*)">/g;
let m, anterior = null;
while ((m = abrePagina.exec(palco)) !== null) {
  if (anterior) anterior.fim = m.index;
  anterior = { titulo: m[2], ini: m.index, fim: palco.length };
  paginas.push(anterior);
}

const fechadas = paginas.filter(p =>
  (soTexto(palco.slice(p.ini, p.fim)).match(PADRAO) || []).length === 0);

console.log("");
if (!paginas.length) {
  console.error("  nenhuma página encontrada — o casco mudou.");
  process.exit(2);
}

if (fechadas.length) {
  console.error("  ✗ ESTE MOLDE NÃO ESTÁ VAZIO.");
  console.error("");
  fechadas.forEach(p => console.error("      página fechada: " + p.titulo));
  console.error("");
  console.error("  " + fechadas.length + " de " + paginas.length + " páginas sem nenhum colchete.");
  console.error("");
  console.error("  Se isto é uma INSTÂNCIA, ela está no lugar errado: instância mora em");
  console.error("  repositório próprio e privado, não na main do molde. Ver ADR-PGC-049.");
  console.error("  Se o molde ganhou conteúdo de propósito, este conferidor precisa saber");
  console.error("  disso — e a correção é aqui, não no molde.");
  console.error("");
  process.exit(1);
}

console.log("  ✓ molde vazio · " + paginas.length + " de " + paginas.length +
            " páginas com colchete aberto");
console.log("");
